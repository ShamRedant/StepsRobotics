import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const result = await pool.query(
      `SELECT id, full_name, student_id, age, grade, email, parent_phone, role, created_at, password_hash 
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password_hash, ...userData } = user; 
    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: userData
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
