"use client";
import { useState } from "react";

const rotationTypes = [
  { value: "always", label: "Always" },
  { value: "random", label: "Random" },
  { value: "weighted", label: "Weighted" },
  { value: "scheduled", label: "Scheduled" },
];

export default function AddLinkForm({ onLinkAdded }: { onLinkAdded?: () => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [type, setType] = useState("website");
  const [rotationType, setRotationType] = useState("always");
  const [weight, setWeight] = useState<number | "">("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/links", {
      method: "POST",
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
      setSuccess("Link added!");
      setTitle("");
      setUrl("");
      setIcon("");
      setType("website");
      setRotationType("always");
      setWeight("");
      setScheduleStart("");
      setScheduleEnd("");
      setIsActive(true);
      setCategory("");
      setTags("");
      if (onLinkAdded) onLinkAdded();
    }
  };

  return (
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
          id="isActive"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
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
        className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Link"}
      </button>
    </form>
  );
} 