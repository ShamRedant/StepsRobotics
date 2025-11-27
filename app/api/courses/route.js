import fs from 'fs';
import path from 'path';
import pool from '@/lib/db';

export const config = {
  api: {
    bodyParser: false, // Needed to handle FormData / file uploads
  },
};

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

// GET all courses
export async function GET(req) {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id ASC');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

// POST new course with optional images
export async function POST(req) {
  try {
    // Ensure optional columns exist
    await pool.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS heroictitle TEXT`);
    await pool.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS heroicimage TEXT`);
    await pool.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS image TEXT`);

    const formData = await req.formData();
    const title = (formData.get('title') || '').toString();
    const description = (formData.get('description') || '').toString();
    const heroictitle = (formData.get('heroictitle') || '').toString();

    // Separate columns for images
    const heroicBlob = formData.get('heroicimage');
    const imageBlob = formData.get('image'); // New separate image column

    if (!title) {
      return new Response(JSON.stringify({ message: 'Course title is required' }), { status: 400 });
    }

    let heroicimage = '';
    let image = '';

    if (heroicBlob && typeof heroicBlob === 'object' && 'arrayBuffer' in heroicBlob) {
      heroicimage = await saveBlobToUploads(heroicBlob);
    }

    if (imageBlob && typeof imageBlob === 'object' && 'arrayBuffer' in imageBlob) {
      image = await saveBlobToUploads(imageBlob);
    }

    const result = await pool.query(
      `INSERT INTO courses (title, description, heroictitle, heroicimage, image)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [title, description || '', heroictitle || '', heroicimage, image]
    );

    return new Response(
      JSON.stringify({
        message: 'Course added',
        id: result.rows[0].id,
        heroicimage,
        image,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
