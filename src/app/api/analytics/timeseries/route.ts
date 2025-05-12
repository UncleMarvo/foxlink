import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// Helper to get YYYY-MM-DD string from Date
function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Helper to group analytics by day
function groupByDay(records: { timestamp: Date }[]) {
  const counts: Record<string, number> = {};
  for (const rec of records) {
    const day = formatDate(new Date(rec.timestamp));
    counts[day] = (counts[day] || 0) + 1;
  }
  // Convert to sorted array
  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// GET: Return daily analytics for the last 30 days for the authenticated user
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
    let startDate: Date, endDate: Date;
    if (start && end) {
      startDate = new Date(start);
      endDate = new Date(end + 'T23:59:59.999Z');
    } else {
      // Default: last 30 days
      const now = new Date();
      endDate = now;
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 29);
    }

    // Fetch all profile views in the date range
    const profileViewsRaw = await prisma.analytics.findMany({
      where: {
        userId,
        type: 'profile_view',
        timestamp: { gte: startDate, lte: endDate },
      },
      select: { timestamp: true },
    });

    // Fetch all link clicks in the date range
    const linkClicksRaw = await prisma.analytics.findMany({
      where: {
        userId,
        type: 'link_click',
        timestamp: { gte: startDate, lte: endDate },
      },
      select: { timestamp: true },
    });

    // Group and count by day
    const profileViews = groupByDay(profileViewsRaw);
    const linkClicks = groupByDay(linkClicksRaw);

    return NextResponse.json({
      profileViews,
      linkClicks,
    });
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching time-based analytics:', err);
    return NextResponse.json({ error: 'Failed to fetch time-based analytics' }, { status: 500 });
  }
} 