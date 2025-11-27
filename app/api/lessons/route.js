import pool from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId');

    if (moduleId) {
      const result = await pool.query(
        'SELECT id, title, content, module_id FROM lessons WHERE module_id = $1 ORDER BY id ASC',
        [moduleId]
      );
      return new Response(JSON.stringify(result.rows), { status: 200 });
    }

    const result = await pool.query(
      `SELECT l.id, l.title, l.content, l.module_id, m.title AS module_title
       FROM lessons l
       JOIN modules m ON l.module_id = m.id
       ORDER BY l.id DESC`
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'Lesson ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await pool.query('DELETE FROM lessons WHERE id = $1', [id]);

    return new Response(
      JSON.stringify({
        message: result.rowCount > 0 ? 'Lesson deleted successfully' : 'Lesson already removed',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ message: 'Lesson ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { title, content } = await req.json();
    if (!title) {
      return new Response(JSON.stringify({ message: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await pool.query(
      'UPDATE lessons SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content || '', id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Lesson not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST add a new lesson
export async function POST(req) {
  try {
    const { module_id, title, content } = await req.json();

    if (!module_id || !title) {
      return new Response(
        JSON.stringify({ message: 'Module ID and Lesson title are required' }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO lessons (module_id, title, content) 
       VALUES ($1, $2, $3) RETURNING id`,
      [module_id, title, content || '']
    );

    return new Response(
      JSON.stringify({ message: 'Lesson added', id: result.rows[0].id }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
