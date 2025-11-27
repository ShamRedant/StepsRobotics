import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all contacts
export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM contacts ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO contacts (firstName, lastName, email, phone, message) VALUES ($1, $2, $3, $4, $5)",
      [firstName, lastName, email, phone, message]
    );

    return NextResponse.json({ message: "Message submitted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
