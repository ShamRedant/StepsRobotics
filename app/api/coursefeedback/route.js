import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM course_feedback ORDER BY id ASC");
    return Response.json(result.rows);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const rating = formData.get("rating");
    const text = formData.get("text");
    const file = formData.get("image");

    let imagePath = null;

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const originalName = file.name || "upload";
      const safeName = `${Date.now()}-${originalName}`.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const filePath = path.join(uploadDir, safeName);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.promises.writeFile(filePath, buffer);

      imagePath = `/uploads/${safeName}`;
    }

    const result = await pool.query(
      `INSERT INTO course_feedback (name, role, image, rating, text)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, role, imagePath, rating, text]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ error: "Failed to upload feedback" }, { status: 500 });
  }
}
