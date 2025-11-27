// app/api/protected/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
//   return Response.json(token);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Protected data', user });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
