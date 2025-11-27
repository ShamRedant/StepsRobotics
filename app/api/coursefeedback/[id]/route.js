import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const rating = formData.get("rating");
    const text = formData.get("text");
    const file = formData.get("image");

    // Fetch current feedback to get old image
    const oldData = await pool.query("SELECT image FROM course_feedback WHERE id = $1", [id]);
    if (oldData.rows.length === 0)
      return Response.json({ error: "Feedback not found" }, { status: 404 });

    let imagePath = oldData.rows[0].image; // Keep old image by default

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      if (imagePath && fs.existsSync(path.join(process.cwd(), "public", imagePath))) {
        fs.unlinkSync(path.join(process.cwd(), "public", imagePath));
      }

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

    // Update DB
    const result = await pool.query(
      `UPDATE course_feedback
       SET name = $1, role = $2, image = $3, rating = $4, text = $5
       WHERE id = $6 RETURNING *`,
      [name, role, imagePath, rating, text, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ error: "Failed to update feedback" }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const result = await pool.query(
      `DELETE FROM course_feedback WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0)
      return Response.json({ error: "Feedback not found" }, { status: 404 });

    return Response.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ error: "Failed to delete feedback" }, { status: 500 });
  }
}
