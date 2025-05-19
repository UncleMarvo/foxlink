"use client";

import React, { useState, useEffect } from "react";
import LinkEditModal from "./LinkEditModal";
import LinkViewModal from "./LinkViewModal";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

/**
 * LinksTable: Displays a paginated table of user links with actions (view, edit, delete).
 * - Uses Tailwind for styling.
 * - Handles modals for create/edit/view.
 * - Handles pagination and disables Add button at link limit.
 */

// Add prop type for isPremium
interface LinksTableProps {
  isPremium: boolean;
}

const LinksTable: React.FC<LinksTableProps> = ({ isPremium }) => {
  // State for modals (edit/create/view)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  // Links data and pagination
  const [links, setLinks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [linkLimit, setLinkLimit] = useState(10); // TODO: Get from user plan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // For delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch links from API
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data.links || []);
      if (typeof data.linkLimit === 'number') setLinkLimit(data.linkLimit); // Use backend-provided limit
    } catch {
      setError("Failed to load links.");
    }
    setLoading(false);
  };
  useEffect(() => { fetchLinks(); }, []);

  // Pagination logic
  const totalPages = Math.ceil(links.length / pageSize);
  const pagedLinks = links.slice((page - 1) * pageSize, page * pageSize);
  const isAtLimit = links.length >= linkLimit;

  // Handlers
  const handleAddNew = () => { setSelectedLink(null); setShowEditModal(true); };
  const handleEdit = (link: any) => { setSelectedLink(link); setShowEditModal(true); };
  const handleView = (link: any) => { setSelectedLink(link); setShowViewModal(true); };
  const handleDelete = (link: any) => { setDeletingId(link.id); };
  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoading(true);
    await fetch(`/api/links/${deletingId}`, { method: "DELETE" });
    await fetchLinks();
    setDeletingId(null);
    setLoading(false);
  };
  const cancelDelete = () => setDeletingId(null);

  // Handle create/edit submit
  const handleModalSubmit = async (data: any) => {
    setLoading(true);
    if (selectedLink) {
      // Edit
      await fetch(`/api/links/${selectedLink.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Create
      await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    await fetchLinks();
    setShowEditModal(false);
    setLoading(false);
  };

  // Helper for colored status pill
  const StatusPill = ({ isActive }: { isActive: boolean }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>{isActive ? "Active" : "Inactive"}</span>
  );

  // Helper for colored type pill
  const TypePill = ({ type }: { type: any }) => {
    if (!type) return null;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${type.color || "bg-gray-100 text-gray-700"}`}>
        {type.label || type.name}
      </span>
    );
  };

  // Helper for colored rotation type pill
  const RotationTypePill = ({ rotationType }: { rotationType: string }) => {
    if (!rotationType) return null;
    // Optionally, use different colors for each type
    const colorMap: Record<string, string> = {
      always: 'bg-green-100 text-green-800',
      random: 'bg-blue-100 text-blue-800',
      weighted: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-purple-100 text-purple-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[rotationType] || 'bg-gray-100 text-gray-700'}`}>
        {rotationType.charAt(0).toUpperCase() + rotationType.slice(1)}
      </span>
    );
  };

  // Three dots menu component
  const ActionsMenu = ({ onView, onEdit, onDelete }: { onView: () => void; onEdit: () => void; onDelete: () => void }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative inline-block text-left">
        <button className="p-2 rounded hover:bg-gray-100" onClick={() => setOpen((v) => !v)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
        </button>
        {open && (
          <div className="absolute right-0 z-10 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => { setOpen(false); onView(); }}>View</button>
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => { setOpen(false); onEdit(); }}>Edit</button>
            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => { setOpen(false); onDelete(); }}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  // DnD: Handle drag end
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(links);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    // Update order in UI
    setLinks(reordered);
    // Send new order to backend (by link IDs)
    await fetch('/api/links/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: reordered.map(l => l.id) }),
    });
    // Optionally refetch links
    await fetchLinks();
  };

  // If premium, show all links in a scrollable list with DnD
  const renderTableBody = () => {
    if (loading) {
      return <tr><td colSpan={7} className="text-center py-6 text-gray-400">Loading...</td></tr>;
    }
    if (error) {
      return <tr><td colSpan={7} className="text-center py-6 text-red-500">{error}</td></tr>;
    }
    if (links.length === 0) {
      return <tr><td colSpan={7} className="text-center py-6 text-gray-400">No links found.</td></tr>;
    }
    if (isPremium) {
      // DnD enabled: show all links, no pagination
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="links-table">
            {(provided: DroppableProvided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {links.map((link, idx) => (
                  <Draggable key={link.id} draggableId={link.id} index={idx}>
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`border-b border-gray-200 ${snapshot.isDragging ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-4 py-2 cursor-move">{link.title}</td>
                        <td className="px-4 py-2"><a href={link.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{link.url}</a></td>
                        <td className="px-4 py-2"><StatusPill isActive={link.isActive} /></td>
                        <td className="px-4 py-2"><TypePill type={link.type} /></td>
                        <td className="px-4 py-2"><RotationTypePill rotationType={link.rotationType} /></td>
                        <td className="px-4 py-2 text-right">{link.clicks ?? 0}</td>
                        <td className="px-4 py-2 text-center">
                          <ActionsMenu
                            onView={() => handleView(link)}
                            onEdit={() => handleEdit(link)}
                            onDelete={() => handleDelete(link)}
                          />
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      );
    } else {
      // Not premium: show paginated, no DnD, with lock/tooltip
      return pagedLinks.map((link) => (
        <tr key={link.id} className="border-b border-gray-200">
          <td className="px-4 py-2">{link.title}</td>
          <td className="px-4 py-2"><a href={link.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{link.url}</a></td>
          <td className="px-4 py-2"><StatusPill isActive={link.isActive} /></td>
          <td className="px-4 py-2"><TypePill type={link.type} /></td>
          <td className="px-4 py-2"><RotationTypePill rotationType={link.rotationType} /></td>
          <td className="px-4 py-2 text-right">{link.clicks ?? 0}</td>
          <td className="px-4 py-2 text-center">
            <ActionsMenu
              onView={() => handleView(link)}
              onEdit={() => handleEdit(link)}
              onDelete={() => handleDelete(link)}
            />
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 mt-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Links</h2>
          <p className="text-gray-600 text-sm">Manage all your links in one place.</p>
        </div>
        <div className="flex flex-col items-end">
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddNew}
            disabled={isAtLimit}
          >
            {/* SVG icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add New Link
          </button>
          {isAtLimit && (
            <span className="text-xs text-red-500 mt-1">You have reached your link limit, upgrade your plan to remove this limit.</span>
          )}
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto min-h-screen overflow-y-visible">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">URL</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rotation Type</th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Clicks</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          {renderTableBody()}
        </table>
      </div>
      {/* Pagination controls */}
      {/* Only show pagination for non-premium users */}
      {!isPremium && totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-3 py-1 rounded border text-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span className="px-2 py-1 text-sm">Page {page} of {totalPages}</span>
          <button className="px-3 py-1 rounded border text-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
      {/* Premium lock/tooltip for DnD */}
      {!isPremium && (
        <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 0v4m0 0h.01M12 17h-.01" /></svg>
          Drag-and-drop reordering is a premium feature. <a href="/dashboard/upgrade" className="text-blue-600 hover:underline ml-1">Upgrade to Premium</a>
        </div>
      )}
      {/* Modals for create/edit/view */}
      <LinkEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        link={selectedLink}
        onSubmit={handleModalSubmit}
      />
      <LinkViewModal
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        link={selectedLink}
      />
      {/* Delete confirmation dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <h3 className="text-lg font-bold mb-4">Delete Link?</h3>
            <p className="mb-6">Are you sure you want to delete this link? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={cancelDelete}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksTable; 