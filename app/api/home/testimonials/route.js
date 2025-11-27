import pool from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public/uploads");

// ensure upload dir exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Local helper for saving file uploads
async function uploadFile(file) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// ✅ GET all testimonials
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM testimonials ORDER BY id DESC");
    return Response.json(result.rows);
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// ✅ POST new testimonial
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const role = formData.get("role");
    const quote = formData.get("quote");
    const description = formData.get("description");
    const rating = formData.get("rating") || 0;
    const image = formData.get("image");

    const imageUrl = await uploadFile(image);

    const result = await pool.query(
      `INSERT INTO testimonials (name, role, quote, description, rating, image, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [name, role, quote, description, rating, imageUrl]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ error: "Failed to add testimonial" }, { status: 500 });
  }
}

// ✅ PUT update testimonial
export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    const role = formData.get("role");
    const quote = formData.get("quote");
    const description = formData.get("description");
    const rating = formData.get("rating");
    const image = formData.get("image");

    let imageUrl = formData.get("existingImage");
    if (image && image.size > 0) {
      imageUrl = await uploadFile(image);
    }

    const result = await pool.query(
      `UPDATE testimonials
       SET name=$1, role=$2, quote=$3, description=$4, rating=$5, image=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [name, role, quote, description, rating, imageUrl, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("PUT error:", error);
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// ✅ DELETE testimonial
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await pool.query("DELETE FROM testimonials WHERE id=$1", [id]);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
