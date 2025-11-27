import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { course_id, title, description } = await req.json();

    if (!course_id || !title) {
      return new Response(JSON.stringify({ message: 'Required fields missing' }), { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO modules (course_id, title, description) VALUES ($1, $2, $3) RETURNING id',
      [course_id, title, description || '']
    );

    return new Response(JSON.stringify({ message: 'Module added', id: result.rows[0].id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return new Response(JSON.stringify({ message: 'Course ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convert courseId to integer if it's numeric
    let numericCourseId = parseInt(courseId, 10);
    
    // If courseId is not a valid integer, try to find the course by slug
    if (isNaN(numericCourseId)) {
      try {
        // Check if slug column exists in courses table
        const slugCheck = await pool.query(
          `SELECT column_name FROM information_schema.columns 
           WHERE table_name='courses' AND column_name='slug'`
        );
        
        if (slugCheck.rows.length > 0) {
          // Slug column exists, query by slug
          const courseBySlug = await pool.query(
            'SELECT id FROM courses WHERE slug = $1 LIMIT 1',
            [courseId]
          );
          if (courseBySlug.rows.length > 0) {
            numericCourseId = courseBySlug.rows[0].id;
          } else {
            return new Response(
              JSON.stringify({ 
                message: 'Course not found. Invalid course identifier.' 
              }), 
              { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
          }
        } else {
          // No slug column, courseId must be numeric
          return new Response(
            JSON.stringify({ 
              message: 'Invalid course ID. Course ID must be a numeric value.' 
            }), 
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (lookupErr) {
        console.error('Error looking up course:', lookupErr);
        return new Response(
          JSON.stringify({ 
            message: 'Invalid course ID format.' 
          }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const result = await pool.query(
      'SELECT * FROM modules WHERE course_id = $1 ORDER BY id ASC',
      [numericCourseId]
    );

    return new Response(JSON.stringify(result.rows), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error fetching modules:', err);
    return new Response(
      JSON.stringify({ 
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'Module ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete lessons under this module first, then the module
    await pool.query('DELETE FROM lessons WHERE module_id = $1', [id]);
    const result = await pool.query('DELETE FROM modules WHERE id = $1', [id]);

    return new Response(
      JSON.stringify({
        message: result.rowCount > 0 ? 'Module deleted successfully' : 'Module already removed',
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
      return new Response(JSON.stringify({ message: 'Module ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { title, description } = await req.json();
    if (!title) {
      return new Response(JSON.stringify({ message: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await pool.query(
      'UPDATE modules SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description || '', id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Module not found' }), {
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