import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// GET: List all links for the logged-in user
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const links = await prisma.link.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json({ links });
}

// POST: Create a new link for the logged-in user
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  // Validate required fields
  if (!data.title || !data.url) {
    return NextResponse.json({ error: 'Title and URL are required.' }, { status: 400 });
  }
  // Find the user's current max order
  const maxOrder = await prisma.link.aggregate({
    where: { user: { email: session.user.email } },
    _max: { order: true },
  });
  const order = (maxOrder._max.order ?? 0) + 1;
  // Create the link
  const link = await prisma.link.create({
    data: {
      user: { connect: { email: session.user.email } },
      title: data.title,
      url: data.url,
      icon: data.icon || null,
      type: data.type || 'website',
      rotationType: data.rotationType || 'always',
      weight: data.weight || null,
      scheduleStart: data.scheduleStart || null,
      scheduleEnd: data.scheduleEnd || null,
      isActive: data.isActive !== undefined ? data.isActive : true,
      order,
      category: data.category || null,
      tags: data.tags || null,
    },
  });
  return NextResponse.json({ link });
} 