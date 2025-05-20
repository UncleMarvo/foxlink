"use client";

// Admin View User Page
// This page displays detailed information about a specific user, including profile and admin actions.

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
  premium: boolean;
}

export default function AdminViewUserPage() {
  // Get session info to check if user is admin
  const { data: session, status } = useSession();
  // Show loading while session is loading
  if (status === "loading") return <div>Loading...</div>;
  // Check if user is admin (case-insensitive)
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";
  if (!isAdmin) {
    // Show access denied message for non-admins
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700">You do not have permission to view this page.</p>
      </div>
    );
  }

  // Get the user ID from the route params
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  // State for user data, loading, and error
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State for action loading
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  // State for reset password feedback
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  // State for force verify feedback
  const [forceVerifyLoading, setForceVerifyLoading] = useState(false);
  const [forceVerifyError, setForceVerifyError] = useState<string | null>(null);
  const [forceVerifySuccess, setForceVerifySuccess] = useState<string | null>(
    null
  );

  // UI state for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // State for user activity log
  const [activity, setActivity] = useState<any[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);
  // Pagination state for activity log
  const [activityPage, setActivityPage] = useState(1);
  const [activityPageSize] = useState(20); // You can make this user-configurable if desired
  const [activityTotal, setActivityTotal] = useState(0);

  const router = useRouter();

  // Fetch user details from the API
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/admin/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load user");
        setLoading(false);
      });
  }, [userId]);

  // Fetch user activity log (with pagination)
  useEffect(() => {
    if (!userId) return;
    setActivityLoading(true);
    setActivityError(null);
    fetch(`/api/admin/users/${userId}/activity?page=${activityPage}&pageSize=${activityPageSize}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user activity");
        return res.json();
      })
      .then((data) => {
        setActivity(data.activity || []);
        setActivityTotal(data.total || 0);
        setActivityLoading(false);
      })
      .catch((err) => {
        setActivityError(err.message || "Failed to fetch user activity");
        setActivityLoading(false);
      });
  }, [userId, activityPage, activityPageSize]);

  // Backend integration for Deactivate/Reactivate
  const handleDeactivateReactivate = async () => {
    if (!user) return;
    setActionLoading(true);
    setActionError(null);
    const action = user.emailVerified ? "deactivate" : "reactivate";
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update user status");
      }
      // Refresh user data after action
      const data = await res.json();
      setUser(data.user);
    } catch (err: any) {
      setActionError(err.message || "Failed to update user status");
    } finally {
      setActionLoading(false);
    }
  };

  // Backend integration for Reset Password
  const handleResetPassword = async () => {
    if (!user) return;
    setResetPasswordLoading(true);
    setResetPasswordError(null);
    setResetPasswordSuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/reset-password`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send password reset email");
      }
      setResetPasswordSuccess("Password reset email sent successfully.");
    } catch (err: any) {
      setResetPasswordError(
        err.message || "Failed to send password reset email"
      );
    } finally {
      setResetPasswordLoading(false);
    }
  };

  // Backend integration for Force Email Verification
  const handleForceVerify = async () => {
    if (!user) return;
    setForceVerifyLoading(true);
    setForceVerifyError(null);
    setForceVerifySuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "forceVerify" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to verify email");
      }
      const data = await res.json();
      setUser(data.user);
      setForceVerifySuccess("User email marked as verified.");
    } catch (err: any) {
      setForceVerifyError(err.message || "Failed to verify email");
    } finally {
      setForceVerifyLoading(false);
    }
  };

  // Backend integration for Delete Account
  const handleDelete = async () => {
    if (!user) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete user");
      }
      setShowDeleteConfirm(false);
      setDeleteConfirmInput("");
      // Redirect to admin user list after successful deletion
      router.push("/admin/users");
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Render loading, error, or user details
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin: View User</h1>
      {loading && <div className="text-blue-600">Loading user details...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {user && !loading && !error && (
        <div className="bg-white rounded shadow p-6">
          {/* User Info */}
          <div className="mb-4">
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span>{" "}
            {user.emailVerified ? (
              <span className="text-green-600 font-semibold">Active</span>
            ) : (
              <span className="text-gray-400 font-semibold">Inactive</span>
            )}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Premium:</span>{" "}
            {user.premium ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-400 font-semibold">No</span>
            )}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </div>

          {/* Admin Actions */}
          <div className="mt-8 mb-4">
            <h2 className="text-lg font-semibold mb-2">Admin Actions</h2>
            {/* Deactivate/Reactivate */}
            <button
              className={`px-4 py-2 rounded mr-2 font-semibold ${user.emailVerified ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-green-500 text-white hover:bg-green-600"}`}
              onClick={handleDeactivateReactivate}
              disabled={actionLoading}
            >
              {actionLoading
                ? user.emailVerified
                  ? "Deactivating..."
                  : "Reactivating..."
                : user.emailVerified
                  ? "Deactivate Account"
                  : "Reactivate Account"}
            </button>
            {actionError && (
              <div className="text-red-600 text-sm mt-2">{actionError}</div>
            )}
            {/* Reset Password */}
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 mr-2"
              onClick={handleResetPassword}
              disabled={resetPasswordLoading}
            >
              {resetPasswordLoading
                ? "Sending..."
                : "Send Password Reset Email"}
            </button>

            {/* Force Email Verification */}
            <button
              className="px-4 py-2 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-600 mr-2"
              onClick={handleForceVerify}
              disabled={forceVerifyLoading}
            >
              {forceVerifyLoading ? "Verifying..." : "Force Email Verification"}
            </button>

            {/* Delete Account */}
            <button
              className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </button>
          </div>

          <div>
            {resetPasswordError && (
              <div className="text-red-600 text-sm mt-2">
                {resetPasswordError}
              </div>
            )}
            {resetPasswordSuccess && (
              <div className="text-green-600 text-sm mt-2">
                {resetPasswordSuccess}
              </div>
            )}
            {forceVerifyError && (
              <div className="text-red-600 text-sm mt-2">
                {forceVerifyError}
              </div>
            )}
            {forceVerifySuccess && (
              <div className="text-green-600 text-sm mt-2">
                {forceVerifySuccess}
              </div>
            )}
          </div>

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow p-6 max-w-sm w-full">
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  Confirm Delete
                </h3>
                <p className="mb-4 text-gray-700">
                  Are you sure you want to permanently delete this user and all
                  their data? This cannot be undone.
                </p>
                <p className="mb-2 text-sm text-gray-700">
                  Type <span className="font-bold">Confirm Delete</span> to confirm account deletion.
                </p>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full mb-4"
                  value={deleteConfirmInput}
                  onChange={e => setDeleteConfirmInput(e.target.value)}
                  placeholder="Enter phrase to confirm"
                  autoFocus
                />
                {deleteError && (
                  <div className="text-red-600 text-sm mb-2">{deleteError}</div>
                )}
                <div className="flex gap-4 justify-end">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmInput("");
                    }}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    onClick={handleDelete}
                    disabled={deleteConfirmInput !== "Confirm Delete" || deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Activity / Audit Log */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">User Activity / Audit Log</h3>
            {activityLoading ? (
              <div className="text-gray-500">Loading activity...</div>
            ) : activityError ? (
              <div className="text-red-500">{activityError}</div>
            ) : (
              <>
                <table className="min-w-full border border-gray-200 rounded-lg mb-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Referrer</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Platform</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Country</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Link ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-6 text-gray-400">No activity found.</td></tr>
                    ) : (
                      activity.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-200">
                          <td className="px-4 py-2">{entry.type}</td>
                          <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                          <td className="px-4 py-2">{entry.referrer || '-'}</td>
                          <td className="px-4 py-2">{entry.platform || '-'}</td>
                          <td className="px-4 py-2">{entry.country || '-'}</td>
                          <td className="px-4 py-2">{entry.linkId || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Pagination controls for activity log */}
                {activityTotal > activityPageSize && (
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="px-3 py-1 rounded border text-sm"
                      disabled={activityPage === 1}
                      onClick={() => setActivityPage(activityPage - 1)}
                    >
                      Prev
                    </button>
                    <span className="px-2 py-1 text-sm">
                      Page {activityPage} of {Math.ceil(activityTotal / activityPageSize)}
                    </span>
                    <button
                      className="px-3 py-1 rounded border text-sm"
                      disabled={activityPage === Math.ceil(activityTotal / activityPageSize)}
                      onClick={() => setActivityPage(activityPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
