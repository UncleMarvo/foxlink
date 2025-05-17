"use client";

import React from "react";
import type { ThemeColors } from "@/app/context/ThemeContext";

/**
 * PublicLinksList - Client component to render public profile links with analytics tracking
 * Props: links (array of { id, title, url }), themeColors (optional, for theming)
 */
export default function PublicLinksList({
  links,
  themeColors,
}: {
  links: { id: string; title: string; url: string }[];
  themeColors?: ThemeColors;
}) {
  if (!links || links.length === 0) {
    return <p className="text-gray-400 text-center">No links yet.</p>;
  }
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={
            themeColors
              ? {
                  background: themeColors.surface,
                  border: `1px solid ${themeColors.border}`,
                  color: themeColors.text.primary,
                  boxShadow: `0 2px 8px 0 ${themeColors.shadow}`,
                  transition: "background 0.2s, box-shadow 0.2s, color 0.2s",
                }
              : undefined
          }
          className={
            "block w-full py-3 px-4 rounded-lg shadow text-center font-medium " +
            (themeColors
              ? "hover:opacity-90"
              : "bg-white hover:bg-blue-50 text-blue-700")
          }
          onClick={async (e) => {
            // Fire-and-forget analytics POST request
            try {
              fetch("/api/analytics/click", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  linkId: link.id,
                  referrer: window.location.href,
                  country: null, // Could be set via geo-IP in the future
                  abTestGroup: null, // Could be set for experiments
                }),
              });
            } catch (err) {
              // Silently ignore analytics errors
            }
            // Navigation will proceed as normal
          }}
        >
          {link.title}
        </a>
      ))}
    </div>
  );
} 