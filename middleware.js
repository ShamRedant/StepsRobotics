import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const auth = request.headers.get('authorization')

  if (!auth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  const decoded = Buffer.from(auth.split(' ')[1], 'base64').toString()
  const [username, password] = decoded.split(':')

  if (
    username !== process.env.BASIC_AUTH_USER ||
    password !== process.env.BASIC_AUTH_PASS
  ) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  const protectedPaths = ['/dashboard', '/api/protected']

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
    } catch (err) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
