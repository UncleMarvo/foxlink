// TypeScript types for JSON-LD structured data
export interface Organization {
  '@type': 'Organization';
  '@context': 'https://schema.org';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface Person {
  '@type': 'Person';
  '@context': 'https://schema.org';
  name: string;
  url: string;
  image?: string;
  sameAs?: string[];
}

export interface ProfilePage {
  '@type': 'ProfilePage';
  '@context': 'https://schema.org';
  mainEntity: Person;
  url: string;
}

// Validation functions
export function validateOrganization(data: Organization): boolean {
  return (
    data['@type'] === 'Organization' &&
    typeof data.name === 'string' &&
    typeof data.url === 'string' &&
    (!data.logo || typeof data.logo === 'string') &&
    (!data.sameAs || Array.isArray(data.sameAs))
  );
}

export function validatePerson(data: Person): boolean {
  return (
    data['@type'] === 'Person' &&
    typeof data.name === 'string' &&
    typeof data.url === 'string' &&
    (!data.image || typeof data.image === 'string') &&
    (!data.sameAs || Array.isArray(data.sameAs))
  );
}

export function validateProfilePage(data: ProfilePage): boolean {
  return (
    data['@type'] === 'ProfilePage' &&
    typeof data.url === 'string' &&
    validatePerson(data.mainEntity)
  );
}

// Helper function to safely stringify JSON-LD
export function safeJsonLdStringify(data: any): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error stringifying JSON-LD:', error);
    return '{}';
  }
} 