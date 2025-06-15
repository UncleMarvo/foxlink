"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";

// SVG icons for navigation links
const icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="13" width="4" height="8" rx="1" fill="#555" />
      <rect x="9" y="9" width="4" height="12" rx="1" fill="#555" />
      <rect x="15" y="5" width="4" height="16" rx="1" fill="#555" />
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17V9m4 8V5m4 12v-6m4 6v-2m4 2V3" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  profile: (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <circle cx="10" cy="7" r="4" stroke="#555" strokeWidth="1.5" />
      <path
        d="M3 17a7 7 0 0 1 14 0"
        stroke="#555"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="#555" strokeWidth="2" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/**
 * MainNav - Vertical sidebar navigation for logged-in users
 * Shows Dashboard, Profile, Settings, and Sign Out links, each with an icon
 * Logo at the top, username under logo, sign out at bottom
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
          const res = await fetch(
            `/api/profile/is-premium?email=${encodeURIComponent(
              session.user.email
            )}`
          );
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
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });
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
    { href: "/dashboard/analytics", label: "Analytics", icon: icons.analytics },
    { href: "/dashboard/profile", label: "Profile", icon: icons.profile },
    { href: "/dashboard/settings", label: "Settings", icon: icons.settings },
    // Feedback link for all users
    { href: "/dashboard/feedback", label: "Feedback", icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#555" strokeWidth="1.5" strokeLinejoin="round" fill="#fff"/>
      </svg>
    ) },
  ];

  return (
    <nav 
      className="flex flex-col h-full min-h-screen"
      aria-label="Main navigation"
    >
      {/* Logo and user info */}
      <div className="p-4 border-b" role="banner">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition" aria-label="Go to homepage">
          <img
            src="/logo.png"
            alt="FoxLink Logo"
            className="h-10 w-10 object-contain rounded-md"
            style={{ background: 'white' }}
          />
          <span className="text-md font-semibold">FoxLink</span>
          <span className="text-xs text-muted-foreground">(beta)</span>
        </Link>

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center mt-10 mb-2">
          <Avatar
            src={session?.user?.image}
            alt={`${session?.user?.name || 'User'}'s avatar`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Username */}
        <div className="text-sm font-semibold text-gray-700 mt-2">
          {session?.user?.name || session?.user?.email || "User"}
        </div>

        {/* Email */}
        <div className="text-sm font-semibold text-gray-700 mt-2">
          {session?.user?.email || session?.user?.email || "Email"}
        </div>
      </div>

      {/* Navigation links */}
      <ul className="flex-1 p-4 space-y-2" role="navigation" aria-label="Main menu">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 transition text-gray-800 font-medium ${
                pathname.startsWith(link.href) ? "bg-gray-100" : ""
              }`}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        {/* Admin link: Only visible to users with role 'ADMIN' or 'SUPER_ADMIN' */}
        {session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN' ? (
          <li>
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 transition text-indigo-800 font-semibold ${
                pathname.startsWith('/admin') ? 'bg-indigo-100' : ''
              }`}
              aria-current={pathname.startsWith('/admin') ? "page" : undefined}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round" fill="#eef2ff"/>
              </svg>
              <span>Admin</span>
            </Link>
          </li>
        ) : null}
        {/* Manage Subscription for premium users */}
        {isPremium && (
          <li>
            <button
              onClick={handleManageSubscription}
              className="flex items-center gap-2 px-4 py-2 rounded bg-green-100 text-green-800 font-medium hover:bg-green-200 transition"
              disabled={loadingPortal}
              aria-label="Manage your premium subscription"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3v4l3 3"
                  stroke="#16a34a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {loadingPortal ? "Loading..." : "Manage Subscription"}
            </button>
            {portalError && (
              <div className="text-red-500 text-xs mt-1" role="alert">{portalError}</div>
            )}
          </li>
        )}
        {/* Divider */}
        <li className="border-t border-gray-200 my-2"></li>
        {/* Sign Out link */}
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-red-100 text-red-600 font-medium transition"
            aria-label="Sign out of your account"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                d="M13 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"
                stroke="#e53e3e"
                strokeWidth="1.5"
              />
              <path
                d="M17 10H7m0 0l3-3m-3 3l3 3"
                stroke="#e53e3e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
