"use client";
import { useState } from "react";

const rotationTypes = [
  { value: "always", label: "Always" },
  { value: "random", label: "Random" },
  { value: "weighted", label: "Weighted" },
  { value: "scheduled", label: "Scheduled" },
];

export default function EditLinkForm({ link, onClose }: { link: any; onClose: () => void }) {
  const [title, setTitle] = useState(link.title || "");
  const [url, setUrl] = useState(link.url || "");
  const [icon, setIcon] = useState(link.icon || "");
  const [type, setType] = useState(link.type || "website");
  const [rotationType, setRotationType] = useState(link.rotationType || "always");
  const [weight, setWeight] = useState<number | "">(link.weight || "");
  const [scheduleStart, setScheduleStart] = useState(link.scheduleStart ? link.scheduleStart.slice(0, 16) : "");
  const [scheduleEnd, setScheduleEnd] = useState(link.scheduleEnd ? link.scheduleEnd.slice(0, 16) : "");
  const [isActive, setIsActive] = useState(link.isActive);
  const [category, setCategory] = useState(link.category || "");
  const [tags, setTags] = useState(link.tags || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch(`/api/links/${link.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        url,
        icon,
        type,
        rotationType,
        weight: weight === "" ? null : Number(weight),
        scheduleStart: scheduleStart || null,
        scheduleEnd: scheduleEnd || null,
        isActive,
        category: category || null,
        tags: tags || null,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess("Link updated!");
      setTimeout(onClose, 1000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Link</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon (optional)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={icon}
              onChange={e => setIcon(e.target.value)}
              placeholder="e.g. fa-github"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder="e.g. website, social, contact"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rotation Type</label>
            <select
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={rotationType}
              onChange={e => setRotationType(e.target.value)}
            >
              {rotationTypes.map(rt => (
                <option key={rt.value} value={rt.value}>{rt.label}</option>
              ))}
            </select>
          </div>
          {rotationType === "weighted" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (1-100)</label>
              <input
                type="number"
                min={1}
                max={100}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={weight}
                onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          )}
          {rotationType === "scheduled" && (
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Schedule Start</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={scheduleStart}
                  onChange={e => setScheduleStart(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Schedule End</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={scheduleEnd}
                  onChange={e => setScheduleEnd(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              id="isActiveEdit"
            />
            <label htmlFor="isActiveEdit" className="text-sm text-gray-700">Active</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category (optional)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma separated, optional)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
} 