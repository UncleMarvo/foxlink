"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * DangerZone component
 * Provides UI for exporting user data and deleting the account.
 * Uses the app's API endpoints for these actions.
 * Styled to match the ProfileForm component.
 */
export default function DangerZone() {
  const [isLoading, setIsLoading] = useState(false); // For delete account
  const [isExporting, setIsExporting] = useState(false); // For export data
  const router = useRouter();

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    setIsLoading(true);
    try {
      // Call backend API to delete account
      const res = await fetch("/api/profile/delete-account", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Account deleted successfully");
      // Redirect to home page after deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle data export
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Call backend API to export user data
      const res = await fetch("/api/profile/export-data", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to export data");
      const data = await res.json();
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user-data-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to export data"
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="border border-red-200 rounded-lg p-4 space-y-4 mt-8 bg-red-50">
      <h3 className="text-lg font-medium text-red-600 leading-7 mb-0">
        Danger Zone
      </h3>
      <p className="text-xs text-red-500 italic mb-8">
        'Highway to the danger zone, Gonna take it right into the danger zone'
      </p>
      {/* Export Data Section */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">Export Data</h4>
          <p className="text-sm text-gray-500">
            Download a copy of all your data in JSON format.
          </p>
        </div>
        <button
          onClick={handleExportData}
          disabled={isExporting}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isExporting ? <span>Exporting...</span> : "Export Data"}
        </button>
      </div>
      {/* Divider */}
      <hr className="border-gray-200" />
      {/* Delete Account Section */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
          <p className="text-sm text-gray-500">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <button
          onClick={handleDeleteAccount}
          disabled={isLoading}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {isLoading ? <span>Deleting...</span> : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
