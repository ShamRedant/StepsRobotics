import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await pool.query("SELECT * FROM programs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return Response.json({ message: "Program not found" }, { status: 404 });
    }
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { days, duration, time, venue, materials, mentors, batch_size } = await req.json();

    const result = await pool.query(
      `UPDATE programs
       SET days=$1, duration=$2, time=$3, venue=$4, materials=$5, mentors=$6, batch_size=$7
       WHERE id=$8 RETURNING *`,
      [days, duration, time, venue, materials, mentors, batch_size, id]
    );

    if (result.rows.length === 0) {
      return Response.json({ message: "Program not found" }, { status: 404 });
    }
    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const result = await pool.query("DELETE FROM programs WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return Response.json({ message: "Program not found" }, { status: 404 });
    }
    return Response.json({ message: "Program deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
