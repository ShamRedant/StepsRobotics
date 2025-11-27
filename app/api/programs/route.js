import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM programs ORDER BY id DESC");
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { days, duration, time, venue, materials, mentors, batch_size } = await req.json();

    const result = await pool.query(
      `INSERT INTO programs (days, duration, time, venue, materials, mentors, batch_size)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [days, duration, time, venue, materials, mentors, batch_size]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
