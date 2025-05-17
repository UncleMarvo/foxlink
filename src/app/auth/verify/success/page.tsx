import React from 'react';
import Link from 'next/link';

export default function VerifySuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Email Verified!</h1>
      <p className="mb-6">Your email has been successfully verified. You can now log in to your account.</p>
      <Link href="/auth/signin" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Go to Login
      </Link>
    </div>
  );
} 