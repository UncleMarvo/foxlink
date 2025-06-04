"use client";

import React, { useState } from 'react';

/**
 * ContactForm component
 * Props:
 *   - initialSubject: string (optional, pre-fills the subject field)
 */
export default function ContactForm({ initialSubject = '' }: { initialSubject?: string }) {
  // Form state
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
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

    // Basic validation
    if (!email || !subject || !message) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setSubject(initialSubject);
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
      <div className="mb-3">
        <label className="block mb-1 font-medium">Subject</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          required
        />
      </div>
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