// app/api/home/robotics/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_FOLDER = "robotics";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// ensure upload dir exists at module load
async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

// save file and return public URL (e.g. /uploads/robotics/165xxx-name.png)
async function saveFile(file) {
  if (!file || typeof file === "string") return null;
  await ensureUploadDir();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = `${Date.now()}-${String(file.name).replace(/\s+/g, "_")}`;
  const fullPath = path.join(UPLOAD_DIR, safeName);
  await fs.writeFile(fullPath, buffer);
  return `/uploads/${safeName}`;
}

// try unlink a file path (only allow files inside /uploads/robotics/)
async function tryUnlink(publicPath) {
  try {
    if (!publicPath || typeof publicPath !== "string") return;
    // accept paths like "/uploads/robotics/filename.ext"
    if (!publicPath.startsWith(`/uploads/`)) return;
    const rel = publicPath.replace(/^\//, ""); // remove leading slash
    const full = path.join(process.cwd(), "public", rel);
    await fs.unlink(full).catch(() => {});
  } catch (e) {
    // ignore unlink errors
    console.warn("unlink failed", e?.message || e);
  }
}

// ---------- GET ----------
// Return latest section_data (single-row pattern)
export async function GET() {
  try {
    const res = await pool.query(
      "SELECT id, section_data FROM why_choose_robotics ORDER BY id DESC LIMIT 1"
    );
    const row = res.rows[0] || null;
    return NextResponse.json({ id: row?.id ?? null, section_data: row?.section_data ?? null });
  } catch (err) {
    console.error("GET robotics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ---------- POST ----------
// Create new row (or if you prefer replace existing you can change logic)
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Ensure folder
    await ensureUploadDir();

    // Save images if provided
    const imageOneFile = formData.get("image_one");
    const imageTwoFile = formData.get("image_two");

    const image_one = imageOneFile && imageOneFile.name ? await saveFile(imageOneFile) : null;
    const image_two = imageTwoFile && imageTwoFile.name ? await saveFile(imageTwoFile) : null;

    // Build features array (6 items expected)
    const features = [];
    for (let i = 0; i < 6; i++) {
      const title = formData.get(`features[${i}][title]`) || "";
      const iconFile = formData.get(`features[${i}][icon]`);
      const icon = iconFile && iconFile.name ? await saveFile(iconFile) : null;
      // include even if title empty to maintain length, but you can skip empty
      features.push({ title, icon });
    }

    const section_data = { image_one, image_two, features };

    // Insert as a new row (you may want to DELETE existing first or prefer multiple versions)
    await pool.query("INSERT INTO why_choose_robotics (section_data) VALUES ($1)", [
      section_data,
    ]);

    return NextResponse.json({ success: true, section_data });
  } catch (err) {
    console.error("POST robotics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ---------- PUT ----------
// Merge updates with existing data, preserve old images/icons if new ones not provided
export async function PUT(req) {
  try {
    const formData = await req.formData();

    // get existing row (latest)
    const existingRes = await pool.query(
      "SELECT id, section_data FROM why_choose_robotics ORDER BY id DESC LIMIT 1"
    );
    const existingRow = existingRes.rows[0];
    if (!existingRow) {
      return NextResponse.json({ error: "No existing robotics data to update" }, { status: 404 });
    }

    const id = existingRow.id;
    const current = existingRow.section_data || { image_one: null, image_two: null, features: [] };

    // images: preserve existing if not uploaded
    const imageOneFile = formData.get("image_one");
    const imageTwoFile = formData.get("image_two");

    let image_one = current.image_one ?? null;
    let image_two = current.image_two ?? null;

    // If new image provided, save and remove old file
    if (imageOneFile && imageOneFile.name) {
      const saved = await saveFile(imageOneFile);
      // remove previous if exists
      await tryUnlink(image_one);
      image_one = saved;
    }
    if (imageTwoFile && imageTwoFile.name) {
      const saved = await saveFile(imageTwoFile);
      await tryUnlink(image_two);
      image_two = saved;
    }

    // features: iterate 6 entries; if icon file provided for index, replace; otherwise keep existing icon
    const updatedFeatures = [];
    for (let i = 0; i < 6; i++) {
      // prefer posted title if present, else keep existing title
      const postedTitle = formData.get(`features[${i}][title]`);
      const existingFeature = Array.isArray(current.features) ? current.features[i] || {} : {};
      const title = typeof postedTitle === "string" && postedTitle.length > 0 ? postedTitle : existingFeature.title || "";

      const iconFile = formData.get(`features[${i}][icon]`);
      let icon = existingFeature.icon || null;

      if (iconFile && iconFile.name) {
        // new icon uploaded -> save and unlink old
        const saved = await saveFile(iconFile);
        await tryUnlink(icon);
        icon = saved;
      }

      updatedFeatures.push({ title, icon });
    }

    const newData = { ...current, image_one, image_two, features: updatedFeatures };

    await pool.query("UPDATE why_choose_robotics SET section_data = $1 WHERE id = $2", [
      newData,
      id,
    ]);

    return NextResponse.json({ success: true, section_data: newData });
  } catch (err) {
    console.error("PUT robotics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ---------- DELETE ----------
// Delete all rows (or you could delete only last)
export async function DELETE() {
  try {
    // Optional: fetch and delete files from disk too
    const existingRes = await pool.query("SELECT section_data FROM why_choose_robotics ORDER BY id DESC LIMIT 1");
    const existingRow = existingRes.rows[0];
    if (existingRow?.section_data) {
      const sd = existingRow.section_data;
      // unlink main images
      await tryUnlink(sd.image_one);
      await tryUnlink(sd.image_two);
      if (Array.isArray(sd.features)) {
        for (const f of sd.features) await tryUnlink(f?.icon);
      }
    }

    await pool.query("DELETE FROM why_choose_robotics");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE robotics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
