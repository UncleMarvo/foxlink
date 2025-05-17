import React from "react";
import {
  FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaGithub, FaTwitch
} from "react-icons/fa";
import { SiBluesky } from "react-icons/si"; // BlueSky icon

// Map platform keys to icon components and labels
const platformMeta: Record<string, { icon: React.ElementType; label: string }> = {
  twitter: { icon: FaTwitter, label: "Twitter" },
  facebook: { icon: FaFacebook, label: "Facebook" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  youtube: { icon: FaYoutube, label: "YouTube" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
  github: { icon: FaGithub, label: "GitHub" },
  twitch: { icon: FaTwitch, label: "Twitch" },
  bluesky: { icon: SiBluesky, label: "BlueSky" }, // BlueSky support
};

export interface SocialMediaLinksProps {
  links: Record<string, string>; // e.g. { twitter: 'https://twitter.com/...' }
  className?: string;
  color?: string; // Theme color for icons
  username?: string; // Profile owner's username for analytics
}

/**
 * Renders a row of social media icons as links.
 * Only platforms present in the 'links' prop are shown.
 * Icons use the provided color prop if set.
 */
export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ links, className, color, username }) => {
  // Filter to only supported platforms with a non-empty URL
  const platforms = Object.entries(links).filter(
    ([key, url]) => platformMeta[key] && url
  );
  if (platforms.length === 0) return null;

  return (
    <div className={"flex flex-wrap gap-3 " + (className || "")}
      aria-label="Social media links"
    >
      {platforms.map(([key, url]) => {
        const { icon: Icon, label } = platformMeta[key];
        // Click handler to track social media clicks
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          // Fire-and-forget analytics POST (does not block navigation)
          fetch('/api/analytics/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ linkId: null, platform: key, username }),
          });
        };
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{ color: color || undefined }}
            className="hover:opacity-80 transition-colors text-2xl"
            onClick={handleClick} // Track click for analytics
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}; 