import pool from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM banners ORDER BY id DESC");
    return Response.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching banners:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const bannerTitle1 = formData.get("bannerTitle1");
    const bannerTitle2 = formData.get("bannerTitle2");
    const paragraph = formData.get("paragraph");
    const buttonName = formData.get("buttonName");
    const buttonLink = formData.get("buttonLink");
    const file = formData.get("image");
    const bFile = formData.get("b_image"); // ✅ New b_image field

    // handle file upload (main image)
    let imagePath = null;
    if (file && file.name) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const fullPath = path.join(uploadDir, fileName);
      fs.writeFileSync(fullPath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    // handle b_image upload
    let bImagePath = null;
    if (bFile && bFile.name) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${bFile.name}`;
      const buffer = Buffer.from(await bFile.arrayBuffer());
      const fullPath = path.join(uploadDir, fileName);
      fs.writeFileSync(fullPath, buffer);
      bImagePath = `/uploads/${fileName}`;
    }

    // ✅ Insert both image paths into DB
    const result = await pool.query(
      `INSERT INTO banners 
       (banner_title1, banner_title2, paragraph, button_name, button_link, image, b_image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [bannerTitle1, bannerTitle2, paragraph, buttonName, buttonLink, imagePath, bImagePath]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error("❌ Error adding banner:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

