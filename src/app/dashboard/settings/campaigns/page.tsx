"use client";
import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  description: string;
  type: string;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  optIn: boolean;
};

export default function UserCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string, optIn: boolean) => {
    await fetch(`/api/campaigns/${id}/${optIn ? "opt-in" : "opt-out"}`, {
      method: "POST",
    });
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, optIn } : c))
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Campaign Participation</h1>
      <p className="mb-6 text-gray-600">
        Here you can opt in or out of special campaigns, features, or surveys. Participation is always your choice!
      </p>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No active campaigns at the moment.</p>
      ) : (
        <div className="space-y-6">
          {campaigns.map((c) => (
            <div key={c.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-gray-700 mb-2">{c.description}</p>
                <span className="text-xs text-gray-500">Type: {c.type}</span>
              </div>
              <button
                className={`mt-4 md:mt-0 px-4 py-2 rounded ${c.optIn ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                onClick={() => handleToggle(c.id, !c.optIn)}
              >
                {c.optIn ? "Opt Out" : "Opt In"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 