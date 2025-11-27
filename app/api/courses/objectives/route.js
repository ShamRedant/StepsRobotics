import pool from '@/lib/db';

// GET objectives by course_id
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return new Response(JSON.stringify({ message: 'Course ID is required' }), { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM course_objectives WHERE course_id = $1 ORDER BY id DESC',
      [courseId]
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching objectives:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

// POST new objective
export async function POST(req) {
  try {
    const { course_id, objective } = await req.json();

    if (!course_id || !objective) {
      return new Response(JSON.stringify({ message: 'Course ID and objective are required' }), {
        status: 400,
      });
    }

    const result = await pool.query(
      'INSERT INTO course_objectives (course_id, objective) VALUES ($1, $2) RETURNING *',
      [course_id, objective]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error adding objective:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
