import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// POST /api/profile/delete-account
// Deletes the authenticated user's account and all related data
export async function POST(req: NextRequest) {
  // Get session to ensure user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete all analytics for the user
    await prisma.analytics.deleteMany({ where: { userId: session.user.id } });
    // Delete all links for the user
    await prisma.link.deleteMany({ where: { userId: session.user.id } });
    // Delete the user account
    await prisma.user.delete({ where: { email: session.user.email } });
    // Optionally: delete other related data (sessions, feedback, etc.)
    return NextResponse.json({ success: true });
  } catch (err) {
    // Optionally log error: console.error('Error deleting account:', err);
    return NextResponse.json({ error: 'Failed to delete account.' }, { status: 500 });
  }
} 