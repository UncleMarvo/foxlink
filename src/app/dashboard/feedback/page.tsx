"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

/**
 * Feedback Submission Page
 * Allows logged-in users to submit feedback (message only).
 * Shows a confirmation or error after submission.
 */
export default function FeedbackPage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle feedback form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Thank you for your feedback!");
        setMessage("");
      } else {
        setError(data.error || "Failed to submit feedback.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };

  // Only allow logged-in users to submit feedback
  if (status !== "authenticated") {
    return <div className="p-8">You must be logged in to submit feedback.</div>;
  }

  return (
    <>
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Profile Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your profile information and page settings.
          </p>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="message" className="font-medium">
            Your Feedback
          </label>
          <textarea
            id="message"
            className="border rounded p-2 min-h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={1000}
            placeholder="Let us know your thoughts, suggestions, or issues..."
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading || !message.trim()}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {success && <div className="text-green-600">{success}</div>}
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </>
  );
}
