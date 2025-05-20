import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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
    update: { optIn: false, optedAt: new Date() },
    create: { userId: user.id, campaignId: id, optIn: false },
  });
  return NextResponse.json({ success: true });
} 