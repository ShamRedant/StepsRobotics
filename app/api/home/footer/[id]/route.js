import pool from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const {
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
  } = body;

  try {
    const query = `
      UPDATE footer_info SET
        logo_url=$1, address=$2, mobile=$3, email=$4,
        talk_image=$5, facebook=$6, twitter=$7, instagram=$8,
        youtube=$9, linkedin=$10
      WHERE id=$11 RETURNING *`;
    const values = [
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
      id,
    ];
    const res = await pool.query(query, values);
    return Response.json(res.rows[0]);
  } catch (err) {
    console.error("Footer UPDATE Error:", err);
    return Response.json({ error: "Failed to update footer" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await pool.query("DELETE FROM footer_info WHERE id=$1", [id]);
    return Response.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Footer DELETE Error:", err);
    return Response.json({ error: "Failed to delete footer" }, { status: 500 });
  }
}
