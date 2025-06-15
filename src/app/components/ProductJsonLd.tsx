import { FC } from 'react';
import Script from 'next/script';

interface ProductJsonLdProps {
  name: string;
  description: string;
  price: {
    monthly: string;
    annually: string;
  };
  features: string[];
  isAnnual: boolean;
}

export const ProductJsonLd: FC<ProductJsonLdProps> = ({
  name,
  description,
  price,
  features,
  isAnnual,
}) => {
  // Convert price string to number (remove $ and convert to number)
  const priceValue = parseFloat((isAnnual ? price.annually : price.monthly).replace('$', ''));
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    offers: {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'USD',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: 'https://foxlink.io/pricing',
    },
    features: features,
  };

  return (
    <Script
      id="product-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}; 