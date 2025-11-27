import { writeFile } from "fs/promises";
import path from "path";
import pool from "@/lib/db";
import fs from "fs";

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();

  const bannerTitle1 = formData.get("bannerTitle1");
  const bannerTitle2 = formData.get("bannerTitle2");
  const paragraph = formData.get("paragraph");
  const buttonName = formData.get("buttonName");
  const buttonLink = formData.get("buttonLink");
  const image = formData.get("image"); // may be null
  const b_image = formData.get("b_image"); // new file input

  try {
    let imageUrl = null;
    let bImageUrl = null;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    // 🖼 Upload main image if provided
    if (image && typeof image === "object" && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    // 🖼 Upload background image if provided
    if (b_image && typeof b_image === "object" && b_image.name) {
      const bytes = await b_image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${b_image.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      bImageUrl = `/uploads/${fileName}`;
    }

    // ✅ Build SQL dynamically depending on what was uploaded
    if (imageUrl && bImageUrl) {
      await pool.query(
        `UPDATE banners
         SET banner_title1=$1, banner_title2=$2, paragraph=$3,
             button_name=$4, button_link=$5, image=$6, b_image=$7
         WHERE id=$8`,
        [bannerTitle1, bannerTitle2, paragraph, buttonName, buttonLink, imageUrl, bImageUrl, id]
      );
    } else if (imageUrl) {
      await pool.query(
        `UPDATE banners
         SET banner_title1=$1, banner_title2=$2, paragraph=$3,
             button_name=$4, button_link=$5, image=$6
         WHERE id=$7`,
        [bannerTitle1, bannerTitle2, paragraph, buttonName, buttonLink, imageUrl, id]
      );
    } else if (bImageUrl) {
      await pool.query(
        `UPDATE banners
         SET banner_title1=$1, banner_title2=$2, paragraph=$3,
             button_name=$4, button_link=$5, b_image=$6
         WHERE id=$7`,
        [bannerTitle1, bannerTitle2, paragraph, buttonName, buttonLink, bImageUrl, id]
      );
    } else {
      // ✅ Only text updates
      await pool.query(
        `UPDATE banners
         SET banner_title1=$1, banner_title2=$2, paragraph=$3,
             button_name=$4, button_link=$5
         WHERE id=$6`,
        [bannerTitle1, bannerTitle2, paragraph, buttonName, buttonLink, id]
      );
    }


    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error updating banner:", err);
    return Response.json({ error: "Failed to update banner" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    const bannerRes = await pool.query("SELECT * FROM banners WHERE id=$1", [id]);
    const banner = bannerRes.rows[0];

    if (banner?.image) {
      const filePath = path.join(process.cwd(), "public", banner.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.query("DELETE FROM banners WHERE id=$1", [id]);
    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting banner:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
