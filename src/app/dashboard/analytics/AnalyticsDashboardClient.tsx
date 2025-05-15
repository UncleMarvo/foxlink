"use client";

import React, { useState, useEffect } from "react";
import AnalyticsTimeSeriesChart from "./AnalyticsTimeSeriesChart";
import AnalyticsGeographyTable from "./AnalyticsGeographyTable";
import AnalyticsReferrerTable from "./AnalyticsReferrerTable";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import StatBox from "@/components/StatBox";
import PanelBox from "@/components/PanelBox";

// Types for analytics data
interface LinkClick {
  linkId: string;
  title: string;
  clicks: number;
}

interface AnalyticsData {
  profileViews: number;
  perLinkClicks: LinkClick[];
  error?: string | null;
}

interface AnalyticsDashboardClientProps {
  initialData: AnalyticsData;
  initialStartDate: string; // ISO date string (YYYY-MM-DD)
  initialEndDate: string; // ISO date string (YYYY-MM-DD)
  isPremium: boolean;
  totalLinks: number;
  totalClicks: number;
  uniqueVisitors: number;
  conversionRate: string;
}

/**
 * Helper to get YYYY-MM-DD string for today
 */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Helper to get YYYY-MM-DD string for N days ago
 */
function daysAgoStr(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/**
 * Helper to get YYYY-MM-DD string for the first day of this month
 */
function firstOfMonthStr() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}

/**
 * Client component for analytics dashboard with custom date range selection.
 * - Renders date pickers for start and end date.
 * - Displays analytics data for the selected range.
 * - Fetches new data from API when date range changes.
 */
const AnalyticsDashboardClient: React.FC<AnalyticsDashboardClientProps> = ({
  initialData,
  initialStartDate,
  initialEndDate,
  isPremium,
  totalLinks: initialTotalLinks,
  totalClicks: initialTotalClicks,
  uniqueVisitors: initialUniqueVisitors,
  conversionRate: initialConversionRate,
}) => {
  // State for date range
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  // State for analytics data
  const [data, setData] = useState<AnalyticsData>(initialData);
  // State for StatBox values
  const [statBox, setStatBox] = useState({
    totalLinks: initialTotalLinks,
    totalClicks: initialTotalClicks,
    uniqueVisitors: initialUniqueVisitors,
    conversionRate: initialConversionRate,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State for Most Active Day
  const [mostActiveDay, setMostActiveDay] = useState<string | null>(null);

  // Preset ranges
  const presets = [
    {
      label: "Last 7 days",
      getRange: () => ({ start: daysAgoStr(6), end: todayStr() }),
    },
    {
      label: "Last 30 days",
      getRange: () => ({ start: daysAgoStr(29), end: todayStr() }),
    },
    {
      label: "This month",
      getRange: () => ({ start: firstOfMonthStr(), end: todayStr() }),
    },
    {
      label: "All time",
      getRange: () => ({ start: "1970-01-01", end: todayStr() }),
    },
  ];

  // Helper to check if current range matches a preset
  function isPresetActive(preset: (typeof presets)[0]) {
    const { start, end } = preset.getRange();
    return startDate === start && endDate === end;
  }

  // Top Performing Links logic
  const topLimit = isPremium ? 5 : 3;
  const sortedLinks = [...data.perLinkClicks].sort(
    (a, b) => b.clicks - a.clicks
  );
  const topLinks = sortedLinks.slice(0, topLimit);

  // Compute additional metrics
  const avgClicksPerLink =
    statBox.totalLinks > 0
      ? (statBox.totalClicks / statBox.totalLinks).toFixed(2)
      : "0";
  const avgClicksPerVisitor =
    statBox.uniqueVisitors > 0
      ? (statBox.totalClicks / statBox.uniqueVisitors).toFixed(2)
      : "0";
  const inactiveLinks = statBox.totalLinks - data.perLinkClicks.length;

  // Fetch analytics data when date range changes
  useEffect(() => {
    // Only fetch if the date range is different from the initial
    if (startDate === initialStartDate && endDate === initialEndDate) return;
    setLoading(true);
    setError(null);
    fetch(`/api/analytics/summary?start=${startDate}&end=${endDate}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then((json) => {
        setData(json);
        // Update StatBox values from API response
        setStatBox({
          totalLinks: json.totalLinks,
          totalClicks: json.totalClicks,
          uniqueVisitors: json.uniqueVisitors,
          conversionRate: json.conversionRate,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [startDate, endDate, initialStartDate, initialEndDate]);

  // Fetch Most Active Day when date range changes
  useEffect(() => {
    async function fetchMostActiveDay() {
      try {
        const res = await fetch(
          `/api/analytics/timeseries?start=${startDate}&end=${endDate}`
        );
        if (!res.ok) throw new Error("Failed to fetch time series data");
        const json = await res.json();
        // Find the day with the highest linkClicks
        let max = 0;
        let day = null;
        for (const row of json.linkClicks) {
          if (row.count > max) {
            max = row.count;
            day = row.date;
          }
        }
        setMostActiveDay(day ? `${day} (${max} clicks)` : "N/A");
      } catch {
        setMostActiveDay("N/A");
      }
    }
    fetchMostActiveDay();
  }, [startDate, endDate]);

  // Helper: format date for input fields
  const formatDate = (date: string) => date.slice(0, 10);

  // Export CSV handler
  async function handleExportCSV() {
    // Fetch all analytics data for the current range
    // 1. Summary (already in state)
    // 2. Time series
    // 3. Geography
    // 4. Referrer
    const [timeSeries, geography, referrer] = await Promise.all([
      fetch(`/api/analytics/timeseries?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
      fetch(`/api/analytics/geography?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
      fetch(`/api/analytics/referrer?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
    ]);

    // Build CSV content
    let csv = "";
    // Summary
    csv += "Summary\n";
    csv += "Metric,Value\n";
    csv += `Total Profile Views,${data.profileViews}\n`;
    csv += "Link Title,Clicks\n";
    data.perLinkClicks.forEach((link: any) => {
      csv += `${link.title.replace(/,/g, " ")},${link.clicks}\n`;
    });
    csv += "\n";
    // Time Series
    csv += "Time Series\n";
    csv += "Date,Profile Views,Link Clicks\n";
    (timeSeries.profileViews || []).forEach((row: any, i: number) => {
      const date = row.date;
      const views = row.count;
      const clicks =
        (timeSeries.linkClicks || []).find((lc: any) => lc.date === date)
          ?.count || 0;
      csv += `${date},${views},${clicks}\n`;
    });
    csv += "\n";
    // Geography
    csv += "Geography\n";
    csv += "Country,Profile Views,Link Clicks\n";
    (geography.profileViews || []).forEach((row: any) => {
      const country = row.country.replace(/,/g, " ");
      const views = row.count;
      const clicks =
        (geography.linkClicks || []).find(
          (lc: any) => lc.country === row.country
        )?.count || 0;
      csv += `${country},${views},${clicks}\n`;
    });
    csv += "\n";
    // Referrer
    csv += "Referrer\n";
    csv += "Referrer,Profile Views,Link Clicks\n";
    (referrer.profileViews || []).forEach((row: any) => {
      const ref = row.referrer.replace(/,/g, " ");
      const views = row.count;
      const clicks =
        (referrer.linkClicks || []).find(
          (lc: any) => lc.referrer === row.referrer
        )?.count || 0;
      csv += `${ref},${views},${clicks}\n`;
    });
    // Download CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `analytics_export_${startDate}_to_${endDate}.csv`);
  }

  // Export PDF handler
  async function handleExportPDF() {
    // Fetch all analytics data for the current range
    const [timeSeries, geography, referrer] = await Promise.all([
      fetch(`/api/analytics/timeseries?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
      fetch(`/api/analytics/geography?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
      fetch(`/api/analytics/referrer?start=${startDate}&end=${endDate}`).then(
        (res) => res.json()
      ),
    ]);

    // Create PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Analytics Report", 14, 16);
    doc.setFontSize(10);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 22);
    let y = 28;

    // Summary Section
    doc.setFontSize(12);
    doc.text("Summary", 14, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["Metric", "Value"]],
      body: [
        ["Total Profile Views", data.profileViews],
        ...data.perLinkClicks.map((link: any) => [link.title, link.clicks]),
      ],
      theme: "grid",
      styles: { fontSize: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // Time Series Section
    doc.setFontSize(12);
    doc.text("Time Series", 14, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["Date", "Profile Views", "Link Clicks"]],
      body: (timeSeries.profileViews || []).map((row: any) => {
        const date = row.date;
        const views = row.count;
        const clicks =
          (timeSeries.linkClicks || []).find((lc: any) => lc.date === date)
            ?.count || 0;
        return [date, views, clicks];
      }),
      theme: "grid",
      styles: { fontSize: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // Geography Section
    doc.setFontSize(12);
    doc.text("Geography", 14, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["Country", "Profile Views", "Link Clicks"]],
      body: (geography.profileViews || []).map((row: any) => {
        const country = row.country;
        const views = row.count;
        const clicks =
          (geography.linkClicks || []).find(
            (lc: any) => lc.country === row.country
          )?.count || 0;
        return [country, views, clicks];
      }),
      theme: "grid",
      styles: { fontSize: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // Referrer Section
    doc.setFontSize(12);
    doc.text("Referrer", 14, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["Referrer", "Profile Views", "Link Clicks"]],
      body: (referrer.profileViews || []).map((row: any) => {
        const ref = row.referrer;
        const views = row.count;
        const clicks =
          (referrer.linkClicks || []).find(
            (lc: any) => lc.referrer === row.referrer
          )?.count || 0;
        return [ref, views, clicks];
      }),
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Save PDF
    doc.save(`analytics_report_${startDate}_to_${endDate}.pdf`);
  }

  // SVG icons (copied from dashboard)
  const linkIcon = (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M10 14a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const clickIcon = (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 19v-7m0 0l-3 3m3-3l3 3"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2" />
    </svg>
  );
  const visitorIcon = (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" stroke="#555" strokeWidth="2" />
      <path
        d="M2 20c0-4 4-7 10-7s10 3 10 7"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  const conversionIcon = (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="4" stroke="#555" strokeWidth="2" />
    </svg>
  );

  return (
    <div>
      {/* Preset Date Range Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((preset) => {
          const active = isPresetActive(preset);
          return (
            <button
              key={preset.label}
              type="button"
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() => {
                const { start, end } = preset.getRange();
                setStartDate(start);
                setEndDate(end);
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      {/* Date Range Picker */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="font-semibold">Date Range:</label>
        <input
          type="date"
          value={formatDate(startDate)}
          onChange={(e) => setStartDate(e.target.value)}
          max={formatDate(endDate)}
          className="border rounded px-2 py-1"
        />
        <span className="mx-2">to</span>
        <input
          type="date"
          value={formatDate(endDate)}
          onChange={(e) => setEndDate(e.target.value)}
          min={formatDate(startDate)}
          className="border rounded px-2 py-1"
        />
      </div>
      {/* Loading/Error States */}
      {loading && <div className="text-blue-500 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* Stat boxes row (copied from dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <StatBox
          title="Total Links"
          value={statBox.totalLinks}
          icon={linkIcon}
        />
        <StatBox
          title="Total Profile Views"
          value={data.profileViews}
          icon={visitorIcon}
        />
        <StatBox
          title="Total Clicks"
          value={statBox.totalClicks}
          icon={clickIcon}
        />
        <StatBox
          title="Unique Visitors"
          value={statBox.uniqueVisitors}
          icon={visitorIcon}
        />
        <StatBox
          title="Click Rate"
          value={statBox.conversionRate}
          icon={conversionIcon}
        />
      </div>

      {/* If not premium, show locked analytics sections with upgrade message */}
      {!isPremium ? (
        <>
          {/* Additional metrics StatBoxes row (locked) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatBox
              title="Avg Clicks per Link"
              value={<span className="text-gray-400">—</span>}
            />
            <StatBox
              title="Avg Clicks per Visitor"
              value={<span className="text-gray-400">—</span>}
            />
            <StatBox
              title="Inactive Links"
              value={<span className="text-gray-400">—</span>}
            />
            <StatBox
              title="Most Active Day"
              value={<span className="text-gray-400">—</span>}
            />
          </div>
          {/* Top Performing Links and Link Clicks in side-by-side boxes (locked) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PanelBox title="Top Performing Links">
              <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                <span className="mb-2">
                  Upgrade to premium to unlock this analytics data!
                </span>
              </div>
            </PanelBox>
            <PanelBox title="Link Clicks">
              <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                <span className="mb-2">
                  Upgrade to premium to unlock this analytics data!
                </span>
              </div>
            </PanelBox>
          </div>
          {/* Time Series Chart Below Summary Stats (locked) */}
          <div className="mb-8">
            <PanelBox title="Time Series Chart">
              <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                <span className="mb-2">
                  Upgrade to premium to unlock the Time Series Chart and see
                  your analytics trends over time!
                </span>
              </div>
            </PanelBox>
          </div>
          {/* Geographic Analytics and Referrer Analytics in side-by-side boxes (locked) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PanelBox title="Geographic Analytics">
              <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                <span className="mb-2">
                  Upgrade to premium to unlock this analytics data!
                </span>
              </div>
            </PanelBox>
            <PanelBox title="Referrer Analytics">
              <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                <span className="mb-2">
                  Upgrade to premium to unlock this analytics data!
                </span>
              </div>
            </PanelBox>
          </div>
        </>
      ) : (
        // Premium users: show all analytics data as normal
        <>
          {/* Additional metrics StatBoxes row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatBox title="Avg Clicks per Link" value={avgClicksPerLink} />
            <StatBox
              title="Avg Clicks per Visitor"
              value={avgClicksPerVisitor}
            />
            <StatBox title="Inactive Links" value={inactiveLinks} />
            <StatBox title="Most Active Day" value={mostActiveDay || "N/A"} />
          </div>
          {/* Analytics Data Display */}
          {!loading && !error && (
            <>
              {/* Top Performing Links and Link Clicks in side-by-side boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <PanelBox title="Top Performing Links">
                  <ul className="divide-y divide-gray-200">
                    {topLinks.map((link, idx) => (
                      <li
                        key={link.linkId}
                        className="py-2 flex justify-between items-center"
                      >
                        <span className="font-medium flex items-center gap-2">
                          {idx === 0 && (
                            <span className="text-yellow-500">★</span>
                          )}
                          {link.title}
                        </span>
                        <span className="text-blue-700 font-bold">
                          {link.clicks}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {!isPremium && sortedLinks.length > 3 && (
                    <div className="mt-2 text-xs text-gray-500">
                      Upgrade to premium to see your top 5 links!
                    </div>
                  )}
                </PanelBox>
                <PanelBox title="Link Clicks">
                  {data.perLinkClicks.length === 0 ? (
                    <div className="text-gray-500">No link clicks yet.</div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {data.perLinkClicks.map((link) => (
                        <li
                          key={link.linkId}
                          className="py-3 flex justify-between items-center"
                        >
                          <span className="font-medium">{link.title}</span>
                          <span className="text-blue-700 font-bold">
                            {link.clicks}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </PanelBox>
              </div>
              {/* Time Series Chart Below Summary Stats */}

              <div className="mb-8">
                <AnalyticsTimeSeriesChart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              {/* Geographic Analytics and Referrer Analytics in side-by-side boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <PanelBox title="Geographic Analytics">
                  <AnalyticsGeographyTable
                    startDate={startDate}
                    endDate={endDate}
                  />
                </PanelBox>
                <PanelBox title="Referrer Analytics">
                  <AnalyticsReferrerTable
                    startDate={startDate}
                    endDate={endDate}
                  />
                </PanelBox>
              </div>
              {/* Export Buttons */}
              <div className="mb-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 border border-green-700 transition-colors"
                  onClick={handleExportCSV}
                >
                  Export CSV
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 border border-blue-700 transition-colors"
                  onClick={handleExportPDF}
                >
                  Export PDF
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboardClient;
