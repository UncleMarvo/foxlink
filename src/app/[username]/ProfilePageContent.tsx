"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import ProfileViewTracker from "@/components/ProfileViewTracker";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";
import PublicLinksList from "@/components/PublicLinksList";

interface ProfilePageContentProps {
  user: any;
  socialLinks: Record<string, string>;
  userConfigs: any;
}

/**
 * Client component for the themed public profile page content.
 * Uses the theme context for all colors and styles.
 */
const ProfilePageContent: React.FC<ProfilePageContentProps> = ({ user, socialLinks, userConfigs }) => {
  const { colors } = useTheme();

  // Build style for background and pattern
  const backgroundStyle: React.CSSProperties = {
    background: colors.background,
    ...(userConfigs?.show_background_pattern && colors.backgroundPattern
      ? { backgroundImage: colors.backgroundPattern, backgroundSize: 'cover' }
      : {}),
  };

  // Map font_size to Tailwind class
  const fontSizeClass = userConfigs?.font_size === "small"
    ? "text-base"
    : userConfigs?.font_size === "large"
    ? "text-xl"
    : "text-lg"; // default to medium

  return (
    <div
      className={"flex flex-col items-center min-h-screen py-8 px-4 w-full " + fontSizeClass}
      style={backgroundStyle}
    >
      {/* Track profile page view */}
      <ProfileViewTracker userId={user.id} />
      {/* Profile info */}
      <div
        className="flex flex-col items-center mb-8 w-full max-w-xl rounded-xl shadow-lg p-4"
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 2px 8px 0 ${colors.shadow}`,
        }}
      >
        {/* Avatar: 100x100px, circular, themed border */}
        {user.image && (
          <Image
            src={user.image}
            alt={user.name || user.username || user.email || 'User avatar'}
            width={100}
            height={100}
            className="rounded-full mb-2"
            style={{ border: `4px solid ${colors.primary}` }}
          />
        )}
        {/* Username or email under avatar */}
        <div className="text-lg font-semibold" style={{ color: colors.text.secondary }}>
          {user.username || user.email}
        </div>
        {/* Name and bio */}
        <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          {user.name || user.username || user.email}
        </h1>
        {user.bio && (
          <p
            className="mt-2 max-w-md text-center"
            style={{ color: colors.text.secondary }}
          >
            {user.bio}
          </p>
        )}
        {/* Social media links (public, visible only) */}
        <div className="mt-4">
          <SocialMediaLinks links={socialLinks} color={colors.primary} username={user.username} />
        </div>
      </div>
      {/* Links (client component for analytics tracking) */}
      <div className="w-full max-w-xl mt-6">
        <PublicLinksList links={user.links} themeColors={colors} fontSize={userConfigs?.font_size || "medium"} />
      </div>
    </div>
  );
};

export default ProfilePageContent; 