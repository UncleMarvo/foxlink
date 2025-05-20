"use client";

// Admin Feedback Details Page
// Shows the full feedback message and allows admin to respond and mark as resolved

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface FeedbackDetails {
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

export default function AdminFeedbackDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const feedbackId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [feedback, setFeedback] = useState<FeedbackDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [response, setResponse] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

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

  // Fetch feedback details
  useEffect(() => {
    if (!feedbackId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/admin/feedback/${feedbackId}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback);
        setResponse(data.feedback?.response || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load feedback details.");
        setLoading(false);
      });
  }, [feedbackId]);

  // Handler for submitting response
  const handleSubmitResponse = async () => {
    if (!feedbackId || !response.trim()) return;
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update feedback");
      }
      const data = await res.json();
      setFeedback(data.feedback);
      setActionSuccess("Response submitted and feedback marked as resolved.");
    } catch (err: any) {
      setActionError(err.message || "Failed to update feedback");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feedback Details</h1>
      {loading && <div className="text-blue-600">Loading feedback...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {feedback && !loading && !error && (
        <div className="bg-white rounded shadow p-6">
          <div className="mb-4">
            <span className="font-semibold">User:</span> {feedback.user?.name || "-"} ({feedback.user?.email || "-"})
          </div>
          <div className="mb-4">
            <span className="font-semibold">Date:</span> {new Date(feedback.createdAt).toLocaleString()}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span> {feedback.status === "resolved" ? (
              <span className="text-green-600 font-semibold">Resolved</span>
            ) : (
              <span className="text-yellow-600 font-semibold">Open</span>
            )}
          </div>
          <div className="mb-6">
            <span className="font-semibold">Message:</span>
            <div className="bg-gray-50 border rounded p-4 mt-2 text-gray-800 whitespace-pre-line">
              {feedback.message}
            </div>
          </div>
          {/* Admin Response */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Admin Response</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              value={response}
              onChange={e => setResponse(e.target.value)}
              disabled={actionLoading || feedback?.status === "resolved"}
              placeholder="Write your response here..."
            />
          </div>
          <div className="flex gap-4 items-center">
            <button
              className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
              onClick={handleSubmitResponse}
              disabled={actionLoading || !response.trim() || feedback?.status === "resolved"}
            >
              {actionLoading ? "Submitting..." : "Submit Response & Mark as Resolved"}
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => router.push("/admin/feedback")}
              disabled={actionLoading}
            >
              Back to Feedback List
            </button>
          </div>
          {actionError && <div className="text-red-600 text-sm mt-2">{actionError}</div>}
          {actionSuccess && <div className="text-green-600 text-sm mt-2">{actionSuccess}</div>}
        </div>
      )}
    </div>
  );
} 