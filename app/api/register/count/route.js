import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Query 1: Total users
    const totalUsers = await db.query('SELECT COUNT(*) as count FROM users');
    
    // Query 2: Total students
    const totalStudents = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'student'"
    );
    
    // Query 3: New students (last 30 days)
    const newStudents = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'student' AND created_at >= NOW() - INTERVAL '30 days'"
    );

    return NextResponse.json({
      totalUsers: parseInt(totalUsers.rows[0].count, 10) || 0,
      totalStudents: parseInt(totalStudents.rows[0].count, 10) || 0,
      newStudents: parseInt(newStudents.rows[0].count, 10) || 0
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counts', details: error.message },
      { status: 500 }
    );
  }
}
