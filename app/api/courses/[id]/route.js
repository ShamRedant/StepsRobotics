import fs from 'fs';
import path from 'path';
import pool from '@/lib/db';

export const config = { api: { bodyParser: false } };

// Ensure uploads directory exists
const ensureUploadDir = () => {
  const uploadDir = path.join(process.cwd(), '/public/uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  return uploadDir;
};

// Save uploaded file to /public/uploads and return the relative path
const saveBlobToUploads = async (fileBlob) => {
  if (!fileBlob) return '';
  const uploadDir = ensureUploadDir();
  const arrayBuffer = await fileBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = `${Date.now()}-${(fileBlob.name || 'upload').replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
  const filePath = path.join(uploadDir, safeName);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${safeName}`;
};

// GET course by ID
export async function GET(req, { params }) {
  const { id } = params;
  if (!id)
    return new Response(JSON.stringify({ message: 'Course ID required' }), { status: 400 });

  try {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (result.rowCount === 0)
      return new Response(JSON.stringify({ message: 'Course not found' }), { status: 404 });

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

// PUT course by ID (update)
export async function PUT(req, { params }) {
  try {
    // Ensure image column exists
    await pool.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS image TEXT`);

    const { searchParams } = new URL(req.url);
    const id = (params && params.id) || searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ message: 'Course ID is required' }), { status: 400 });
    }

    const formData = await req.formData();
    const title = (formData.get('title') || '').toString();
    const description = (formData.get('description') || '').toString();
    const heroictitle = (formData.get('heroictitle') || '').toString();

    const heroicImageField = formData.get('heroicimage');
    const imageField = formData.get('image'); // new separate image column

    if (!title) {
      return new Response(JSON.stringify({ message: 'Title is required' }), { status: 400 });
    }

    // Process heroicimage
    let heroicimage = '';
    if (typeof heroicImageField === 'string') {
      heroicimage = heroicImageField; // keep existing URL
    } else if (heroicImageField && typeof heroicImageField === 'object' && 'arrayBuffer' in heroicImageField) {
      heroicimage = await saveBlobToUploads(heroicImageField);
    }

    // Process new image
    let image = '';
    if (typeof imageField === 'string') {
      image = imageField; // keep existing URL
    } else if (imageField && typeof imageField === 'object' && 'arrayBuffer' in imageField) {
      image = await saveBlobToUploads(imageField);
    }

    const result = await pool.query(
      `UPDATE courses
       SET title = $1, description = $2, heroictitle = $3, heroicimage = $4, image = $5
       WHERE id = $6 RETURNING *`,
      [title, description || '', heroictitle || '', heroicimage, image, id]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'Course not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

// DELETE course by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: 'Course ID is required' }), { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Delete lessons linked to modules of this course
    await client.query(
      `DELETE FROM lessons 
       WHERE module_id IN (SELECT id FROM modules WHERE course_id = $1)`,
      [id]
    );

    // Delete modules of this course
    await client.query('DELETE FROM modules WHERE course_id = $1', [id]);

    // Delete the course
    const result = await client.query('DELETE FROM courses WHERE id = $1', [id]);

    await client.query('COMMIT');

    return new Response(JSON.stringify({
      message: result.rowCount > 0 ? 'Course deleted successfully' : 'Course already removed',
    }), { status: 200 });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error deleting course:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  } finally {
    client.release();
  }
}
