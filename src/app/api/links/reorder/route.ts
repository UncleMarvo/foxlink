import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// POST: Reorder links for the logged-in user
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { ids } = await req.json(); // ids: string[]
  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  try {
    // Update the order of each link
    await Promise.all(
      ids.map((id, idx) =>
        prisma.link.update({
          where: { id, userId: session.user.id },
          data: { order: idx + 1 },
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/links/reorder',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 