import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import AnalyticsDashboardClient from './AnalyticsDashboardClient';
import PremiumBanner from '@/components/PremiumBanner';

// Server component for the analytics dashboard (hybrid approach)
const AnalyticsDashboard = async () => {
  // Protect the page: only show for logged-in users
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold">Please sign in to view your analytics.</h1>
      </div>
    );
  }

  // Calculate default date range: last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 29); // 30 days including today
  // Format as YYYY-MM-DD for client
  const formatDate = (d: Date) => d.toISOString().slice(0, 10);
  const initialStartDate = formatDate(startDate);
  const initialEndDate = formatDate(endDate);

  // Fetch premium status (as before)
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { premium: true } });
  const isPremium = !!user?.premium;

  // Fetch analytics summary for the default date range from the API route
  let initialData: { profileViews: number; perLinkClicks: any[]; error: string | null; [key: string]: any } = { profileViews: 0, perLinkClicks: [], error: null };
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const summaryRes = await fetch(
      `${baseUrl}/api/analytics/summary?start=${initialStartDate}&end=${initialEndDate}`
    );
    if (summaryRes.ok) {
      initialData = await summaryRes.json();
    } else {
      initialData.error = 'Failed to fetch analytics summary.';
    }
  } catch (err) {
    initialData.error = 'Failed to fetch analytics summary.';
  }

  // --- Compute stats for StatBox panels (like dashboard) ---
  // Total Links
  const totalLinks = await prisma.link.count({ where: { userId: session.user.id } });
  // Total Clicks (all time)
  const totalClicks = await prisma.analytics.count({ where: { userId: session.user.id, type: 'link_click' } });
  // Unique Visitors (distinct IPs for profile views, all time)
  const uniqueVisitorRecords = await prisma.analytics.findMany({
    where: { userId: session.user.id, type: 'profile_view' },
    distinct: 'ip',
    select: { ip: true },
  });
  const uniqueVisitors = uniqueVisitorRecords.length;
  // Click Rate
  let rawRate = uniqueVisitors > 0 ? (totalClicks / uniqueVisitors) * 100 : 0;
  rawRate = Math.min(rawRate, 100);
  const conversionRate = `${Math.round(rawRate)}%`;

  return (
    <>
      {/* Show Go Premium banner for non-premium users */}
      <PremiumBanner isPremium={isPremium} />
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            See how your links are performing.
          </p>
        </div>
      </div>
      
      {/* Hybrid: Pass initial data and date range to client component */}
      <AnalyticsDashboardClient
        initialData={initialData}
        initialStartDate={initialStartDate}
        initialEndDate={initialEndDate}
        isPremium={isPremium}
        // Pass stat box values
        totalLinks={totalLinks}
        totalClicks={totalClicks}
        uniqueVisitors={uniqueVisitors}
        conversionRate={conversionRate}
      />
    </>
  );
};

export default AnalyticsDashboard; 