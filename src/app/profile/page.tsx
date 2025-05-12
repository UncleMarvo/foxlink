import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ProfileForm from '@/components/ProfileForm';

export default async function ProfilePage() {
  // Get the current session (server-side)
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to sign-in
  if (!session) {
    redirect('/api/auth/signin');
  }

  // User info from session
  const user = session.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Your Profile</h1>
        <div className="flex flex-col items-center space-y-2">
          <img
            src={user?.image || '/avatars/default.png'}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <p className="text-lg font-semibold">{user?.name || user?.email}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        {/* Profile edit form */}
        <ProfileForm user={user} />
      </div>
    </div>
  );
} 