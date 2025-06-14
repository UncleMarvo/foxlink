import React from 'react';
import prisma from '@/utils/prisma';
import Image from 'next/image';
import ProfileViewTracker from '@/components/ProfileViewTracker';
import PublicLinksList from '@/components/PublicLinksList';
import { SocialMediaLinks } from '@/components/SocialMediaLinks';
import { ThemeProvider } from '@/app/context/ThemeContext';
import ProfilePageContent from './ProfilePageContent';
import { ProfileJsonLd } from '@/components/ProfileJsonLd';

// Helper to fetch user and links by username
async function getUserAndLinks(username: string) {
  // Fetch user and their links from the database
  // Assumes all links are public for now
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      bio: true,
      image: true,
      premium: true,
      links: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          url: true,
          rotationType: true,
          scheduleStart: true,
          scheduleEnd: true,
        },
      },
    },
  });
  if (!user) return null;
  return {
    ...user,
    links: user.links.filter((link: {
      id: string;
      title: string;
      url: string;
      rotationType: string;
      scheduleStart: Date | null;
      scheduleEnd: Date | null;
    }) => {
      if (link.rotationType === 'scheduled') {
        const now = new Date();
        const start = link.scheduleStart ? new Date(link.scheduleStart) : null;
        const end = link.scheduleEnd ? new Date(link.scheduleEnd) : null;
        return (
          (!start || now >= start) &&
          (!end || now <= end)
        );
      }
      return true;
    })
  };
}

// Helper to fetch public social media links for a user by username
async function getPublicSocialLinks(username: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profile/social-media/public/${username}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

// Helper to fetch user configs (appearance settings) by user id
async function getUserConfigs(userId: string) {
  return await prisma.userConfigs.findUnique({
    where: { user_id: userId },
    select: { theme: true, font_size: true, show_background_pattern: true },
  });
}

// The main server component
export default async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getUserAndLinks(username);
  const socialLinks = await getPublicSocialLinks(username);
  const userConfigs = user && user.id ? await getUserConfigs(user.id) : null;

  if (!user) {
    // User not found
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  // Use the user's theme, fallback to 'OceanBreeze'
  const themeName = userConfigs?.theme || 'OceanBreeze';

  // Ensure we have the required data for JSON-LD
  const displayName = user.name || user.username || '';
  const avatarUrl = user.image || undefined;

  return (
    <>
      <ProfileJsonLd
        username={username}
        displayName={displayName}
        avatarUrl={avatarUrl}
        socialLinks={socialLinks}
      />
      <ThemeProvider initialTheme={themeName as any}>
        <ProfilePageContent user={user} socialLinks={socialLinks} userConfigs={userConfigs} />
      </ThemeProvider>
    </>
  );
} 