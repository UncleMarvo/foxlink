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

export interface WebSite {
  '@type': 'WebSite';
  '@context': 'https://schema.org';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbList {
  '@type': 'BreadcrumbList';
  '@context': 'https://schema.org';
  itemListElement: BreadcrumbItem[];
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

export function validateWebSite(data: WebSite): boolean {
  return (
    data['@type'] === 'WebSite' &&
    typeof data.name === 'string' &&
    typeof data.url === 'string' &&
    (!data.description || typeof data.description === 'string') &&
    (!data.potentialAction || (
      data.potentialAction['@type'] === 'SearchAction' &&
      typeof data.potentialAction.target === 'string' &&
      typeof data.potentialAction['query-input'] === 'string'
    ))
  );
}

export function validateBreadcrumbItem(item: BreadcrumbItem): boolean {
  return (
    item['@type'] === 'ListItem' &&
    typeof item.position === 'number' &&
    typeof item.name === 'string' &&
    typeof item.item === 'string'
  );
}

export function validateBreadcrumbList(data: BreadcrumbList): boolean {
  return (
    data['@type'] === 'BreadcrumbList' &&
    Array.isArray(data.itemListElement) &&
    data.itemListElement.length > 0 &&
    data.itemListElement.every(validateBreadcrumbItem) &&
    // Ensure positions are sequential and start from 1
    data.itemListElement.every((item, index) => item.position === index + 1)
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