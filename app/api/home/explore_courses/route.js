import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function GET() {
  const result = await pool.query("SELECT * FROM explore_courses ORDER BY id ASC");
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const button_text = formData.get("button_text");
    const button_link = formData.get("button_link");
    const list_items = JSON.parse(formData.get("list_items") || "[]");

    // Handle image upload
    const imageFile = formData.get("image");
    let imagePath = null;
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${imageFile.name}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    const result = await pool.query(
      `INSERT INTO explore_courses (title, description, image, button_text, button_link, list_items)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, imagePath, button_text, button_link, list_items]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
