import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protect /admin and /api/admin routes
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only apply to /admin and /api/admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Get NextAuth token (JWT)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // If not logged in, redirect to sign-in
    if (!token) {
      const signInUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(signInUrl);
    }
    // Check for admin role
    if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
      // Optionally, redirect to a forbidden page or home
      return NextResponse.redirect(new URL('/', req.url));
    }
    // Allow access
    return NextResponse.next();
  }
  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}; 