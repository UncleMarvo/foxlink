import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  // Example metrics (replace with real data fetching later)
  const metrics = [
    { label: 'Total Users', value: 0, link: '/admin/users' },
    { label: 'Active Campaigns', value: 0, link: '/admin/campaigns' },
    { label: 'Feedback', value: 0, link: '/admin/feedback' },
    { label: 'Analytics Events', value: 0, link: '/admin/analytics' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <Link key={m.label} href={m.link} className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border border-gray-200">
            <div className="text-2xl font-bold text-blue-700 mb-2">{m.value}</div>
            <div className="text-gray-700">{m.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><Link href="/admin/users" className="text-blue-700 hover:underline">Manage Users</Link></li>
            <li><Link href="/admin/campaigns" className="text-blue-700 hover:underline">Manage Campaigns</Link></li>
            <li><Link href="/admin/feedback" className="text-blue-700 hover:underline">View Feedback</Link></li>
            <li><Link href="/admin/settings" className="text-blue-700 hover:underline">System Settings</Link></li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Admin Documentation</h2>
          <p className="text-gray-600 mb-2">Find help and documentation for all admin features.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Each section is modular and easy to extend.</li>
            <li>Use the sidebar to navigate between features.</li>
            <li>All actions are logged for audit purposes.</li>
            <li>Contact support for more help.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 