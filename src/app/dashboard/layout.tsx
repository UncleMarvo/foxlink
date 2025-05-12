import React from 'react';
import MainNav from '@/components/MainNav';

/**
 * Dashboard layout: includes navigation for all /dashboard pages
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Main navigation for logged-in users */}
      <MainNav />
      {children}
    </div>
  );
} 