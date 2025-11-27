import { writeFile, mkdir } from "fs/promises";
import path from "path";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

async function saveFile(file) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

// ✅ GET all records
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM steps_robotics ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ POST new record
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");
    const video = formData.get("video");

    let imagePath = null;
    let videoPath = null;

    if (image && image.name) imagePath = await saveFile(image);
    if (video && video.name) videoPath = await saveFile(video);

    const result = await pool.query(
      `INSERT INTO steps_robotics (title, image, video)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, imagePath, videoPath]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
