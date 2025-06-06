import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await prisma.userCampaign.upsert({
      where: { userId_campaignId: { userId: user.id, campaignId: id } },
      update: { optIn: false, optedAt: new Date() },
      create: { userId: user.id, campaignId: id, optIn: false },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/campaigns/[id]/opt-out',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to opt out of campaign.' }, { status: 500 });
  }
} 