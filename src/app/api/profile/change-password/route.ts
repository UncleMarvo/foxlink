import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import { compare, hash } from 'bcryptjs';

// POST /api/profile/change-password
// Allows an authenticated user to change their password securely
export async function POST(req: NextRequest) {
  // Get session to ensure user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse JSON body
  const { currentPassword, newPassword } = await req.json();

  // Validate input
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 });
  }

  // Fetch user from database
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || !user.password) {
    return NextResponse.json({ error: 'User not found or password not set.' }, { status: 404 });
  }

  // Check current password
  const isValid = await compare(currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
  }

  // Hash new password
  const hashedPassword = await hash(newPassword, 10);

  // Update password in database
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 });
  }
} 