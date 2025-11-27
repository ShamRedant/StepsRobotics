// app/api/request-otp/route.js
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });

    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (!userResult.rows.length) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const userId = userResult.rows[0].id;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP
    await pool.query(
      'INSERT INTO password_reset_otps (user_id, otp, expires_at) VALUES ($1, $2, $3)',
      [userId, otp, expiresAt]
    );

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP is: ${otp} (valid for 10 minutes)`,
    });

    return new Response(JSON.stringify({ message: 'OTP sent to email' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
