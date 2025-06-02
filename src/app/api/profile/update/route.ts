import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import path from 'path';
import fs from 'fs/promises';
import { reportError } from '@/lib/errorHandler';
import { CriticalError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data,
    });
    return NextResponse.json({ user: updated });
  } catch (err) {
    await reportError({
      error: err as Error,
      endpoint: '/api/profile/update',
      method: req.method,
    });
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
} 