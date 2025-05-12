import React from 'react';

/**
 * Standalone layout for public profile pages (/username)
 * Does NOT include main navigation or app chrome
 */
export default function PublicProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {children}
    </div>
  );
} 