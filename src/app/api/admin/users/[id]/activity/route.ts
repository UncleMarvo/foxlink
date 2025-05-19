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
    // Parse pagination params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
    const skip = (page - 1) * pageSize;
    // Fetch total count
    const total = await prisma.analytics.count({ where: { userId: id } });
    // Fetch paginated analytics events for the user
    const activity = await prisma.analytics.findMany({
      where: { userId: id },
      orderBy: { timestamp: 'desc' },
      skip,
      take: pageSize,
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
    return NextResponse.json({ activity, total, page, pageSize });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch user activity.' }, { status: 500 });
  }
} 