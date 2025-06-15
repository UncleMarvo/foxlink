'use client';

import React from 'react';
import { JsonLd } from './JsonLd';
import { WebSite, validateWebSite } from '@/utils/jsonld';

interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
}

export const WebSiteJsonLd: React.FC<WebSiteJsonLdProps> = ({
  name,
  url,
  description,
  searchUrl,
}) => {
  // Only proceed if we have the minimum required data
  if (!name || !url) return null;

  // Create website data
  const websiteData: WebSite = {
    '@type': 'WebSite',
    '@context': 'https://schema.org',
    name,
    url,
    description,
    // Only add search action if searchUrl is provided
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: `${searchUrl}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
  };

  // Validate website data
  if (!validateWebSite(websiteData)) return null;

  return <JsonLd data={websiteData} type="WebSite" />;
}; 