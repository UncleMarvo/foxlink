import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { signOut } from 'next-auth/react';
import SignOutButton from '@/components/SignOutButton';
import prisma from '@/utils/prisma';
import PremiumBanner from '@/components/PremiumBanner';

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        {/* Show Go Premium banner for non-premium users */}
        <PremiumBanner isPremium={isPremium} />
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <div className="text-center">
          <p className="text-lg">Welcome, <span className="font-semibold">{user?.name || user?.email}</span>!</p>
          <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
} 