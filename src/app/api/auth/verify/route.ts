import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.redirect(new URL('/auth/verify/error', req.nextUrl.origin));
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken || verificationToken.identifier !== email) {
      return NextResponse.redirect(new URL('/auth/verify/error', req.nextUrl.origin));
    }
    if (verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL('/auth/verify/error', req.nextUrl.origin));
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });
    // Delete the token
    await prisma.verificationToken.delete({ where: { token } });

    // Redirect to success page
    return NextResponse.redirect(new URL('/auth/verify/success', req.nextUrl.origin));
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/auth/verify',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 