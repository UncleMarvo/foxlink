'use client';

import { useState, useEffect } from 'react';

interface ShareProfileLinkProps {
  username: string;
  onSuccess: (message: string) => void;
}

export default function ShareProfileLink({ username, onSuccess }: ShareProfileLinkProps) {
    const [origin, setOrigin] = useState('');
    
    useEffect(() => {
      setOrigin(window.location.origin);
    }, []);
    
    const profileUrl = `${origin}/${username}`;
    
    const handleCopy = () => {
      navigator.clipboard.writeText(profileUrl);
      onSuccess('Link copied to clipboard!');
    };
    
    return (
      <div className="mb-6 bg-indigo-50 p-6 rounded-lg border border-indigo-200">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Your Public Profile</h2>
        <p className="text-indigo-600 mb-4">
          Share this link on social media to let people see your links
        </p>
        <div className="flex items-center bg-white rounded-md border border-indigo-200 overflow-hidden">
          <input
            type="text" 
            readOnly
            value={profileUrl}
            className="flex-grow px-4 py-2 focus:outline-none text-gray-700"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          >
            Copy
          </button>
        </div>
        <div className="mt-2 text-sm text-indigo-500">
          <a 
            href={`/${username}`} 
            target="_blank" 
            rel="noopener"
            className="inline-flex items-center hover:underline"
          >
            Preview your profile →
          </a>
        </div>
      </div>
    );
  } 