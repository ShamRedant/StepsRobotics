import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const res = await pool.query("SELECT * FROM footer_info LIMIT 1");
    return Response.json(res.rows[0] || {});
  } catch (err) {
    console.error("❌ Footer GET Error:", err);
    return Response.json({ error: "Failed to fetch footer" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Fields
    const address = formData.get("address");
    const mobile = formData.get("mobile");
    const email = formData.get("email");
    const facebook = formData.get("facebook");
    const twitter = formData.get("twitter");
    const instagram = formData.get("instagram");
    const youtube = formData.get("youtube");
    const linkedin = formData.get("linkedin");

    // Image uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    let logo_url = null;
    let talk_image = null;

    // Handle logo upload
    const logoFile = formData.get("logo");
    if (logoFile && logoFile.name) {
      const logoPath = path.join(uploadDir, logoFile.name);
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      await fs.writeFile(logoPath, buffer);
      logo_url = `/uploads/${logoFile.name}`;
    }

    // Handle talk image upload
    const talkFile = formData.get("talk_image");
    if (talkFile && talkFile.name) {
      const talkPath = path.join(uploadDir, talkFile.name);
      const buffer = Buffer.from(await talkFile.arrayBuffer());
      await fs.writeFile(talkPath, buffer);
      talk_image = `/uploads/${talkFile.name}`;
    }

    // Check existing footer
    const existing = await pool.query("SELECT * FROM footer_info LIMIT 1");
    let result;

    if (existing.rows.length > 0) {
      // Update
      const old = existing.rows[0];
      result = await pool.query(
        `UPDATE footer_info SET
          logo_url = COALESCE($1, logo_url),
          address = $2,
          mobile = $3,
          email = $4,
          talk_image = COALESCE($5, talk_image),
          facebook = $6,
          twitter = $7,
          instagram = $8,
          youtube = $9,
          linkedin = $10
        WHERE id = $11
        RETURNING *`,
        [
          logo_url || old.logo_url,
          address,
          mobile,
          email,
          talk_image || old.talk_image,
          facebook,
          twitter,
          instagram,
          youtube,
          linkedin,
          old.id,
        ]
      );
    } else {
      // Insert
      result = await pool.query(
        `INSERT INTO footer_info
          (logo_url, address, mobile, email, talk_image, facebook, twitter, instagram, youtube, linkedin)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [
          logo_url,
          address,
          mobile,
          email,
          talk_image,
          facebook,
          twitter,
          instagram,
          youtube,
          linkedin,
        ]
      );
    }

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Footer POST Error:", err);
    return Response.json({ error: "Failed to save footer" }, { status: 500 });
  }
}
