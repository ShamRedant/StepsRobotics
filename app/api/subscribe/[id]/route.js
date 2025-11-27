import { NextResponse } from "next/server";
import pool from "@/lib/db";

// export async function DELETE(req, { params }) {
//   const { id } = params;

//   try {
//     await pool.query(`DELETE FROM subscribers WHERE id = $1`, [id]);
//     return NextResponse.json({ message: "Deleted successfully!" });
//   } catch {
//     return NextResponse.json(
//       { error: "Failed to delete email" },
//       { status: 500 }
//     );
//   }
// }


export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await pool.query(`DELETE FROM subscribers WHERE id = $1`, [id]);
    return NextResponse.json({ message: "Deleted successfully!" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete email" },
      { status: 500 }
    );
  }
}
