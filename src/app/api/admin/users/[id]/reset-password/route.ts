import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../auth/[...nextauth]/route';

// POST /api/admin/users/[id]/reset-password
// Admin triggers a password reset email for a user
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing user id.' }, { status: 400 });
  }

  // Find the user
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  if (!user.email) {
    return NextResponse.json({ error: 'User does not have an email address.' }, { status: 400 });
  }

  // Generate a password reset token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry

  // Store the token in the VerificationToken table with identifier 'reset:<email>'
  await prisma.verificationToken.create({
    data: {
      identifier: `reset:${user.email}`,
      token,
      expires,
    },
  });

  // Construct reset URL
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

  // Send the password reset email using the new utility
  try {
    // Use user.name if available, otherwise fallback to user.email for username
    await sendPasswordResetEmail({ to: user.email, username: user.name || user.email, resetUrl, expires });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send password reset email.' }, { status: 500 });
  }
} 