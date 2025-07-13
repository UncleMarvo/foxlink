import { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { ProductJsonLd } from '@/app/components/ProductJsonLd';
import { PricingCards } from '@/components/landing/pricing-cards';
import { pricingMetadata } from "@/app/metadata";

export const metadata: Metadata = pricingMetadata;

export default function PricingPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];

  // Premium plan details for JSON-LD
  const premiumPlan = {
    name: "FoxLink Premium",
    description: "For creators who want more customization",
    price: {
      monthly: "$3.99",
      annually: "$39.99",
    },
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom themes",
      "Remove FoxLink branding",
    ],
    isAnnual: false, // Default to monthly pricing
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd {...premiumPlan} />
      <PricingCards freePlanLinkLimit={5} />
    </>
  );
} 