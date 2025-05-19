import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/profile/is-premium?email=...
export async function GET(req: NextRequest) {
  // Authenticate user
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Only allow the logged-in user to check their own premium status
  const email = session.user.email;
  const user = await prisma.user.findUnique({ where: { email }, select: { premium: true } });
  return NextResponse.json({ premium: !!user?.premium });
} 