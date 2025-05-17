import React from 'react';
import Link from 'next/link';

export default function VerifyErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-700">Verification Failed</h1>
      <p className="mb-6">The verification link is invalid or has expired. Please try registering again or contact support if you need help.</p>
      <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Go to Registration
      </Link>
    </div>
  );
} 