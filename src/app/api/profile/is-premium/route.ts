import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// GET /api/profile/is-premium?email=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email }, select: { premium: true } });
  return NextResponse.json({ premium: !!user?.premium });
} 