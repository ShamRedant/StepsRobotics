import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (!userResult.rows.length) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const userId = userResult.rows[0].id;

    const otpResult = await pool.query(
      'SELECT * FROM password_reset_otps WHERE user_id = $1 AND otp = $2 AND used = false',
      [userId, otp]
    );

    if (!otpResult.rows.length) {
      return new Response(JSON.stringify({ error: 'Invalid OTP' }), { status: 400 });
    }
    const otpRow = otpResult.rows[0];
    if (new Date() > otpRow.expires_at) {
      return new Response(JSON.stringify({ error: 'OTP expired' }), { status: 400 });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, userId]);
    await pool.query('UPDATE password_reset_otps SET used = true WHERE id = $1', [otpRow.id]);
    return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
