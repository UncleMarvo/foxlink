"use client";
import { useState } from "react";

// You may want to pass these as props or use env vars in a real app
const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!;
const YEARLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!;

export default function PremiumBanner({ isPremium }: { isPremium: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isPremium) return null;

  // Handle checkout
  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    setError("");
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
        setError(data.error || "Failed to start checkout.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg mb-6 flex flex-col items-center shadow">
      <div className="text-lg font-bold mb-1">Upgrade to Premium</div>
      <div className="text-sm mb-3">Unlock advanced analytics and features. Cancel anytime.</div>
      <div className="flex gap-4 mb-2">
        <button
          className="px-4 py-2 bg-white text-blue-700 rounded font-semibold hover:bg-blue-100 transition"
          onClick={() => handleCheckout(MONTHLY_PRICE_ID)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Go Premium (Monthly)"}
        </button>
        <button
          className="px-4 py-2 bg-yellow-400 text-blue-900 rounded font-semibold hover:bg-yellow-300 transition"
          onClick={() => handleCheckout(YEARLY_PRICE_ID)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Go Premium (Yearly) - Save 20%"}
        </button>
      </div>
      {error && <div className="text-red-200 text-sm mt-1">{error}</div>}
    </div>
  );
} 