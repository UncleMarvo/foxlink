import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // Get all active campaigns
  const campaigns = await prisma.campaign.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });
  // Get user's opt-in status for each campaign
  const userCampaigns = await prisma.userCampaign.findMany({
    where: { userId: user.id },
  });
  // Map opt-in status to campaigns
  const campaignsWithOptIn = campaigns.map(campaign => {
    const userCampaign = userCampaigns.find(uc => uc.campaignId === campaign.id);
    return { ...campaign, optIn: userCampaign?.optIn || false };
  });
  try {
    return NextResponse.json(campaignsWithOptIn);
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/campaigns',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 