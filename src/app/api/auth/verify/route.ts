import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return NextResponse.redirect('/auth/verify/error');
  }

  // Find the verification token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!verificationToken || verificationToken.identifier !== email) {
    return NextResponse.redirect('/auth/verify/error');
  }
  if (verificationToken.expires < new Date()) {
    return NextResponse.redirect('/auth/verify/error');
  }

  // Mark user as verified
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });
  // Delete the token
  await prisma.verificationToken.delete({ where: { token } });

  // Redirect to success page
  return NextResponse.redirect('/auth/verify/success');
} 