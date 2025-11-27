import pool from '@/lib/db';

export async function GET() {
  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'PUT, DELETE' },
  });
}

// Update a module
export async function PUT(req, { params }) {
  const { id } = params; // module id

  if (!id) {
    return new Response(
      JSON.stringify({ message: 'Module ID is required' }),
      { status: 400 }
    );
  }

  try {
    const { title, description } = await req.json();

    if (!title) {
      return new Response(
        JSON.stringify({ message: 'Title is required' }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE modules SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description || '', id]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Module not found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating module:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Delete a module
export async function DELETE(req, { params }) {
  const { id } = params; // module id

  if (!id) {
    return new Response(
      JSON.stringify({ message: 'Module ID is required' }),
      { status: 400 }
    );
  }

  try {
    // Delete lessons under this module first
    await pool.query('DELETE FROM lessons WHERE module_id = $1', [id]);

    const result = await pool.query('DELETE FROM modules WHERE id = $1', [id]);

    // Idempotent delete: return 200 even if already deleted or not found
    return new Response(JSON.stringify({
      message: result.rowCount > 0 ? 'Module deleted successfully' : 'Module already removed',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting module:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: 'PUT, DELETE' } });
}


