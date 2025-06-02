import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import prisma from '@/utils/prisma';
import AddLinkForm from '@/components/AddLinkForm';
import LinkItem from '@/components/LinkItem';
import EditLinkForm from '@/components/EditLinkForm';
import LinksClient from './LinksClient';

export default async function LinksPage() {
  // Get the current session (server-side)
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect('/api/auth/signin');
  }

  // Fetch the user's links from the database
  const links = await prisma.link.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { order: 'asc' },
  });

  // Move the main content into a client wrapper for reactivity
  return <LinksClient initialLinks={links} />;
} 