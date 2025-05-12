import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// GET: Return analytics grouped by country for the authenticated user
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

    // Group profile views by country
    const profileViews = await prisma.analytics.groupBy({
      by: ['country'],
      where: {
        userId,
        type: 'profile_view',
        country: { not: null },
        ...dateFilter,
      },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
    });

    // Group link clicks by country
    const linkClicks = await prisma.analytics.groupBy({
      by: ['country'],
      where: {
        userId,
        type: 'link_click',
        country: { not: null },
        ...dateFilter,
      },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
    });

    // Format results as arrays of { country, count }
    const profileViewsData = profileViews.map(row => ({ country: row.country || 'Unknown', count: row._count.country }));
    const linkClicksData = linkClicks.map(row => ({ country: row.country || 'Unknown', count: row._count.country }));

    return NextResponse.json({
      profileViews: profileViewsData,
      linkClicks: linkClicksData,
    });
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching geographic analytics:', err);
    return NextResponse.json({ error: 'Failed to fetch geographic analytics' }, { status: 500 });
  }
} 