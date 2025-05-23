import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  try {
    const types = await prisma.linkType.findMany({ orderBy: { label: 'asc' } });
    return NextResponse.json({ types });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/link-types',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 