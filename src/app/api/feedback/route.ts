import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

/**
 * POST /api/feedback
 * Allows logged-in users to submit feedback (message only).
 * Associates feedback with the user in the database.
 */
export async function POST(req: Request) {
  // Get user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const { message } = await req.json();
  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    // Create feedback entry
    await prisma.feedback.create({
      data: {
        userId: user.id,
        message: message.trim(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit feedback.' }, { status: 500 });
  }
} 