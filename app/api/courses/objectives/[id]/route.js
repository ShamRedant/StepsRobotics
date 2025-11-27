import pool from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { objective } = await req.json();

    if (!id || !objective) {
      return new Response(JSON.stringify({ message: 'Objective ID and text are required' }), {
        status: 400,
      });
    }

    const result = await pool.query(
      'UPDATE course_objectives SET objective = $1 WHERE id = $2 RETURNING *',
      [objective, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Objective not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error('Error updating objective:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: 'Objective ID is required' }), { status: 400 });
    }

    const result = await pool.query('DELETE FROM course_objectives WHERE id = $1', [id]);

    return new Response(
      JSON.stringify({
        message:
          result.rowCount > 0 ? 'Objective deleted successfully' : 'Objective already removed',
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting objective:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
