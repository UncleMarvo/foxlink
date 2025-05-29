import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// GET /api/profile/export-data
// Returns all user data as a downloadable JSON file (GDPR compliance)
export async function GET(req: NextRequest) {
  // Get session to ensure user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, bio: true, image: true, premium: true, createdAt: true, updatedAt: true },
    });
    // Fetch all links
    const links = await prisma.link.findMany({ where: { userId: session.user.id } });
    // Fetch all analytics
    const analytics = await prisma.analytics.findMany({ where: { userId: session.user.id } });
    // Fetch all feedback (if any)
    const feedback = await prisma.feedback.findMany({ where: { userId: session.user.id } });

    // Bundle all data
    const exportData = {
      user,
      links,
      analytics,
      feedback,
      exportedAt: new Date().toISOString(),
    };

    // Return as downloadable JSON file
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="foxlink_userdata_${session.user.id}.json"`,
      },
    });
  } catch (err) {
    // Optionally log error: console.error('Error exporting data:', err);
    return NextResponse.json({ error: 'Failed to export data.' }, { status: 500 });
  }
} 