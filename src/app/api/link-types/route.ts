import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const types = await prisma.linkType.findMany({ orderBy: { label: 'asc' } });
  return NextResponse.json({ types });
} 