// app/api/set-token/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!nextAuthToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Generate your own custom token
  const customToken = jwt.sign(
    {
      id: nextAuthToken.id,
      name: nextAuthToken.name,
      email: nextAuthToken.email,
      role: nextAuthToken.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const response = NextResponse.redirect(new URL('/dashboard', request.url));

  response.cookies.set('token', customToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
