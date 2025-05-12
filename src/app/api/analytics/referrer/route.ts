import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// GET: Return analytics grouped by referrer for the authenticated user
export async function GET(req: NextRequest) {
  try {
    // Require authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    // Parse date range from query params
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    let dateFilter = {};
    if (start && end) {
      dateFilter = { timestamp: { gte: new Date(start), lte: new Date(end + 'T23:59:59.999Z') } };
    }

    // Group profile views by referrer
    const profileViews = await prisma.analytics.groupBy({
      by: ['referrer'],
      where: {
        userId,
        type: 'profile_view',
        referrer: { not: null },
        ...dateFilter,
      },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
    });

    // Group link clicks by referrer
    const linkClicks = await prisma.analytics.groupBy({
      by: ['referrer'],
      where: {
        userId,
        type: 'link_click',
        referrer: { not: null },
        ...dateFilter,
      },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
    });

    // Format results as arrays of { referrer, count }
    const profileViewsData = profileViews.map(row => ({ referrer: row.referrer || 'Direct/Unknown', count: row._count.referrer }));
    const linkClicksData = linkClicks.map(row => ({ referrer: row.referrer || 'Direct/Unknown', count: row._count.referrer }));

    return NextResponse.json({
      profileViews: profileViewsData,
      linkClicks: linkClicksData,
    });
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching referrer analytics:', err);
    return NextResponse.json({ error: 'Failed to fetch referrer analytics' }, { status: 500 });
  }
} 