import { writeFile, unlink, mkdir } from "fs/promises";
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

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");
    const video = formData.get("video");

    const existing = await pool.query("SELECT * FROM steps_robotics WHERE id=$1", [id]);
    if (existing.rowCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let imagePath = existing.rows[0].image;
    let videoPath = existing.rows[0].video;

    if (image && image.name) imagePath = await saveFile(image);
    if (video && video.name) videoPath = await saveFile(video);

    const result = await pool.query(
      `UPDATE steps_robotics
       SET title=$1, image=$2, video=$3, updated_at=NOW()
       WHERE id=$4 RETURNING *`,
      [title, imagePath, videoPath, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const existing = await pool.query("SELECT * FROM steps_robotics WHERE id=$1", [id]);
    if (existing.rowCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = existing.rows[0];
    if (data.image?.startsWith("/uploads/")) {
      await unlink(path.join(process.cwd(), "public", data.image)).catch(() => {});
    }
    if (data.video?.startsWith("/uploads/")) {
      await unlink(path.join(process.cwd(), "public", data.video)).catch(() => {});
    }

    await pool.query("DELETE FROM steps_robotics WHERE id=$1", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
