import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
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
  // Backend validation for allowed keys, URL format, and booleans
  const allowedKeys = [
    'twitter_url', 'twitter_visible',
    'facebook_url', 'facebook_visible',
    'instagram_url', 'instagram_visible',
    'linkedin_url', 'linkedin_visible',
    'youtube_url', 'youtube_visible',
    'tiktok_url', 'tiktok_visible',
    'github_url', 'github_visible',
    'twitch_url', 'twitch_visible',
    'bluesky_url', 'bluesky_visible',
  ];
  const urlKeys = allowedKeys.filter(k => k.endsWith('_url'));
  const visibleKeys = allowedKeys.filter(k => k.endsWith('_visible'));
  // Check for unknown keys
  for (const key of Object.keys(body)) {
    if (!allowedKeys.includes(key)) {
      return NextResponse.json({ error: `Unknown field: ${key}` }, { status: 400 });
    }
  }
  // Validate URLs and booleans
  for (const key of urlKeys) {
    const value = body[key];
    if (value && typeof value === 'string' && value.length > 0) {
      try {
        new URL(value);
      } catch {
        return NextResponse.json({ error: `Invalid URL for ${key}` }, { status: 400 });
      }
    }
  }
  for (const key of visibleKeys) {
    const value = body[key];
    if (typeof value !== 'boolean') {
      return NextResponse.json({ error: `Field ${key} must be a boolean` }, { status: 400 });
    }
  }
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