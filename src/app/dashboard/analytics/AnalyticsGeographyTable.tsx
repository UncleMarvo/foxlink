"use client";
import { useEffect, useState } from 'react';

export default function AnalyticsGeographyTable({ startDate, endDate }: { startDate: string; endDate: string }) {
  const [data, setData] = useState<{ country: string; profileViews: number; linkClicks: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch with date range
        const res = await fetch(`/api/analytics/geography?start=${startDate}&end=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch geography data');
        const json = await res.json();
        // Merge profileViews and linkClicks by country
        const map: Record<string, { country: string; profileViews: number; linkClicks: number }> = {};
        for (const row of json.profileViews) {
          map[row.country] = { country: row.country, profileViews: row.count, linkClicks: 0 };
        }
        for (const row of json.linkClicks) {
          if (map[row.country]) {
            map[row.country].linkClicks = row.count;
          } else {
            map[row.country] = { country: row.country, profileViews: 0, linkClicks: row.count };
          }
        }
        // Convert to array and sort by total activity (profileViews + linkClicks)
        const merged = Object.values(map).sort((a, b) => (b.profileViews + b.linkClicks) - (a.profileViews + a.linkClicks));
        setData(merged);
        setLoading(false);
      } catch (err) {
        setError('Failed to load geography data');
        setLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  if (loading) return <div className="text-gray-500">Loading country data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full mt-24">
      <h2 className="text-xl font-semibold mb-4">Geographic Analytics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Country</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 border-b">Profile Views</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 border-b">Link Clicks</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No geographic analytics data available yet.</td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.country}>
                  <td className="px-4 py-2 border-b text-gray-800">{row.country}</td>
                  <td className="px-4 py-2 border-b text-right">{row.profileViews}</td>
                  <td className="px-4 py-2 border-b text-right">{row.linkClicks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 