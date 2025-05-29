"use client";
import React, { useState } from "react";

// Read price IDs from env vars
const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!;
const YEARLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!;

export default function UpgradePage() {
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Simple toast auto-hide
  React.useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Handle Stripe checkout
  const handleCheckout = async (priceId: string, type: "monthly" | "yearly") => {
    setLoading(type);
    setToast(null);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setToast(data.error || "Failed to start checkout.");
      }
    } catch (err) {
      setToast("An unexpected error occurred.");
    }
    setLoading(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Centered upgrade panel */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2">Upgrade to Premium</h1>
        <p className="text-gray-700 text-center mb-4">
          Unlock the full power of FoxLink with Premium:
        </p>
        {/* Placeholder benefits list */}
        <ul className="list-disc list-inside text-gray-600 text-left mb-6">
          <li>Advanced analytics</li>
          <li>Custom themes</li>
          <li>Remove branding</li>
          <li>Priority support</li>
          <li>And more!</li>
        </ul>
        {/* Upgrade buttons */}
        <div className="flex gap-4 w-full justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            onClick={() => handleCheckout(MONTHLY_PRICE_ID, "monthly")}
            disabled={loading === "monthly"}
          >
            {loading === "monthly" ? "Loading..." : "Monthly"}
          </button>
          <button
            className="px-6 py-2 bg-yellow-400 text-blue-900 rounded font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
            onClick={() => handleCheckout(YEARLY_PRICE_ID, "yearly")}
            disabled={loading === "yearly"}
          >
            {loading === "yearly" ? "Loading..." : "Yearly"}
          </button>
        </div>
      </div>
      {/* Simple toast message */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
} 