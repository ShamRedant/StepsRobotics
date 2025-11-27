// app/api/upload/route.js
import { promises as fs } from "fs";
import path from "path";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload folder exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Create a unique file name
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    const publicPath = `/uploads/${fileName}`;

    // Save file
    await fs.writeFile(filePath, buffer);

    // Upsert into DB
    await pool.query(
      `
      INSERT INTO logo (id, logo_url, updated_at)
      VALUES (1, $1, NOW())
      ON CONFLICT (id)
      DO UPDATE SET logo_url = EXCLUDED.logo_url, updated_at = NOW()
      `,
      [publicPath]
    );

    return Response.json({ success: true, fileUrl: publicPath });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
