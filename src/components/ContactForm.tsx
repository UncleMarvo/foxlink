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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name field: only for anonymous users */}
      {!isLoggedIn && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
      )}
      {/* Email field: only for anonymous users */}
      {!isLoggedIn && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </div>
      )}
      {/* Type dropdown: always shown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200 bg-white"
          value={type}
          onChange={e => setType(e.target.value)}
          required
        >
          <option value="Feedback">Feedback</option>
          <option value="Bug">Bug Report</option>
          <option value="Question">General Question</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Message field: always shown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200 resize-none"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={6}
          required
          placeholder="Tell us how we can help you..."
        />
      </div>
      
      {/* Status messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
            </div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </div>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
} 