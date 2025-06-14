'use client';

import React from 'react';
import { safeJsonLdStringify } from '@/utils/jsonld';

interface JsonLdProps {
  data: any;
  type: 'Organization' | 'Person' | 'ProfilePage';
}

export const JsonLd: React.FC<JsonLdProps> = ({ data, type }) => {
  // Only render if we have valid data
  if (!data) return null;

  // Create the JSON-LD script content
  const jsonLd = safeJsonLdStringify(data);

  // Only render if we have valid JSON
  if (jsonLd === '{}') return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      data-testid={`jsonld-${type.toLowerCase()}`}
    />
  );
}; 