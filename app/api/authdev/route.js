import { NextResponse } from 'next/server'
import crypto from 'crypto'

function signExp(secret, expStr) {
  return crypto.createHmac('sha256', secret).update(expStr).digest('base64url')
}

function getCookieAttributes() {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
  }
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const { username, password } = body

  const expectedUser = process.env.USERNAME
  const expectedPass = process.env.PASSWORD
  const secret = process.env.SESSION_SECRET

  if (!expectedUser || !expectedPass || !secret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const now = Math.floor(Date.now() / 1000)
  const exp = now + 60 * 60 // 1 hour
  const expStr = String(exp)
  const sig = signExp(secret, expStr)
  const value = `${expStr}.${sig}`

  const res = NextResponse.json({ ok: true })
  const attrs = getCookieAttributes()
  res.cookies.set('session', value, { ...attrs, expires: new Date(exp * 1000), maxAge: 60 * 60 })
  return res
}
