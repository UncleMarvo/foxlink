import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/admin/analytics
// Returns basic platform metrics for the admin dashboard
export async function GET(req: NextRequest) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Total users
    const totalUsers = await prisma.user.count();
    // Active users (last 30 days)
    const activeSince = new Date();
    activeSince.setDate(activeSince.getDate() - 30);
    const activeUsers = await prisma.user.count({
      where: {
        updatedAt: { gte: activeSince },
      },
    });
    // Premium users
    const premiumUsers = await prisma.user.count({ where: { premium: true } });
    // Total links
    const totalLinks = await prisma.link.count();
    // Total clicks (from analytics table, type: 'link_click')
    const totalClicks = await prisma.analytics.count({ where: { type: 'link_click' } });

    return NextResponse.json({
      totalUsers,
      activeUsers,
      premiumUsers,
      totalLinks,
      totalClicks,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch analytics.' }, { status: 500 });
  }
} 