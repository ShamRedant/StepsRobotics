import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

// GET all gallery images
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM study_gallery ORDER BY id ASC");
    return Response.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching study gallery:", err);
    return Response.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// POST (upload new or update existing)
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const alt = formData.get("alt");
    const id = formData.get("id"); // optional — if set, update existing record

    let imageUrl = null;

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    if (id) {
      // Update existing
      const query = `
        UPDATE study_gallery
        SET image = COALESCE($1, image), alt = COALESCE($2, alt)
        WHERE id = $3 RETURNING *;
      `;
      const result = await pool.query(query, [imageUrl, alt, id]);
      return Response.json(result.rows[0]);
    } else {
      // Insert new
      const query = "INSERT INTO study_gallery (image, alt) VALUES ($1, $2) RETURNING *;";
      const result = await pool.query(query, [imageUrl, alt]);
      return Response.json(result.rows[0]);
    }
  } catch (err) {
    console.error("❌ Error saving study gallery:", err);
    return Response.json({ error: "Failed to save image" }, { status: 500 });
  }
}

// DELETE (remove image)
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return Response.json({ error: "Missing ID" }, { status: 400 });
    }

    // Get image URL before deleting so we can remove the file
    const findQuery = "SELECT image FROM study_gallery WHERE id = $1;";
    const findResult = await pool.query(findQuery, [id]);

    if (findResult.rows.length === 0) {
      return Response.json({ error: "Image not found" }, { status: 404 });
    }

    const imagePath = findResult.rows[0].image;
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", imagePath);
      try {
        await fs.unlink(filePath);
      } catch {
        console.warn("⚠️ Could not delete image file:", filePath);
      }
    }

    const deleteQuery = "DELETE FROM study_gallery WHERE id = $1;";
    await pool.query(deleteQuery, [id]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting study gallery:", err);
    return Response.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
