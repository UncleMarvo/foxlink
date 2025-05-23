import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// GET: List all links for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Check if user is premium
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { premium: true } });
    const isPremium = !!user?.premium;
    const PREMIUM_LINK_LIMIT = 1000; // Set your premium limit here
    const LINK_LIMIT = isPremium
      ? PREMIUM_LINK_LIMIT
      : parseInt(process.env.FREE_PLAN_LINK_LIMIT || '10', 10);
    const links = await prisma.link.findMany({
      where: { user: { email: session.user.email } },
      include: { type: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ links, linkLimit: LINK_LIMIT });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/links',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// POST: Create a new link for the logged-in user
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    // Validate required fields
    if (!data.title || !data.url) {
      return NextResponse.json({ error: 'Title and URL are required.' }, { status: 400 });
    }
    // Check if user is premium
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { premium: true } });
    const isPremium = !!user?.premium;
    const PREMIUM_LINK_LIMIT = 1000; // Set your premium limit here
    const LINK_LIMIT = isPremium
      ? PREMIUM_LINK_LIMIT
      : parseInt(process.env.FREE_PLAN_LINK_LIMIT || '10', 10);
    // If creating a weighted link, check total weight
    if (data.rotationType === 'weighted') {
      // Get user
      if (!session.user?.id) {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
      }
      // Sum all other weighted links for this user
      const links = await prisma.link.findMany({
        where: {
          userId: session.user.id,
          rotationType: 'weighted',
        },
      });
      const sum = links.reduce((acc, link) => acc + (link.weight || 0), 0);
      if (sum + (data.weight || 0) > 100) {
        return NextResponse.json({ error: `Total weight for all weighted links cannot exceed 100. Current sum: ${sum}, this value would make it ${sum + (data.weight || 0)}.` }, { status: 400 });
      }
    }
    // Find the user's current max order
    const maxOrder = await prisma.link.aggregate({
      where: { user: { email: session.user.email } },
      _max: { order: true },
    });
    const order = (maxOrder._max.order ?? 0) + 1;
    // Enforce link limit for user plan
    // Count the user's current links
    const currentLinkCount = await prisma.link.count({
      where: { user: { email: session.user.email } }
    });
    if (currentLinkCount >= LINK_LIMIT) {
      return NextResponse.json({ error: `You have reached your link limit of ${LINK_LIMIT}.` }, { status: 403 });
    }
    // Create the link
    const link = await prisma.link.create({
      data: {
        user: { connect: { email: session.user.email } },
        title: data.title,
        url: data.url,
        icon: data.icon || null,
        type: { connect: { id: data.typeId } },
        // typeId: data.typeId,
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
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/links',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 