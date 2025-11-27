import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value; // cookie set on login
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      "SELECT id, full_name, email FROM users WHERE id = $1",
      [decoded.id]
    );
    const user = result.rows?.[0] || null;

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
