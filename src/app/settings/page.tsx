"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

/**
 * SettingsPage - Account settings for the user
 * Includes a Change Password form
 */
export default function SettingsPage() {
  // Form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle account deletion
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Download My Data (GDPR)
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  // Handle form submission
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/profile/delete-account", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        setDeleteError(data.error);
      } else {
        // Sign out and redirect to sign-in
        await signOut({ callbackUrl: "/api/auth/signin" });
      }
    } catch (err) {
      setDeleteError("An unexpected error occurred.");
    }
    setDeleteLoading(false);
  };

  const handleDownloadData = async () => {
    setDownloadError("");
    setDownloadLoading(true);
    try {
      const res = await fetch("/api/profile/export-data");
      if (!res.ok) {
        const data = await res.json();
        setDownloadError(data.error || "Failed to download data.");
        setDownloadLoading(false);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "linkinbio2_userdata.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError("An unexpected error occurred.");
    }
    setDownloadLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Settings</h1>
        {/* Change Password Form */}
        <form className="space-y-4" onSubmit={handleChangePassword}>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
      {/* Delete Account Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 mt-8">
        <h2 className="text-xl font-bold text-red-600 mb-2">Delete Account</h2>
        <p className="text-sm text-gray-700 mb-4">
          <strong>Warning:</strong> This action is <span className="text-red-600 font-semibold">permanent</span> and will delete all your data. This cannot be undone.
        </p>
        <button
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition mb-2"
          onClick={() => setShowConfirm(true)}
          disabled={deleteLoading}
        >
          Delete Account
        </button>
        {deleteError && <div className="text-red-500 text-sm mb-2">{deleteError}</div>}
        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-red-600 mb-2">Are you sure?</h3>
              <p className="mb-4 text-gray-700">This will permanently delete your account and all data. This cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Download My Data Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 mt-8">
        <h2 className="text-xl font-bold mb-2">Download My Data</h2>
        <p className="text-sm text-gray-700 mb-4">
          You can download all the information this application holds about you as a JSON file. This helps you exercise your GDPR rights.
        </p>
        <button
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition mb-2"
          onClick={handleDownloadData}
          disabled={downloadLoading}
        >
          {downloadLoading ? "Preparing download..." : "Download My Data"}
        </button>
        {downloadError && <div className="text-red-500 text-sm mb-2">{downloadError}</div>}
      </div>
    </div>
  );
} 