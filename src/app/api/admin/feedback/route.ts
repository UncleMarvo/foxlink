import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';

// GET /api/admin/feedback?search=&page=1&pageSize=20
// Returns a paginated list of feedback entries for admins
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

  // Build where clause for search
  const where = search
    ? {
        OR: [
          { message: { contains: search, mode: Prisma.QueryMode.insensitive } as Prisma.StringFilter },
          { user: { is: { name: { contains: search, mode: Prisma.QueryMode.insensitive } as Prisma.StringFilter } } },
          { user: { is: { email: { contains: search, mode: Prisma.QueryMode.insensitive } as Prisma.StringFilter } } },
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
    const feedbackWithStatus = feedback.map(fb => ({
      ...fb,
      status: fb.response ? 'resolved' : 'open',
    }));

    return NextResponse.json({ feedback: feedbackWithStatus, total, page, pageSize });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch feedback.' }, { status: 500 });
  }
} 