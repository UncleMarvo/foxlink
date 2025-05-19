"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: string | null;
  premium: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State for cleanup feedback
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupResult, setCleanupResult] = useState<string | null>(null);

  // Fetch users from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/admin/users?search=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load users.');
        setLoading(false);
      });
  }, [search, page, pageSize]);

  // Handler for cleanup button
  const handleCleanup = async () => {
    setCleanupLoading(true);
    setCleanupResult(null);
    try {
      const res = await fetch('/api/admin/cleanup-activity', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setCleanupResult(`Deleted ${data.deletedCount} entries older than ${new Date(data.cutoffDate).toLocaleDateString()}.`);
      } else {
        setCleanupResult(data.error || 'Cleanup failed.');
      }
    } catch (err) {
      setCleanupResult('Cleanup failed.');
    }
    setCleanupLoading(false);
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="border rounded px-3 py-2 w-full sm:w-64"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        {/* Cleanup Old Activity Logs button */}
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          onClick={handleCleanup}
          disabled={cleanupLoading}
        >
          {cleanupLoading ? 'Cleaning...' : 'Cleanup Old Activity Logs'}
        </button>
      </div>
      {/* Show cleanup result message */}
      {cleanupResult && (
        <div className="mb-4 text-sm text-blue-700 bg-blue-100 rounded p-2">{cleanupResult}</div>
      )}
      {/* Loading/Error States */}
      {loading && <div className="text-blue-600 mb-4">Loading users...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {/* User table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 font-medium">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.emailVerified ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-gray-400 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href={`/admin/users/${user.id}`} className="text-blue-700 hover:underline">View</Link>
                  {/* Future: Deactivate/Reactivate, Make/Revoke Admin */}
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr><td colSpan={5} className="text-center py-6 text-gray-400">No users found.</td></tr>
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