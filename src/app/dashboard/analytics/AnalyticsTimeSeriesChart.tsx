"use client";
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsTimeSeriesChart({ startDate, endDate }: { startDate: string; endDate: string }) {
  const [data, setData] = useState<{ date: string; profileViews: number; linkClicks: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch with date range
        const res = await fetch(`/api/analytics/timeseries?start=${startDate}&end=${endDate}`);
        if (!res.ok) throw new Error('Failed to fetch time series data');
        const json = await res.json();
        // Merge profileViews and linkClicks by date
        const map: Record<string, { date: string; profileViews: number; linkClicks: number }> = {};
        for (const row of json.profileViews) {
          map[row.date] = { date: row.date, profileViews: row.count, linkClicks: 0 };
        }
        for (const row of json.linkClicks) {
          if (map[row.date]) {
            map[row.date].linkClicks = row.count;
          } else {
            map[row.date] = { date: row.date, profileViews: 0, linkClicks: row.count };
          }
        }
        // Fill in missing days (0s)
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days: string[] = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          days.push(d.toISOString().slice(0, 10));
        }
        const merged = days.map(date => map[date] || { date, profileViews: 0, linkClicks: 0 });
        setData(merged);
        setLoading(false);
      } catch (err) {
        setError('Failed to load time series data');
        setLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  if (loading) return <div className="text-gray-500">Loading chart...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Check if all data points are zero
  const allZero = data.length > 0 && data.every(d => d.profileViews === 0 && d.linkClicks === 0);

  // Chart.js data and options
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Profile Views',
        data: data.map(d => d.profileViews),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        tension: 0.3,
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Link Clicks',
        data: data.map(d => d.linkClicks),
        borderColor: '#f59e42',
        backgroundColor: 'rgba(245,158,66,0.1)',
        tension: 0.3,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        ticks: { font: { size: 12 }, maxRotation: 45, minRotation: 45 },
        grid: { display: true },
      },
      y: {
        title: { display: true, text: 'Count' },
        beginAtZero: true,
        min: 0,
        max: allZero ? 1 : undefined,
        grid: { display: true },
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    // Use inline style for height to ensure Chart.js respects it and does not expand infinitely
    <div className="w-full border border-gray-300 bg-white mt-10 relative" style={{ height: 420 }}>
      <Line data={chartData} options={chartOptions} />
      {allZero && (
        <span className="text-gray-400 text-lg">No analytics data available yet</span>
      )}
    </div>
  );
}