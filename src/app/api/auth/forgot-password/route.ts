import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

// Set token expiry time (e.g., 1 hour)
const TOKEN_EXPIRY_MINUTES = 60;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Always respond with a generic message
  const genericResponse = NextResponse.json({ success: true });

  if (!email || typeof email !== 'string') {
    return genericResponse;
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Do not reveal if the email exists
    return genericResponse;
  }

  // Generate a secure random token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

  // Store the token in the database (PasswordResetToken table)
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expires,
      used: false,
    },
  });

  // Construct reset URL
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

  // Send the password reset email using the new utility
  try {
    await sendPasswordResetEmail({
      to: user.email ?? "",
      resetUrl,
      expires,
      username: user.username ?? user.email ?? ""
    });
  } catch (e) {
    // Log error but do not reveal to user
    console.error('Failed to send password reset email:', e);
  }

  return genericResponse;
}
// This endpoint allows users to request a password reset email in a secure, generic way. 