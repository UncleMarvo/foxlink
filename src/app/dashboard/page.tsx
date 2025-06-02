import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { signOut } from 'next-auth/react';
import SignOutButton from '@/components/SignOutButton';
import prisma from '@/utils/prisma';
import PremiumBanner from '@/components/PremiumBanner';
import StatBox from '@/components/StatBox';
import LinksTable from '@/components/dashboard/LinksTable';

export default async function DashboardPage() {
  // Get the current session (server-side)
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to sign-in
  if (!session) {
    redirect('/api/auth/signin');
  }

  // User info from session
  const user = session.user;
  // Fetch premium status from DB
  let isPremium = false;
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email }, select: { premium: true } });
    isPremium = !!dbUser?.premium;
  }

  // Fetch real stats
  // Total Links
  const totalLinks = await prisma.link.count({ where: { userId: user.id } });
  // Total Clicks
  const totalClicks = await prisma.analytics.count({
    where: { userId: user.id, type: 'link_click' },
  });
  // Unique Visitors (distinct IPs for profile views)
  const uniqueVisitorRecords = await prisma.analytics.findMany({
    where: { userId: user.id, type: 'profile_view' },
    distinct: 'ip',
    select: { ip: true },
  });
  const uniqueVisitors = uniqueVisitorRecords.length;
  // Click Rate
  // Calculate click rate as a percentage, capped at 100% and rounded to nearest integer
  let rawRate = uniqueVisitors > 0 ? (totalClicks / uniqueVisitors) * 100 : 0;
  rawRate = Math.min(rawRate, 100); // Cap at 100%
  const conversionRate = `${Math.round(rawRate)}%`;
  // Total Profile Views (all time)
  const totalProfileViews = await prisma.analytics.count({
    where: { userId: user.id, type: 'profile_view' },
  });

  // SVG icons
  const linkIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 10a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  const clickIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19v-7m0 0l-3 3m3-3l3 3" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2"/></svg>
  );
  const visitorIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="#555" strokeWidth="2"/><path d="M2 20c0-4 4-7 10-7s10 3 10 7" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
  );
  const conversionIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" stroke="#555" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#555" strokeWidth="2"/></svg>
  );
  const profileViewsIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="#555" strokeWidth="2"/><path d="M2 20c0-4 4-7 10-7s10 3 10 7" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
  );

  return (
    <>
      {/* Show Go Premium banner for non-premium users */}
      <PremiumBanner isPremium={isPremium} />

      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your dashboard to manage your links and analytics.
          </p>
        </div>
      </div>

      {/* Stat boxes row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <StatBox title="Total Links" value={totalLinks} icon={linkIcon} />
        <StatBox title="Total Profile Views" value={totalProfileViews} icon={profileViewsIcon} />
        <StatBox title="Total Clicks" value={totalClicks} icon={clickIcon} />
        <StatBox title="Unique Visitors" value={uniqueVisitors} icon={visitorIcon} />
        <StatBox title="Click Rate" value={conversionRate} icon={conversionIcon} />
      </div>

      {/* Links management section */}
      <LinksTable isPremium={isPremium} />
    </>
  );
} 