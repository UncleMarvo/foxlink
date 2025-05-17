import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// GET /api/admin/users/[id]/activity
// Fetch recent analytics activity for a user (last 20 events)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing user id.' }, { status: 400 });
  }
  try {
    // Fetch the last 20 analytics events for the user
    const activity = await prisma.analytics.findMany({
      where: { userId: id },
      orderBy: { timestamp: 'desc' },
      take: 20,
      select: {
        id: true,
        type: true,
        timestamp: true,
        referrer: true,
        platform: true,
        country: true,
        linkId: true,
      },
    });
    return NextResponse.json({ activity });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch user activity.' }, { status: 500 });
  }
} 