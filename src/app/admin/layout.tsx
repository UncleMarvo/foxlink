import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:bg-gray-800 rounded px-3 py-2">Dashboard</Link>
          <Link href="/admin/users" className="hover:bg-gray-800 rounded px-3 py-2">Users</Link>
          <Link href="/admin/analytics" className="hover:bg-gray-800 rounded px-3 py-2">Analytics</Link>
          <Link href="/admin/feedback" className="hover:bg-gray-800 rounded px-3 py-2">Feedback</Link>
          <Link href="/admin/campaigns" className="hover:bg-gray-800 rounded px-3 py-2">Campaigns</Link>
          <Link href="/admin/settings" className="hover:bg-gray-800 rounded px-3 py-2">Settings</Link>
          {/* Link to return to the main site dashboard for admins */}
          <Link href="/dashboard" className="hover:bg-gray-800 rounded px-3 py-2">Main Site</Link>
        </nav>
        <div className="mt-auto pt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} Your App</div>
      </aside>
      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
} 