import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export default function PricingPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {/* Rest of your pricing page content */}
    </>
  );
} 