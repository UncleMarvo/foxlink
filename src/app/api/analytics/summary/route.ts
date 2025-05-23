import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// API route for analytics summary with custom date range
export async function GET(req: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  // Validate date range
  if (!start || !end) {
    return NextResponse.json({ error: 'Missing start or end date.' }, { status: 400 });
  }

  // Authenticate user
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    // Fetch profile views in date range
    const profileViews = await prisma.analytics.count({
      where: {
        userId,
        type: 'profile_view',
        timestamp: {
          gte: new Date(start),
          lte: new Date(end + 'T23:59:59.999Z'),
        },
      },
    });
    // Fetch per-link click counts in date range
    const linkClicks = await prisma.analytics.groupBy({
      by: ['linkId'],
      where: {
        userId,
        type: 'link_click',
        linkId: { not: null },
        timestamp: {
          gte: new Date(start),
          lte: new Date(end + 'T23:59:59.999Z'),
        },
      },
      _count: { linkId: true },
    });
    // Fetch social media click counts by platform in date range
    const socialMediaClicksRaw = await prisma.analytics.groupBy({
      by: ['platform'],
      where: {
        userId,
        type: 'link_click',
        linkId: null,
        platform: { not: null },
        timestamp: {
          gte: new Date(start),
          lte: new Date(end + 'T23:59:59.999Z'),
        },
      },
      _count: { platform: true },
    });
    // Convert to object: { platform: count }
    const socialMediaClicks = Object.fromEntries(
      socialMediaClicksRaw
        .filter(sm => sm.platform)
        .map(sm => [sm.platform, sm._count.platform])
    );
    // Fetch link titles for the user's links
    const links = await prisma.link.findMany({
      where: { userId },
      select: { id: true, title: true },
    });
    const linkTitleMap = Object.fromEntries(links.map(l => [l.id, l.title]));
    // Only include clicks for valid (non-null) linkIds
    const perLinkClicks = linkClicks
      .filter(lc => lc.linkId !== null)
      .map(lc => ({
        linkId: lc.linkId!,
        title: linkTitleMap[lc.linkId as string] || '(untitled)',
        clicks: lc._count.linkId,
      }));
    // Fetch total links created in date range
    const totalLinks = await prisma.link.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(start),
          lte: new Date(end + 'T23:59:59.999Z'),
        },
      },
    });
    // Fetch total clicks in date range
    const totalClicks = perLinkClicks.reduce((acc, l) => acc + l.clicks, 0);
    // Fetch unique visitors (distinct IPs for profile views in range)
    const uniqueVisitorRecords = await prisma.analytics.findMany({
      where: {
        userId,
        type: 'profile_view',
        timestamp: {
          gte: new Date(start),
          lte: new Date(end + 'T23:59:59.999Z'),
        },
      },
      distinct: 'ip',
      select: { ip: true },
    });
    const uniqueVisitors = uniqueVisitorRecords.length;
    // Click Rate
    let rawRate = uniqueVisitors > 0 ? (totalClicks / uniqueVisitors) * 100 : 0;
    rawRate = Math.min(rawRate, 100);
    const conversionRate = `${Math.round(rawRate)}%`;
    // Return analytics summary
    return NextResponse.json({ profileViews, perLinkClicks, totalLinks, totalClicks, uniqueVisitors, conversionRate, socialMediaClicks });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/analytics/summary',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to fetch analytics summary.' }, { status: 500 });
  }
} 