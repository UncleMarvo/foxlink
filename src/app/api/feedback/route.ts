import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

/**
 * POST /api/feedback
 * Allows logged-in users to submit feedback (message only).
 * Associates feedback with the user in the database.
 */
export async function POST(req: NextRequest) {
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
    const feedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        message: message.trim(),
      },
    });
    return NextResponse.json({ feedback });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/feedback',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to submit feedback.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const feedback = await prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ feedback });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/feedback',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to fetch feedback.' }, { status: 500 });
  }
} 