import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// define once globally (no redeclaration later)
const uploadDir = path.join(process.cwd(), "public/uploads");

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const list_items = JSON.parse(formData.get("list_items") || "[]");
    const button_link = formData.get("button_link");

    // ✅ Declare the variable FIRST
    let imagePath = null;

    // ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const imageFile = formData.get("image");
    const existingImage = formData.get("existing_image");

    if (imageFile && imageFile.name) {
      // ✅ Save new uploaded image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      imagePath = `/uploads/${filename}`;
    } else if (existingImage) {
      // ✅ Keep old image if not replaced
      imagePath = existingImage;
    }

    const result = await pool.query(
      `UPDATE explore_courses
       SET title = $1, description = $2, list_items = $3, button_link = $4, image = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, list_items, button_link, imagePath, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Update error:", err);
    return NextResponse.json({ error: "Failed to update explore course" }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM explore_courses WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
