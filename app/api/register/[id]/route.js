import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(req, { params }) {
  try {
    const { id } = params; 
    const body = await req.json();
    const { full_name, student_id, age, grade, email, parent_phone, password, role } = body;

    let query = 'UPDATE users SET full_name=$1, student_id=$2, age=$3, grade=$4, email=$5, parent_phone=$6, role=$7';
    const values = [full_name, student_id, age, grade, email, parent_phone, role];

    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      query += ', password_hash=$8 WHERE id=$9 RETURNING id, full_name, student_id, age, grade, email, parent_phone, role';
      values.push(password_hash, id);
    } else {
      query += ' WHERE id=$8 RETURNING id, full_name, student_id, age, grade, email, parent_phone, role';
      values.push(id);
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Update failed', details: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params; 
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully', userId: id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Deletion failed', details: error.message }, { status: 500 });
  }
}
