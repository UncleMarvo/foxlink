"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

/**
 * ContactForm component
 * Props:
 *   - initialSubject: string (optional, pre-fills the subject field)
 */
export default function ContactForm({ initialSubject = '' }: { initialSubject?: string }) {
  // Get session to determine if user is logged in
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  // Form state
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [type, setType] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle');
    setError('');
    setLoading(true);

    // Validation
    if (!isLoggedIn && (!name || !email)) {
      setError('Name and Email are required.');
      setLoading(false);
      return;
    }
    if (!type || !message) {
      setError('Type and Message are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: isLoggedIn ? session.user.name : name,
          email: isLoggedIn ? session.user.email : email,
          type,
          message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        if (!isLoggedIn) {
          setName('');
          setEmail('');
        }
        setType('Feedback');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to send message.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 border rounded bg-white shadow">
      {/* Name field: only for anonymous users */}
      {!isLoggedIn && (
        <div className="mb-3">
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      )}
      {/* Email field: only for anonymous users */}
      {!isLoggedIn && (
        <div className="mb-3">
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            className="w-full border px-2 py-1 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
      )}
      {/* Type dropdown: always shown */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Type</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={type}
          onChange={e => setType(e.target.value)}
          required
        >
          <option value="Feedback">Feedback</option>
          <option value="Bug">Bug</option>
          <option value="Question">Question</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Message field: always shown */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          required
        />
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {status === 'success' && <div className="text-green-600 mb-2">Thank you! Your message has been sent.</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
} 