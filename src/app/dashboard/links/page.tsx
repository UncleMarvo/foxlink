import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import prisma from '@/utils/prisma';
import AddLinkForm from '@/components/AddLinkForm';
import LinkItem from '@/components/LinkItem';
import EditLinkForm from '@/components/EditLinkForm';
import { useState } from 'react';

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

// Client component for reactivity
function LinksClient({ initialLinks }: { initialLinks: any[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [editing, setEditing] = useState<any | null>(null);

  // Refresh links after any action
  const refreshLinks = async () => {
    const res = await fetch('/api/links');
    const data = await res.json();
    setLinks(data.links);
  };

  // Edit handler
  const handleEdit = (link: any) => setEditing(link);
  // Delete handler
  const handleDelete = async (id: string) => {
    await fetch(`/api/links/${id}`, { method: 'DELETE' });
    refreshLinks();
  };
  // Reorder handler
  const handleMove = async (id: string, direction: 'up' | 'down') => {
    const idx = links.findIndex(l => l.id === id);
    if (idx < 0) return;
    const newLinks = [...links];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= links.length) return;
    [newLinks[idx], newLinks[swapIdx]] = [newLinks[swapIdx], newLinks[idx]];
    setLinks(newLinks);
    await fetch('/api/links/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: newLinks.map(l => l.id) }),
    });
    refreshLinks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Manage Your Links</h1>
        {/* List of links */}
        <ul className="space-y-4">
          {links.map((link, idx) => (
            <LinkItem
              key={link.id}
              link={link}
              index={idx}
              total={links.length}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ))}
        </ul>
        {/* Edit link modal/inline form */}
        {editing && (
          <EditLinkForm link={editing} onClose={() => { setEditing(null); refreshLinks(); }} />
        )}
        {/* Add new link form */}
        <div className="mt-8">
          <AddLinkForm onLinkAdded={refreshLinks} />
        </div>
      </div>
    </div>
  );
} 