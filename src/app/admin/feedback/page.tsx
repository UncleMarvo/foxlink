"use client";

// Admin Feedback Page
// Shows a paginated, searchable table of user feedback for admins

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface FeedbackEntry {
  id: string;
  message: string;
  response: string | null;
  createdAt: string;
  status: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

export default function AdminFeedbackPage() {
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

  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch feedback from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/admin/feedback?search=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load feedback.");
        setLoading(false);
      });
  }, [search, page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Feedback</h1>
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search feedback by message, name, or email..."
          className="border rounded px-3 py-2 w-full sm:w-64"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      {/* Loading/Error States */}
      {loading && <div className="text-blue-600 mb-4">Loading feedback...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {/* Feedback table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb) => (
              <tr key={fb.id} className="border-t">
                <td className="px-4 py-2 font-medium">{fb.user?.name || "-"}</td>
                <td className="px-4 py-2">{fb.user?.email || "-"}</td>
                <td className="px-4 py-2 max-w-xs truncate" title={fb.message}>{fb.message}</td>
                <td className="px-4 py-2">{new Date(fb.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">
                  {fb.status === "resolved" ? (
                    <span className="text-green-600 font-semibold">Resolved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Open</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/feedback/${fb.id}`}
                    className="text-blue-700 hover:underline font-semibold"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {feedback.length === 0 && !loading && (
              <tr><td colSpan={5} className="text-center py-6 text-gray-400">No feedback found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
} 