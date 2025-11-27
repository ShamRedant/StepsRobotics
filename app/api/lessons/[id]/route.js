import pool from '@/lib/db';

export async function GET() {
  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'PUT, DELETE' },
  });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, content } = await req.json();

    if (!id || !title) {
      return new Response(
        JSON.stringify({ message: 'Lesson ID and title are required' }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE lessons SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content || '', id]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Lesson not found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating lesson:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: 'PUT, DELETE' } });
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params; 

    if (!id) {
      return new Response(
        JSON.stringify({ message: 'Lesson ID is required' }),
        { status: 400 }
      );
    }
    const result = await pool.query('DELETE FROM lessons WHERE id = $1', [id]);
    return new Response(JSON.stringify({
      message: result.rowCount > 0 ? 'Lesson deleted successfully' : 'Lesson already removed',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting lesson:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


