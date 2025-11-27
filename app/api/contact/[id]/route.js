import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { rows } = await pool.query("SELECT * FROM contacts WHERE id = $1", [params.id]);
    return NextResponse.json(rows[0] || {});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    await pool.query(
      "UPDATE contacts SET firstName=$1, lastName=$2, email=$3, phone=$4, message=$5 WHERE id=$6",
      [firstName, lastName, email, phone, message, params.id]
    );

    return NextResponse.json({ message: "Contact updated successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await pool.query("DELETE FROM contacts WHERE id=$1", [params.id]);
    return NextResponse.json({ message: "Contact deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
