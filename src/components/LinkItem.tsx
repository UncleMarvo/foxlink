"use client";
import { useState } from "react";

export default function LinkItem({ link, index, total, onEdit, onDelete, onMove }: {
  link: any;
  index: number;
  total: number;
  onEdit: (link: any) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <li className="flex items-center justify-between bg-gray-100 rounded p-4">
      <div>
        <div className="font-semibold">{link.title}</div>
        <div className="text-sm text-gray-500">{link.url}</div>
        <div className="text-xs text-gray-400 mt-1">
          Type: {link.type} | Rotation: {link.rotationType}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          title="Edit"
          onClick={() => onEdit(link)}
        >
          Edit
        </button>
        {confirmDelete ? (
          <>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              onClick={() => onDelete(link.id)}
            >
              Confirm
            </button>
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            title="Delete"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        )}
        <button
          className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
          title="Move Up"
          onClick={() => onMove(link.id, "up")}
          disabled={index === 0}
        >
          ↑
        </button>
        <button
          className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
          title="Move Down"
          onClick={() => onMove(link.id, "down")}
          disabled={index === total - 1}
        >
          ↓
        </button>
      </div>
    </li>
  );
} 