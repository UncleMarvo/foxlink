import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const excludeId = searchParams.get('excludeId');
  // Find all weighted links for the user, optionally excluding one
  const where: any = {
    user: { email: session.user.email },
    rotationType: 'weighted',
  };
  if (excludeId) {
    where.NOT = { id: excludeId };
  }
  const links = await prisma.link.findMany({ where });
  const sum = links.reduce((acc, link) => acc + (link.weight || 0), 0);
  return NextResponse.json({ sum });
} 