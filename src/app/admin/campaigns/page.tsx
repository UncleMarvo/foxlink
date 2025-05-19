"use client";

// Admin Campaigns Page
// This page will allow admins to create, view, and manage marketing or engagement campaigns.

import React from "react";
import { useSession } from "next-auth/react";

export default function AdminCampaignsPage() {
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin: Campaigns</h1>
      <p>This page will allow administrators to manage platform campaigns.</p>
    </div>
  );
} 