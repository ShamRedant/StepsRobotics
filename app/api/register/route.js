import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


export async function GET(request) {
  try {
    const result = await pool.query('SELECT * FROM users'); // replace with your table
    return Response.json(result.rows);
  } catch (error) {
    return Response.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { full_name, student_id, age, grade, email, parent_phone, password, role, access } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const accessValue = role === "admin" ? 1 : 0;

    const result = await pool.query(
      `INSERT INTO users (full_name, student_id, age, grade, email, parent_phone, password_hash, role, access)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, full_name, student_id, age, grade, email, parent_phone, role, access`,
      [full_name, student_id, age, grade, email, parent_phone, password_hash, role, accessValue]
    );

    return NextResponse.json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed', details: error.message }, { status: 500 });
  }
}