"use client";

// Admin Analytics Dashboard
// Shows platform-wide metrics and user growth chart for admins

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useSession } from "next-auth/react";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

interface AnalyticsMetrics {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalLinks: number;
  totalClicks: number;
}

interface UserGrowthPoint {
  date: string;
  count: number;
}

export default function AdminAnalyticsPage() {
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

  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userGrowth, setUserGrowth] = useState<UserGrowthPoint[]>([]);
  const [growthLoading, setGrowthLoading] = useState(true);
  const [growthError, setGrowthError] = useState<string | null>(null);

  // Fetch analytics metrics from the API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch analytics");
        setLoading(false);
      });
  }, []);

  // Fetch user growth data
  useEffect(() => {
    setGrowthLoading(true);
    setGrowthError(null);
    fetch("/api/admin/analytics/user-growth")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user growth");
        return res.json();
      })
      .then((data) => {
        setUserGrowth(data.data || []);
        setGrowthLoading(false);
      })
      .catch((err) => {
        setGrowthError(err.message || "Failed to fetch user growth");
        setGrowthLoading(false);
      });
  }, []);

  // Prepare data for react-chartjs-2
  const chartData = {
    labels: userGrowth.map((point) => point.date),
    datasets: [
      {
        label: "User Growth",
        data: userGrowth.map((point) => point.count),
        fill: true,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        pointBackgroundColor: "#6366f1",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Users" },
        beginAtZero: true,
        ticks: { font: { size: 12 }, stepSize: 1 },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Analytics Dashboard</h1>
      {loading && <div className="text-blue-600">Loading analytics...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {metrics && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mb-10">
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-indigo-600">{metrics.totalUsers}</div>
            <div className="text-gray-700 mt-2">Total Users</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600">{metrics.activeUsers}</div>
            <div className="text-gray-700 mt-2">Active Users (30d)</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-600">{metrics.premiumUsers}</div>
            <div className="text-gray-700 mt-2">Premium Users</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600">{metrics.totalLinks}</div>
            <div className="text-gray-700 mt-2">Total Links</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-pink-600">{metrics.totalClicks}</div>
            <div className="text-gray-700 mt-2">Total Clicks</div>
          </div>
        </div>
      )}
      {/* User Growth Chart */}
      <div className="max-w-4xl mt-12">
        <h2 className="text-xl font-semibold mb-4">User Growth (Last 30 Days)</h2>
        {growthLoading && <div className="text-blue-600">Loading user growth...</div>}
        {growthError && <div className="text-red-600">{growthError}</div>}
        {!growthLoading && !growthError && userGrowth.length > 0 && (
          <div className="bg-white rounded shadow p-6">
            {/* Chart.js Line chart for user growth */}
            <Line data={chartData} options={chartOptions} height={300} />
          </div>
        )}
        {!growthLoading && !growthError && userGrowth.length === 0 && (
          <div className="text-gray-500">No user growth data available.</div>
        )}
      </div>
    </div>
  );
} 