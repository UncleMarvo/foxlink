'use client';

import React from 'react';
import { JsonLd } from './JsonLd';
import { BreadcrumbList, BreadcrumbItem, validateBreadcrumbList } from '@/utils/jsonld';

interface BreadcrumbJsonLdProps {
  items: {
    name: string;
    path: string;
  }[];
}

export const BreadcrumbJsonLd: React.FC<BreadcrumbJsonLdProps> = ({ items }) => {
  // Only proceed if we have items
  if (!items || items.length === 0) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio';

  // Create breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.path}`,
  }));

  // Create breadcrumb list data
  const breadcrumbData: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@context': 'https://schema.org',
    itemListElement: breadcrumbItems,
  };

  // Validate breadcrumb data
  if (!validateBreadcrumbList(breadcrumbData)) return null;

  return <JsonLd data={breadcrumbData} type="BreadcrumbList" />;
}; 