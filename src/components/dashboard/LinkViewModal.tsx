"use client";

import React from "react";

/**
 * LinkViewModal: Modal dialog for viewing link details (read-only).
 * - Uses Tailwind for styling.
 * - Accepts props for open/close and link data.
 * - Displays all link details in a clean layout.
 */
const LinkViewModal = ({ open, onClose, link }: {
  open: boolean;
  onClose: () => void;
  link?: any;
}) => {
  if (!open || !link) return null;

  // Debug: Log the link object to check for scheduleStart and scheduleEnd
  console.log('LinkViewModal link:', link);

  // Explicitly type the color map for rotation types to avoid TypeScript errors
  const rotationTypeColorMap: Record<string, string> = {
    always: 'bg-green-100 text-green-800',
    random: 'bg-blue-100 text-blue-800',
    weighted: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-purple-100 text-purple-800',
  };
  // Safely get the color for the rotation type, defaulting to gray if not found
  const rotationTypeColor = link.rotationType && rotationTypeColorMap[link.rotationType] ? rotationTypeColorMap[link.rotationType] : 'bg-gray-100 text-gray-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Modal header */}
        <h3 className="text-xl font-bold mb-4">Link Details</h3>
        {/* TODO: Display all link details in a read-only format */}
        <div className="space-y-2">
          <div><span className="font-semibold">Title:</span> {link.title}</div>
          <div><span className="font-semibold">URL:</span> <a href={link.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{link.url}</a></div>
          {/* Status pill for visual consistency */}
          <div><span className="font-semibold">Status:</span> <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${link.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{link.isActive ? 'Active' : 'Inactive'}</span></div>
          {/* Type pill for visual consistency */}
          <div><span className="font-semibold">Type:</span> {link.type ? (<span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${link.type.color || 'bg-gray-100 text-gray-700'}`}>{link.type.label || link.type.name}</span>) : '—'}</div>
          {/* Rotation Type pill */}
          <div>
            <span className="font-semibold">Rotation Type:</span>
            {link.rotationType ? (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${rotationTypeColor}`}>
                {link.rotationType.charAt(0).toUpperCase() + link.rotationType.slice(1)}
              </span>
            ) : '—'}
          </div>
          {/* Dynamic fields for Weighted rotation */}
          {link.rotationType === 'weighted' && (
            <div className="mt-4">
              {/* Show link-level weight if it exists */}
              {typeof link.weight !== 'undefined' && (
                <div className="mb-2">
                  <span className="font-semibold">Link Weight:</span>
                  <span className="ml-2 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">{link.weight}</span>
                </div>
              )}
              {/* Show per-destination weights if destinations exist */}
              {Array.isArray(link.destinations) && (
                <>
                  <div className="font-semibold mb-1">Weighted Destinations:</div>
                  <ul className="pl-4 list-disc space-y-1">
                    {link.destinations.map((dest: any, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <a href={dest.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{dest.url}</a>
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Weight: {dest.weight}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          {/* Dynamic fields for Scheduled rotation */}
          {link.rotationType === 'scheduled' && (
            <div className="mt-4">
              {/* Show schedule start and end if they exist */}
              {link.scheduleStart && (
                <div>
                  <span className="font-semibold">Schedule Start:</span>
                  <span className="ml-2">{new Date(link.scheduleStart).toLocaleString()}</span>
                </div>
              )}
              {link.scheduleEnd && (
                <div>
                  <span className="font-semibold">Schedule End:</span>
                  <span className="ml-2">{new Date(link.scheduleEnd).toLocaleString()}</span>
                </div>
              )}
              {/* Only show the schedule details if link.schedule exists */}
              {link.schedule && (
                <>
                  <div className="font-semibold mb-1 mt-2">Schedule:</div>
                  {/* Example: Display schedule as a list of time windows */}
                  <ul className="pl-4 list-disc space-y-1">
                    {Array.isArray(link.schedule) ? link.schedule.map((item: any, idx: number) => (
                      <li key={idx}>
                        {item.label ? <span className="font-semibold">{item.label}: </span> : null}
                        {item.start && item.end ? `${item.start} - ${item.end}` : JSON.stringify(item)}
                      </li>
                    )) : (
                      <li>{JSON.stringify(link.schedule)}</li>
                    )}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
        <div className="mt-4"><span className="font-semibold">Clicks:</span> {link.clicks ?? 0}</div>
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LinkViewModal; 