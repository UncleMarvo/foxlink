"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// SVG icons for navigation links
const icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 13a2 2 0 0 1 2-2h2v4H5a2 2 0 0 1-2-2v0zm6-6V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h-6zm8 2a2 2 0 0 0-2-2h-2v8h2a2 2 0 0 0 2-2V9zm-8 2V7H5a2 2 0 0 0-2 2v2h6z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  profile: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="7" r="4" stroke="#555" strokeWidth="1.5"/><path d="M3 17a7 7 0 0 1 14 0" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3" stroke="#555" strokeWidth="1.5"/><path d="M17.5 10a7.5 7.5 0 0 0-.2-1.7l1.6-1.2a1 1 0 0 0 .2-1.4l-1.5-2.6a1 1 0 0 0-1.3-.4l-1.6.6a7.5 7.5 0 0 0-1.5-.9l-.2-1.7A1 1 0 0 0 11 2h-2a1 1 0 0 0-1 .9l-.2 1.7a7.5 7.5 0 0 0-1.5.9l-1.6-.6a1 1 0 0 0-1.3.4L1.9 7.2a1 1 0 0 0 .2 1.4l1.6 1.2a7.5 7.5 0 0 0 0 3.4l-1.6 1.2a1 1 0 0 0-.2 1.4l1.5 2.6a1 1 0 0 0 1.3.4l1.6-.6a7.5 7.5 0 0 0 1.5.9l.2 1.7A1 1 0 0 0 9 18h2a1 1 0 0 0 1-.9l.2-1.7a7.5 7.5 0 0 0 1.5-.9l1.6.6a1 1 0 0 0 1.3-.4l1.5-2.6a1 1 0 0 0-.2-1.4l-1.6-1.2c.1-.6.1-1.1.1-1.7z" stroke="#555" strokeWidth="1.5"/></svg>
  ),
};

/**
 * MainNav - Navigation bar for logged-in users
 * Shows Dashboard, Profile, Settings, and Sign Out links, each with an icon
 * Only renders if user is authenticated
 */
export default function MainNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  // Premium status state
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [portalError, setPortalError] = useState("");

  // Fetch premium status on mount (if logged in)
  useEffect(() => {
    const fetchPremium = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/profile/is-premium?email=${encodeURIComponent(session.user.email)}`);
          const data = await res.json();
          setIsPremium(!!data.premium);
        } catch {
          setIsPremium(false);
        }
      }
    };
    if (status === "authenticated") fetchPremium();
  }, [session, status]);

  // Only show nav if user is logged in
  if (status !== "authenticated") return null;

  // Handle manage subscription
  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    setPortalError("");
    try {
      const res = await fetch("/api/stripe/create-portal-session", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPortalError(data.error || "Failed to open portal.");
      }
    } catch (err) {
      setPortalError("An unexpected error occurred.");
    }
    setLoadingPortal(false);
  };

  // Navigation links
  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: icons.dashboard },
    { href: "/profile", label: "Profile", icon: icons.profile },
    { href: "/settings", label: "Settings", icon: icons.settings },
  ];

  return (
    <nav className="w-full bg-white border-b mb-6 shadow-sm">
      <ul className="flex gap-6 items-center px-6 py-3 max-w-4xl mx-auto">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition text-gray-800 font-medium ${pathname.startsWith(link.href) ? "bg-gray-100" : ""}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        {/* Manage Subscription for premium users */}
        {isPremium && (
          <li>
            <button
              onClick={handleManageSubscription}
              className="flex items-center gap-2 px-2 py-1 rounded bg-green-100 text-green-800 font-medium hover:bg-green-200 transition"
              disabled={loadingPortal}
              title="Manage your premium subscription"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3v4l3 3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {loadingPortal ? "Loading..." : "Manage Subscription"}
            </button>
            {portalError && <div className="text-red-500 text-xs mt-1">{portalError}</div>}
          </li>
        )}
        <li className="ml-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 text-red-600 font-medium transition"
            title="Sign out"
          >
            {/* Simple sign out icon */}
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true"><path d="M13 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" stroke="#e53e3e" strokeWidth="1.5"/><path d="M17 10H7m0 0l3-3m-3 3l3 3" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
} 