import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/utils/prisma';

const defaultSocials = {
  twitter_url: "",
  twitter_visible: true,
  facebook_url: "",
  facebook_visible: true,
  instagram_url: "",
  instagram_visible: true,
  linkedin_url: "",
  linkedin_visible: true,
  youtube_url: "",
  youtube_visible: true,
  tiktok_url: "",
  tiktok_visible: true,
  github_url: "",
  github_visible: true,
  twitch_url: "",
  twitch_visible: true,
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let config = await prisma.socialMedia.findUnique({
    where: { user_id: session.user.id },
  });
  if (!config) {
    config = await prisma.socialMedia.create({
      data: { user_id: session.user.id, ...defaultSocials },
    });
  }
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  try {
    await prisma.socialMedia.upsert({
      where: { user_id: session.user.id },
      update: { ...body, updated_at: new Date() },
      create: { user_id: session.user.id, ...body, updated_at: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save settings.' }, { status: 500 });
  }
} 