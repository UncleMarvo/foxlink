"use client";
import { useEffect, useState } from 'react';

export default function AnalyticsReferrerTable({ startDate, endDate }: { startDate: string; endDate: string }) {
  const [data, setData] = useState<{ referrer: string; profileViews: number; linkClicks: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch with date range
        const res = await fetch(`/api/analytics/referrer?start=${startDate}&end=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch referrer data');
        const json = await res.json();
        // Merge profileViews and linkClicks by referrer
        const map: Record<string, { referrer: string; profileViews: number; linkClicks: number }> = {};
        for (const row of json.profileViews) {
          map[row.referrer] = { referrer: row.referrer, profileViews: row.count, linkClicks: 0 };
        }
        for (const row of json.linkClicks) {
          if (map[row.referrer]) {
            map[row.referrer].linkClicks = row.count;
          } else {
            map[row.referrer] = { referrer: row.referrer, profileViews: 0, linkClicks: row.count };
          }
        }
        // Convert to array and sort by total activity (profileViews + linkClicks)
        const merged = Object.values(map).sort((a, b) => (b.profileViews + b.linkClicks) - (a.profileViews + a.linkClicks));
        setData(merged);
        setLoading(false);
      } catch (err) {
        setError('Failed to load referrer data');
        setLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  if (loading) return <div className="text-gray-500">Loading referrer data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full mt-12">
      <h2 className="text-xl font-semibold mb-4">Referrer Analytics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Referrer</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Profile Views</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Link Clicks</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No referrer analytics data available yet.</td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.referrer} className="bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-2 text-gray-800">{row.referrer}</td>
                  <td className="px-4 py-2 text-right">{row.profileViews}</td>
                  <td className="px-4 py-2 text-right">{row.linkClicks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 