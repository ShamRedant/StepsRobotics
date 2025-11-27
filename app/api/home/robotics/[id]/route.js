import pool from "@/lib/db";

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await pool.query("DELETE FROM robotics_section WHERE id=$1 AND type='feature'", [id]);
    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return Response.json({ error: "Failed to delete feature" }, { status: 500 });
  }
}
