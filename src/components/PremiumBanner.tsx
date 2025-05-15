"use client";
import { useState } from "react";
import Link from "next/link";

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

  // Banner layout: text left, button right
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg mb-6 flex items-center justify-between shadow">
      {/* Banner text on the left */}
      <div>
        <div className="text-lg font-bold mb-1">Upgrade to Premium</div>
        <div className="text-sm">Unlock advanced analytics and features. Cancel anytime.</div>
      </div>
      {/* Upgrade button on the right */}
      <Link href="/dashboard/upgrade">
        <button className="px-6 py-2 bg-white text-blue-700 rounded font-semibold hover:bg-blue-100 transition shadow">
          Upgrade to Premium
        </button>
      </Link>
    </div>
  );
} 