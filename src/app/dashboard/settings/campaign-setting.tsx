"use client";
import { useEffect, useState } from "react";
import {
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/Card";

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

export default function CampaignSettingPage() {
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
    <div className="p-4">
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
        <CardDescription>
          Manage participation in campaigns by opting in or out.
        </CardDescription>
      </CardHeader>

      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No active campaigns at the moment.</p>
      ) : (
        <div>
          {campaigns.map((c) => (
            <div key={c.id} className="border rounded p-2 mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-gray-700 mb-1">{c.description}</p>
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