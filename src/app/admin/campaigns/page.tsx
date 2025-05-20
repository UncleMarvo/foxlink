"use client";

// Admin Campaigns Page
// This page will allow admins to create, view, and manage marketing or engagement campaigns.

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
};

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Campaign>>({});
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);
  const [userList, setUserList] = useState<Record<string, any[]>>({});
  const [userLoading, setUserLoading] = useState<string | null>(null);

  const { data: session, status } = useSession();

  // Fetch campaigns
  useEffect(() => {
    fetch("/api/admin/campaigns")
      .then((res) => res.json())
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create campaign
  const handleCreate = async () => {
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({});
      setLoading(true);
      fetch("/api/admin/campaigns")
        .then((res) => res.json())
        .then(setCampaigns)
        .finally(() => setLoading(false));
    }
  };

  // Delete campaign
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // Fetch users for a campaign
  const handleViewUsers = async (campaignId: string) => {
    if (expandedCampaignId === campaignId) {
      setExpandedCampaignId(null);
      return;
    }
    setUserLoading(campaignId);
    setExpandedCampaignId(campaignId);
    const res = await fetch(`/api/admin/campaigns/${campaignId}/users`);
    const users = await res.json();
    setUserList((prev) => ({ ...prev, [campaignId]: users }));
    setUserLoading(null);
  };

  // Conditional rendering after all hooks
  if (status === "loading") return <div>Loading...</div>;
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";
  if (!isAdmin) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowForm((v) => !v)}
      >
        {showForm ? "Cancel" : "Create Campaign"}
      </button>
      {showForm && (
        <div className="mb-6 border p-4 rounded">
          <input
            className="block mb-2 w-full border p-2 rounded"
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
          />
          <textarea
            className="block mb-2 w-full border p-2 rounded"
            name="description"
            placeholder="Description"
            value={form.description || ""}
            onChange={handleChange}
          />
          <input
            className="block mb-2 w-full border p-2 rounded"
            name="type"
            placeholder="Type (e.g. marketing, feature)"
            value={form.type || ""}
            onChange={handleChange}
          />
          <label className="block mb-2">
            <input
              type="checkbox"
              name="active"
              checked={form.active ?? true}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <span className="ml-2">Active</span>
          </label>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleCreate}
          >
            Save
          </button>
        </div>
      )}
      {loading ? (
        <p>Loading campaigns...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Active</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <React.Fragment key={c.id}>
                <tr>
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.type}</td>
                  <td className="border p-2">{c.active ? "Yes" : "No"}</td>
                  <td className="border p-2 space-x-2 text-right">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleViewUsers(c.id)}
                    >
                      {expandedCampaignId === c.id ? "Hide Users" : "View Users"}
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedCampaignId === c.id && (
                  <tr>
                    <td colSpan={4} className="p-2 bg-gray-50">
                      {userLoading === c.id ? (
                        <p>Loading users...</p>
                      ) : userList[c.id] && userList[c.id].length > 0 ? (
                        <table className="w-full text-sm border border-gray-200 rounded-md">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="p-1 text-left">Name</th>
                              <th className="p-1 text-left">Email</th>
                              <th className="p-1 text-left">Username</th>
                              <th className="p-1 text-left">Opted In</th>
                              <th className="p-1 text-left">Opted At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList[c.id].map((u) => (
                              <tr key={u.user.id}>
                                <td className="p-1">{u.user.name || "-"}</td>
                                <td className="p-1">{u.user.email}</td>
                                <td className="p-1">{u.user.username}</td>
                                <td className="p-1">{u.optIn ? "Yes" : "No"}</td>
                                <td className="p-1">{u.optedAt ? new Date(u.optedAt).toLocaleString() : "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No users have participated in this campaign yet.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 