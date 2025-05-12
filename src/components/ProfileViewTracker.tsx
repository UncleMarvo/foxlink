"use client";
import { useEffect } from 'react';

/**
 * ProfileViewTracker - Client component to track profile page views
 * Fires a POST to /api/analytics/view on mount
 */
export default function ProfileViewTracker({ userId }: { userId: string }) {
  useEffect(() => {
    // Fire-and-forget analytics POST request for profile view
    try {
      fetch('/api/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          referrer: window?.document?.referrer || null,
          country: null, // Could be set via geo-IP in the future
        }),
      });
    } catch (err) {
      // Silently ignore analytics errors
    }
  }, [userId]);
  return null;
} 