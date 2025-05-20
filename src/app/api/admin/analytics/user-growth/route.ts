import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

// GET /api/admin/analytics/user-growth
// Returns the number of new users per day for the last 30 days
export async function GET(req: NextRequest) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = 30;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (days - 1));

    // Fetch all users created in the last 30 days
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Count users per day
    const counts: { [date: string]: number } = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      counts[key] = 0;
    }
    users.forEach((user) => {
      const key = user.createdAt.toISOString().slice(0, 10);
      if (counts[key] !== undefined) counts[key]++;
    });

    // Format as array for charting
    const result = Object.entries(counts).map(([date, count]) => ({ date, count }));

    return NextResponse.json({ data: result });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch user growth data.' }, { status: 500 });
  }
} 