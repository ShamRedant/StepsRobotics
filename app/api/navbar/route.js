// app/api/navbar/route.js
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM navbar_items ORDER BY order_index ASC"
    );
    return Response.json(result.rows);
  } catch (err) {
    console.error("❌ Database error:", err);
    return Response.json(
      { error: "Failed to fetch navbar", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { label, href } = await req.json();
    const result = await pool.query(
      "INSERT INTO navbar_items (label, href) VALUES ($1, $2) RETURNING *",
      [label, href]
    );
    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to add navbar item" }, { status: 500 });
  }
}



export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, label, href, visible } = body;

    await pool.query(
      "UPDATE navbar_items SET label = $1, href = $2, visible = $3 WHERE id = $4",
      [label, href, visible, id]
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error updating menu:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await pool.query("DELETE FROM navbar_items WHERE id=$1", [id]);
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to delete navbar item" }, { status: 500 });
  }
}

async function fetchNavbar() {
  const res = await fetch("/api/navbar");
  const data = await res.json();
  console.log("Navbar API response:", data); // 🧩 check this in browser console
  setMenuItems(Array.isArray(data) ? data : []); // safely set only arrays
}

