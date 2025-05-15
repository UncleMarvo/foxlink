import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

// PUT: Update a specific link
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const { id: linkId } = await params;
  // Ensure the link belongs to the user
  const link = await prisma.link.findUnique({ where: { id: linkId } });
  if (!link || link.userId !== session.user.id) {
    return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
  }
  // If updating a weighted link, check total weight
  if (data.rotationType === 'weighted') {
    // Get user
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    // Sum all other weighted links for this user, excluding the current link
    const links = await prisma.link.findMany({
      where: {
        userId: user.id,
        rotationType: 'weighted',
        NOT: { id: linkId },
      },
    });
    const sum = links.reduce((acc, link) => acc + (link.weight || 0), 0);
    if (sum + (data.weight || 0) > 100) {
      return NextResponse.json({ error: `Total weight for all weighted links cannot exceed 100. Current sum: ${sum}, this value would make it ${sum + (data.weight || 0)}.` }, { status: 400 });
    }
  }
  const updated = await prisma.link.update({
    where: { id: linkId },
    data: {
      title: data.title,
      url: data.url,
      icon: data.icon,
      typeId: data.typeId,
      rotationType: data.rotationType,
      weight: data.weight,
      scheduleStart: data.scheduleStart,
      scheduleEnd: data.scheduleEnd,
      isActive: data.isActive,
      category: data.category,
      tags: data.tags,
    },
  });
  return NextResponse.json({ link: updated });
}

// DELETE: Delete a specific link
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const linkId = params.id;
  // Ensure the link belongs to the user
  const link = await prisma.link.findUnique({ where: { id: linkId } });
  if (!link || link.userId !== session.user.id) {
    return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
  }
  await prisma.link.delete({ where: { id: linkId } });
  return NextResponse.json({ success: true });
} 