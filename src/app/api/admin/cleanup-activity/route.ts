import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// POST /api/admin/cleanup-activity
// Deletes analytics entries older than the retention period (in days) set in .env
export async function POST(req: NextRequest) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  // Read retention period from env, default to 365 days
  const retentionDays = parseInt(process.env.ANALYTICS_RETENTION_DAYS || '365', 10);
  const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
  // Delete old analytics entries
  const result = await prisma.analytics.deleteMany({
    where: { timestamp: { lt: cutoffDate } }
  });
  return NextResponse.json({ success: true, deletedCount: result.count, cutoffDate });
} 