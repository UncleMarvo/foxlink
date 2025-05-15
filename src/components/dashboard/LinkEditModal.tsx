"use client";

import React, { useState, useEffect } from "react";

/**
 * LinkEditModal: Modal dialog for creating or editing a link.
 * - Uses Tailwind for styling.
 * - Accepts props for open/close, link data, and submit handler.
 * - Handles form fields, validation, and submit logic.
 */
const LinkEditModal = ({ open, onClose, link, onSubmit }: {
  open: boolean;
  onClose: () => void;
  link?: any; // If present, editing; else, creating
  onSubmit: (data: any) => void;
}) => {
  // Form state
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [type, setType] = useState(""); // type is now the typeId
  const [errors, setErrors] = useState<{ title?: string; url?: string; type?: string; weight?: string; scheduleStart?: string; scheduleEnd?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  // Types from API
  const [types, setTypes] = useState<any[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [rotationType, setRotationType] = useState('always');
  const [weight, setWeight] = useState<number | ''>('');
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleEnd, setScheduleEnd] = useState('');
  const [weightedSum, setWeightedSum] = useState(0);
  const [weightedSumLoading, setWeightedSumLoading] = useState(false);

  // Fetch types from API
  useEffect(() => {
    setLoadingTypes(true);
    fetch('/api/link-types')
      .then(res => res.json())
      .then(data => setTypes(data.types || []))
      .finally(() => setLoadingTypes(false));
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (link) {
      setTitle(link.title || "");
      setUrl(link.url || "");
      setIsActive(link.isActive !== undefined ? link.isActive : true);
      setType(link.typeId || link.type?.id || "");
      setRotationType(link.rotationType || 'always');
      setWeight(link.weight ?? '');
      setScheduleStart(link.scheduleStart ? link.scheduleStart.slice(0, 16) : '');
      setScheduleEnd(link.scheduleEnd ? link.scheduleEnd.slice(0, 16) : '');
    } else {
      setTitle("");
      setUrl("");
      setIsActive(true);
      setType(types[0]?.id || "");
      setRotationType('always');
      setWeight('');
      setScheduleStart('');
      setScheduleEnd('');
    }
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, open, types]);

  // Fetch weighted sum when rotationType or weight changes
  useEffect(() => {
    if (rotationType === 'weighted') {
      setWeightedSumLoading(true);
      // Exclude current link if editing
      const excludeId = link?.id ? `?excludeId=${link.id}` : '';
      fetch(`/api/links/weighted-sum${excludeId}`)
        .then(res => res.json())
        .then(data => setWeightedSum(data.sum || 0))
        .finally(() => setWeightedSumLoading(false));
    } else {
      setWeightedSum(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotationType, open, link]);

  // Also update sum if weight changes
  useEffect(() => {
    if (rotationType === 'weighted') {
      setWeightedSumLoading(true);
      const excludeId = link?.id ? `?excludeId=${link.id}` : '';
      fetch(`/api/links/weighted-sum${excludeId}`)
        .then(res => res.json())
        .then(data => setWeightedSum(data.sum || 0))
        .finally(() => setWeightedSumLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight]);

  // Validation
  const validate = () => {
    const errs: { title?: string; url?: string; type?: string; weight?: string; scheduleStart?: string; scheduleEnd?: string } = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!url.trim()) errs.url = "URL is required.";
    if (!type) errs.type = "Type is required.";
    if (rotationType === 'weighted') {
      if (weight === '' || isNaN(Number(weight)) || Number(weight) <= 0) errs.weight = "Weight must be a positive number.";
      // Check total sum
      if (Number(weight) + weightedSum > 100) {
        errs.weight = `Total weight for all weighted links cannot exceed 100. Current sum: ${weightedSum}, this value would make it ${Number(weight) + weightedSum}.`;
      }
    }
    if (rotationType === 'scheduled') {
      if (!scheduleStart) errs.scheduleStart = "Start date/time is required.";
      if (!scheduleEnd) errs.scheduleEnd = "End date/time is required.";
      if (scheduleStart && scheduleEnd && new Date(scheduleEnd) <= new Date(scheduleStart)) {
        errs.scheduleEnd = "End must be after start.";
      }
    }
    return errs;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    // Only send relevant fields
    const payload: any = { title, url, isActive, typeId: type, rotationType };
    if (rotationType === 'weighted') payload.weight = Number(weight);
    if (rotationType === 'scheduled') {
      payload.scheduleStart = scheduleStart ? new Date(scheduleStart).toISOString() : null;
      payload.scheduleEnd = scheduleEnd ? new Date(scheduleEnd).toISOString() : null;
    }
    await onSubmit(payload);
    setSubmitting(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Modal header */}
        <h3 className="text-xl font-bold mb-4">{link ? "Edit Link" : "Add New Link"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={submitting}
            />
            {errors.title && <div className="text-xs text-red-500 mt-1">{errors.title}</div>}
          </div>
          {/* URL */}
          <div>
            <label className="block text-sm font-semibold mb-1">URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={submitting}
            />
            {errors.url && <div className="text-xs text-red-500 mt-1">{errors.url}</div>}
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={isActive ? "active" : "inactive"}
              onChange={e => setIsActive(e.target.value === "active")}
              disabled={submitting}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={type}
              onChange={e => setType(e.target.value)}
              disabled={submitting || loadingTypes}
            >
              {types.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            {errors.type && <div className="text-xs text-red-500 mt-1">{errors.type}</div>}
          </div>
          {/* Rotation Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">Rotation Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={rotationType}
              onChange={e => setRotationType(e.target.value)}
              disabled={submitting}
            >
              <option value="always">Always</option>
              <option value="random">Random</option>
              <option value="weighted">Weighted</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          {/* Weight (only for weighted) */}
          {rotationType === 'weighted' && (
            <div>
              <label className="block text-sm font-semibold mb-1">Weight</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={weight}
                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                min={1}
                disabled={submitting}
              />
              {weightedSumLoading && <div className="text-xs text-gray-500 mt-1">Checking total weight...</div>}
              {errors.weight && <div className="text-xs text-red-500 mt-1">{errors.weight}</div>}
              {!errors.weight && !weightedSumLoading && (
                <div className="text-xs text-gray-500 mt-1">Current total for other weighted links: {weightedSum}. Max allowed: 100.</div>
              )}
            </div>
          )}
          {/* Schedule (only for scheduled) */}
          {rotationType === 'scheduled' && (
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Schedule Start</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded px-3 py-2"
                  value={scheduleStart}
                  onChange={e => setScheduleStart(e.target.value)}
                  disabled={submitting}
                />
                {errors.scheduleStart && <div className="text-xs text-red-500 mt-1">{errors.scheduleStart}</div>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Schedule End</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded px-3 py-2"
                  value={scheduleEnd}
                  onChange={e => setScheduleEnd(e.target.value)}
                  disabled={submitting}
                />
                {errors.scheduleEnd && <div className="text-xs text-red-500 mt-1">{errors.scheduleEnd}</div>}
              </div>
            </div>
          )}
          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={submitting}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={submitting}>{submitting ? "Saving..." : (link ? "Save Changes" : "Create Link")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkEditModal; 