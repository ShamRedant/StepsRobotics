import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM logo");
    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return Response.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
