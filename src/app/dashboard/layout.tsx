import React from 'react';
import ClientMainNav from '@/components/ClientMainNav';

/**
 * Dashboard layout: includes navigation for all /dashboard pages
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r min-h-screen">
        <ClientMainNav />
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 