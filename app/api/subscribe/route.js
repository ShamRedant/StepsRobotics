import { NextResponse } from "next/server";
import pool from "@/lib/db";

// export async function GET() {
//   try {
//     const { rows } = await pool.query(
//       `SELECT * FROM subscribers ORDER BY created_at DESC`
//     );
//     return NextResponse.json(rows);
//   } catch {
//     return NextResponse.json(
//       { error: "Failed to fetch subscribers" },
//       { status: 500 }
//     );
//   }
// }


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    const listQuery = await pool.query(
      `SELECT * FROM subscribers ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countQuery = await pool.query(`SELECT COUNT(*) FROM subscribers`);
    const total = parseInt(countQuery.rows[0].count);

    return NextResponse.json({
      data: listQuery.rows,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { email, honeypot } = await req.json();

    // 🛡 Bot check — honeypot field must be empty
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ message: "Bot detected" }, { status: 400 });
    }

    // Email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    // Insert into DB
    await pool.query(
      `INSERT INTO subscribers (email) VALUES ($1)`,
      [email]
    );

    return NextResponse.json({ message: "Subscribed successfully!" });

  } catch (err) {
    if (err.code === "23505") {
      return NextResponse.json(
        //If the Email is already registered again show the success message to the user
        { message: "Subscribed successfully!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
