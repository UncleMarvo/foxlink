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
  const linkId = params.id;
  // Ensure the link belongs to the user
  const link = await prisma.link.findUnique({ where: { id: linkId } });
  if (!link || link.userId !== session.user.id) {
    return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
  }
  const updated = await prisma.link.update({
    where: { id: linkId },
    data: {
      title: data.title,
      url: data.url,
      icon: data.icon,
      type: data.type,
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