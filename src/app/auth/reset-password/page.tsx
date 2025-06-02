"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/auth/signin'), 2000);
      } else {
        setError(data.error || 'Invalid or expired token.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {success ? (
        <div className="text-green-700">Password reset! Redirecting to sign in...</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="password" className="font-semibold">New Password</label>
          <input
            id="password"
            type="password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <label htmlFor="confirm" className="font-semibold">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className="border rounded px-3 py-2"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            disabled={loading}
          />
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
// This page allows users to securely set a new password using their reset token. 