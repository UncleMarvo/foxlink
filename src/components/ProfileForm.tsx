"use client";
import { useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(
    user?.image || "/avatars/default.png"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();

  // Handle avatar file selection and upload to Supabase
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    // Client-side validation: only allow JPG/PNG and max 5MB
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG and PNG files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be 5MB or less.');
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);
      const res = await fetch("/api/profile/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAvatarUrl(data.publicUrl);
      setSuccess("Avatar uploaded!");
      toast.success("Avatar uploaded!");
    } catch (err: any) {
      setError("Failed to upload avatar");
      toast.error("Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Send JSON instead of FormData
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, image: avatarUrl }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setError(data.error);
      toast.error(data.error);
    } else {
      setSuccess("Profile updated!");
      toast.success("Profile updated!");
      // Optionally refresh the page or session
    }
  };

  // Handle change picture click
  const handleChangePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form
      className="space-y-4 mt-6"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {/* Avatar Section */}
      <div className="flex items-center space-x-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${user.displayName || user.username}'s avatar`}
              fill
              sizes="(max-width: 768px) 96px, 96px"
              className="object-cover"
            />
          ) : (
            <UserIcon className="h-24 w-24 text-gray-400" />
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            onClick={handleChangePictureClick}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change picture
          </button>
          <p className="mt-1 text-sm text-gray-500">
            JPG, PNG or GIF. Max size 5MB.
          </p>
        </div>
      </div>

      {/* Username (read-only) */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={user?.username || ""}
          readOnly
          disabled
          className="px-4 py-2 mt-1 block w-full rounded border border-gray-300 bg-gray-100 text-gray-500 shadow-sm cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          Your username is used for your public profile link and cannot be
          changed.
        </p>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="px-4 py-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          className="px-4 py-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-end">
        {error && <div className="text-red-500 text-sm mb-2 w-full text-right">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2 w-full text-right">{success}</div>}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
