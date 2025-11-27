// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function middleware(request) {
//   const protectedPaths = ['/dashboard', '/api/protected'];
//   const { pathname } = request.nextUrl;

//   if (protectedPaths.some((path) => pathname.startsWith(path))) {
//     const token = request.cookies.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     try {
//       // Use jose for JWT verification in Edge Runtime
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);

//       await jwtVerify(token, secret);
//     } catch (err) {
//       console.error('JWT verification failed:', err);
//       return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     }
//   }

//   return NextResponse.next();
// }

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(request) {
  if (process.env.NODE_ENV === 'development') {
    const { pathname } = request.nextUrl;
    const allow =
      pathname.startsWith('/dev-login') ||
      pathname.startsWith('/api/dev-login') ||
      pathname.startsWith('/api/dev-logout') ||
      pathname.startsWith('/_next') ||
      pathname === '/favicon.ico' ||
      pathname.startsWith('/api'); 

    if (!allow) {
      const devToken = request.cookies.get('dev_session')?.value;
      if (!devToken) {
        const url = new URL('/dev-login', request.url);
        return NextResponse.redirect(url);
      }
    }
  }

  const protectedPaths = ['/dashboard', '/api/protected'];
  const { pathname } = request.nextUrl;
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};