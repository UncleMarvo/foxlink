import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

// GET /api/admin/feedback?search=&page=1&pageSize=20
// Returns a paginated list of feedback entries for admins
export async function GET(req: NextRequest) {
  // Authenticate user and check admin role
  const session = await getServerSession(authOptions);
  if (!session || session.user.role?.toLowerCase() !== 'admin') {
    // Only admins can access this endpoint
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

  // Build where clause for search
  const where = search
    ? {
        OR: [
          { message: { contains: search, mode: "insensitive" as const } },
          { user: { is: { name: { contains: search, mode: "insensitive" as const } } } },
          { user: { is: { email: { contains: search, mode: "insensitive" as const } } } },
        ],
      }
    : {};

  try {
    // Fetch feedback with pagination and user info
    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          message: true,
          response: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.feedback.count({ where }),
    ]);

    // Add status (open/resolved) based on response
    const feedbackWithStatus = feedback.map((fb: { response?: string | null; [key: string]: any }) => ({
      ...fb,
      status: fb.response ? 'resolved' : 'open',
    }));

    return NextResponse.json({ feedback: feedbackWithStatus, total, page, pageSize });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/admin/feedback',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to fetch feedback.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const feedback = await prisma.feedback.create({ data });
    return NextResponse.json({ feedback });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/admin/feedback',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 