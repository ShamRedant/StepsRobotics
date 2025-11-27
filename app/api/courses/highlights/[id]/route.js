import pool from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { highlight } = await req.json();

    if (!id || !highlight) {
      return new Response(JSON.stringify({ message: 'Highlight ID and text are required' }), {
        status: 400,
      });
    }

    const result = await pool.query(
      'UPDATE course_highlights SET highlight = $1 WHERE id = $2 RETURNING *',
      [highlight, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Highlight not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error('Error updating highlight:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: 'Highlight ID is required' }), { status: 400 });
    }

    const result = await pool.query('DELETE FROM course_highlights WHERE id = $1', [id]);

    return new Response(
      JSON.stringify({
        message:
          result.rowCount > 0 ? 'Highlight deleted successfully' : 'Highlight already removed',
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting highlight:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
