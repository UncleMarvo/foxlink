import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { toast } from "sonner";
import ProfileForm from "@/components/ProfileForm";
import ShareProfileLinkWrapper from "@/components/ShareProfileLinkWrapper";
import DangerZone from '@/components/DangerZone';

export default async function ProfilePage() {
  // Get the current session (server-side)
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to sign-in
  if (!session) {
    redirect("/api/auth/signin");
  }

  // User info from session
  const user = session.user;

  return (
    <>
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Profile Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your profile information and page settings.
          </p>
        </div>
      </div>

      {/* Share Profile Section */}
      {user && (
        <ShareProfileLinkWrapper username={user.username?.toString() || ""} />
      )}

      {/* Profile edit form */}
      <ProfileForm user={user} />

      {/* Danger Zone */}
      <DangerZone />
    </>
  );
}
