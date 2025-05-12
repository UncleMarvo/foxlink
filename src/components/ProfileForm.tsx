"use client";
import { useState, useRef } from "react";

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.image || "/avatars/default.png");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar file selection and preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handle profile update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatar) formData.append("avatar", avatar);
    const res = await fetch("/api/profile/update", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess("Profile updated!");
      // Optionally refresh the page or session
    }
  };

  return (
    <form className="space-y-4 mt-6" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex flex-col items-center">
        <img
          src={avatarPreview}
          alt="Avatar preview"
          className="w-20 h-20 rounded-full object-cover border mb-2"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAvatarChange}
        />
        <button
          type="button"
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Avatar
        </button>
      </div>
      {/* Username (read-only) */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={user?.username || ""}
          readOnly
          disabled
          className="mt-1 block w-full rounded border-gray-300 bg-gray-100 text-gray-500 shadow-sm cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">Your username is used for your public profile link and cannot be changed.</p>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
} 