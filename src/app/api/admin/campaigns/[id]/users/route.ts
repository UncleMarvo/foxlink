import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'ADMIN';
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { id } = await params;
  const userCampaigns = await prisma.userCampaign.findMany({
    where: { campaignId: id },
    include: { user: { select: { id: true, email: true, username: true, name: true } } },
  });
  return NextResponse.json(userCampaigns);
} 