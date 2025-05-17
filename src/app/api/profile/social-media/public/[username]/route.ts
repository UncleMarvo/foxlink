import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// NOTE: If you see a type error here, run 'npx prisma generate' to update the Prisma client.
// The correct accessor for the SocialMedia model is 'prisma.socialMedia' (camelCase).

// List of supported social media platforms and their DB keys
const platforms = [
  { key: 'twitter', url: 'twitter_url', visible: 'twitter_visible' },
  { key: 'facebook', url: 'facebook_url', visible: 'facebook_visible' },
  { key: 'instagram', url: 'instagram_url', visible: 'instagram_visible' },
  { key: 'linkedin', url: 'linkedin_url', visible: 'linkedin_visible' },
  { key: 'youtube', url: 'youtube_url', visible: 'youtube_visible' },
  { key: 'tiktok', url: 'tiktok_url', visible: 'tiktok_visible' },
  { key: 'github', url: 'github_url', visible: 'github_visible' },
  { key: 'twitch', url: 'twitch_url', visible: 'twitch_visible' },
  { key: 'bluesky', url: 'bluesky_url', visible: 'bluesky_visible' },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  // Await params before destructuring to avoid Next.js dynamic API error
  const awaitedParams = await params;
  const { username } = awaitedParams;
  if (!username) {
    return NextResponse.json({ error: 'Username is required.' }, { status: 400 });
  }

  // Find the user by username
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  // Get the user's social media config
  const socials = await prisma.socialMedia.findUnique({
    where: { user_id: user.id },
  });
  if (!socials) {
    // No social media config found
    return NextResponse.json({});
  }

  // Filter to only visible and non-empty links
  const result: Record<string, string> = {};
  for (const { key, url, visible } of platforms) {
    // Use 'as any' to allow dynamic key access
    if ((socials as any)[visible] && (socials as any)[url]) {
      result[key] = (socials as any)[url];
    }
  }

  return NextResponse.json(result);
} 