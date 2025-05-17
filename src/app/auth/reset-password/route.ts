import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import bcrypt from 'bcryptjs';

// POST /api/auth/reset-password
export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  // Validate input
  if (!token || typeof token !== 'string' || !password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ success: false, error: 'Invalid input.' }, { status: 400 });
  }

  // Find the reset token in the database
  const resetToken = await prisma.PasswordResetToken.findUnique({ where: { token } });
  if (!resetToken || resetToken.used || resetToken.expires < new Date()) {
    return NextResponse.json({ success: false, error: 'Invalid or expired token.' }, { status: 400 });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Update the user's password
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Mark the token as used
  await prisma.PasswordResetToken.update({
    where: { token },
    data: { used: true },
  });

  // Respond with success
  return NextResponse.json({ success: true });
}

// Note: This endpoint expects a POST request with { token, password } in the body.
// The password must be at least 8 characters. Adjust validation as needed.
// Make sure to install bcryptjs if not already present. 