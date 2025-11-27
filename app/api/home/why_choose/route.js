import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

// 📌 GET all data (main robot image + left/right items)
export async function GET() {
  try {
    const [mainResult, itemsResult] = await Promise.all([
      pool.query("SELECT * FROM why_choose_steps_main LIMIT 1"),
      pool.query("SELECT * FROM why_choose_steps_items ORDER BY order_index ASC"),
    ]);

    return Response.json({
      main: mainResult.rows[0] || null,
      items: itemsResult.rows || [],
    });
  } catch (err) {
    console.error("❌ Error fetching Why Choose STEPS data:", err);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// 📌 POST (create or update main image or feature item)
export async function POST(req) {
  try {
    const formData = await req.formData();
    const type = formData.get("type"); // 'main' or 'item'
    const id = formData.get("id"); // for update

    if (type === "main") {
      const file = formData.get("file");
      const title = formData.get("title");

      let robotUrl = null;

      if (file && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        robotUrl = `/uploads/${fileName}`;
      }

      if (id) {
        const query = `
          UPDATE why_choose_steps_main
          SET robot_image = COALESCE($1, robot_image), title = COALESCE($2, title)
          WHERE id = $3 RETURNING *;
        `;
        const result = await pool.query(query, [robotUrl, title, id]);
        return Response.json(result.rows[0]);
      } else {
        const query = `
          INSERT INTO why_choose_steps_main (robot_image, title)
          VALUES ($1, $2) RETURNING *;
        `;
        const result = await pool.query(query, [robotUrl, title]);
        return Response.json(result.rows[0]);
      }
    }

    // For feature items
    if (type === "item") {
      const iconFile = formData.get("icon");
      const heading = formData.get("heading");
      const description = formData.get("description");
      const side = formData.get("side");
      const orderIndex = formData.get("order_index");

      let iconUrl = null;

      if (iconFile && iconFile.name) {
        const bytes = await iconFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public/uploads/icons");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${iconFile.name}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        iconUrl = `/uploads/icons/${fileName}`;
      }

      if (id) {
        const query = `
          UPDATE why_choose_steps_items
          SET icon = COALESCE($1, icon),
              heading = COALESCE($2, heading),
              description = COALESCE($3, description),
              side = COALESCE($4, side),
              order_index = COALESCE($5, order_index)
          WHERE id = $6 RETURNING *;
        `;
        const result = await pool.query(query, [
          iconUrl,
          heading,
          description,
          side,
          orderIndex,
          id,
        ]);
        return Response.json(result.rows[0]);
      } else {
        const query = `
          INSERT INTO why_choose_steps_items (icon, heading, description, side, order_index)
          VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const result = await pool.query(query, [
          iconUrl,
          heading,
          description,
          side,
          orderIndex,
        ]);
        return Response.json(result.rows[0]);
      }
    }

    return Response.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    console.error("❌ Error saving Why Choose STEPS data:", err);
    return Response.json({ error: "Failed to save data" }, { status: 500 });
  }
}

// 📌 DELETE (remove main or item)
export async function DELETE(req) {
  try {
    const { id, type } = await req.json();

    if (type === "main") {
      await pool.query("DELETE FROM why_choose_steps_main WHERE id = $1", [id]);
    } else if (type === "item") {
      await pool.query("DELETE FROM why_choose_steps_items WHERE id = $1", [id]);
    } else {
      return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting Why Choose STEPS data:", err);
    return Response.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
