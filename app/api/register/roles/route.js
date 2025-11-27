import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    // const result = await pool.query('SELECT * FROM users WHERE access = $1', ['1']);
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}
