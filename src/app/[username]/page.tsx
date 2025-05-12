import React from 'react';
import prisma from '@/utils/prisma';
import Image from 'next/image';
import ProfileViewTracker from '@/components/ProfileViewTracker';
import PublicLinksList from '@/components/PublicLinksList';

// Type for the page params
interface ProfilePageProps {
  params: { username: string };
}

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
      links: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          url: true,
        },
      },
    },
  });
  return user;
}

// The public profile page component
const ProfilePage = async ({ params }: ProfilePageProps) => {
  const awaitedParams = await params;
  const { username } = awaitedParams;
  const user = await getUserAndLinks(username);

  if (!user) {
    // User not found
    return <div className="flex flex-col items-center justify-center min-h-screen text-center"><h1 className="text-2xl font-bold">User not found</h1></div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8 px-4">
      {/* Track profile page view */}
      <ProfileViewTracker userId={user.id} />
      {/* Profile info */}
      <div className="flex flex-col items-center mb-8">
        {/* Avatar: 100x100px, circular */}
        {user.image && (
          <Image
            src={user.image}
            alt={user.name || user.username || user.email || "User avatar"}
            width={100}
            height={100}
            className="rounded-full mb-2"
          />
        )}
        {/* Username or email under avatar */}
        <div className="text-lg font-semibold text-gray-700">
          {user.username || user.email}
        </div>
        {/* Name and bio */}
        <h1 className="text-2xl font-bold">{user.name || user.username || user.email}</h1>
        {user.bio && <p className="text-gray-600 mt-2 max-w-md text-center">{user.bio}</p>}
      </div>
      {/* Links (client component for analytics tracking) */}
      <PublicLinksList links={user.links} />
    </div>
  );
};

export default ProfilePage; 