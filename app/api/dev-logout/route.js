import { NextResponse } from 'next/server';

export async function GET(request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not available' }, { status: 404 });
  }
  const res = NextResponse.redirect(new URL('/dev-login', request.url));
  res.cookies.set('dev_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}

