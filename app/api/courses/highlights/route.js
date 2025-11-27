import pool from '@/lib/db';

// GET highlights by course_id
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return new Response(JSON.stringify({ message: 'Course ID is required' }), { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM course_highlights WHERE course_id = $1 ORDER BY id ASC',
      [courseId]
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error('Error fetching highlights:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

// POST new highlight
export async function POST(req) {
  try {
    const { course_id, highlight } = await req.json();

    if (!course_id || !highlight) {
      return new Response(JSON.stringify({ message: 'Course ID and highlight are required' }), {
        status: 400,
      });
    }

    const result = await pool.query(
      'INSERT INTO course_highlights (course_id, highlight) VALUES ($1, $2) RETURNING *',
      [course_id, highlight]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (err) {
    console.error('Error adding highlight:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
