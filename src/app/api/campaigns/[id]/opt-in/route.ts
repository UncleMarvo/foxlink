import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const { id } = params;
    await prisma.userCampaign.upsert({
      where: { userId_campaignId: { userId: user.id, campaignId: id } },
      update: { optIn: true, optedAt: new Date() },
      create: { userId: user.id, campaignId: id, optIn: true },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/campaigns/[id]/opt-in',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to opt in to campaign.' }, { status: 500 });
  }
} 