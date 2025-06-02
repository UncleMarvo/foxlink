import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// PUT: Update a specific link
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
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
      const sum = links.reduce((acc: number, link: { weight?: number | null }) => acc + (link.weight || 0), 0);
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
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/links/[id]',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// DELETE: Delete a specific link
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id: linkId } = await params;
    // Ensure the link belongs to the user
    const link = await prisma.link.findUnique({ where: { id: linkId } });
    if (!link || link.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }
    // Store the order and userId before deleting
    const deletedOrder = link.order;
    const userId = link.userId;
    // Delete the link
    await prisma.link.delete({ where: { id: linkId } });
    // Reorder remaining links: decrement order for all links with order > deletedOrder
    await prisma.link.updateMany({
      where: {
        userId,
        order: { gt: deletedOrder },
      },
      data: {
        order: { decrement: 1 },
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/links/[id]',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 