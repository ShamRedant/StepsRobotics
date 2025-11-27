import { NextResponse } from 'next/server';
import crypto from 'crypto';

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export async function POST(request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not available' }, { status: 404 });
  }

  const { username, password } = await request.json().catch(() => ({}));
  const expectedUser = process.env.DEV_ACCESS_USER || '';
  const expectedPass = process.env.DEV_ACCESS_PASS || '';
  const secret = process.env.DEV_SESSION_SECRET || '';

  if (!username || !password || username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60; // 1 hour
  const payload = String(exp);
  const signature = sign(payload, secret);
  const token = Buffer.from(`${payload}.${signature}`).toString('base64url');

  const res = NextResponse.redirect(new URL('/', request.url));
  res.cookies.set('dev_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });
  return res;
}

