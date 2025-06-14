'use client';

import React from 'react';
import { JsonLd } from './JsonLd';
import { Person, ProfilePage, validatePerson, validateProfilePage } from '@/utils/jsonld';

interface ProfileJsonLdProps {
  username: string;
  displayName: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
}

export const ProfileJsonLd: React.FC<ProfileJsonLdProps> = ({
  username,
  displayName,
  avatarUrl,
  socialLinks,
}) => {
  // Only proceed if we have the minimum required data
  if (!username || !displayName) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.app';
  const profileUrl = `${baseUrl}/${username}`;

  // Create person data
  const personData: Person = {
    '@type': 'Person',
    '@context': 'https://schema.org',
    name: displayName,
    url: profileUrl,
    image: avatarUrl,
    sameAs: socialLinks ? Object.values(socialLinks).filter(Boolean) : undefined,
  };

  // Validate person data
  if (!validatePerson(personData)) return null;

  // Create profile page data
  const profilePageData: ProfilePage = {
    '@type': 'ProfilePage',
    '@context': 'https://schema.org',
    mainEntity: personData,
    url: profileUrl,
  };

  // Validate profile page data
  if (!validateProfilePage(profilePageData)) return null;

  return <JsonLd data={profilePageData} type="ProfilePage" />;
}; 