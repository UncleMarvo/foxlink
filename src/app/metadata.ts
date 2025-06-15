import { Metadata, Viewport } from "next";

// Base URL for the application
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const landingMetadata: Metadata = {
  title: "FoxLink - One Link to Share All Your Content",
  description: "Create a customizable page that showcases your links, social profiles, and content in one place. Share a single link in your bio to connect your audience to everything you do.",
  alternates: {
    canonical: baseUrl,
  },
};

export const faqMetadata: Metadata = {
  title: "FAQ - FoxLink",
  description: "Find answers to frequently asked questions about FoxLink. Learn about our features, pricing, and how to get started with your personalized link in bio page.",
  alternates: {
    canonical: `${baseUrl}/faq`,
  },
};

export const pricingMetadata: Metadata = {
  title: "Pricing - FoxLink",
  description: "Choose the perfect FoxLink plan for your needs. Start with our free plan or upgrade to Premium for unlimited links, advanced analytics, and custom themes.",
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
};

export const contactMetadata: Metadata = {
  title: "Contact Us - FoxLink",
  description: "Get in touch with the FoxLink team. We're here to help with any questions about our link in bio platform, features, or support.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export const privacyMetadata: Metadata = {
  title: "Privacy Policy - FoxLink",
  description: "Learn how FoxLink protects your privacy and handles your data. Our privacy policy explains your rights and our data practices.",
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
};

export const termsMetadata: Metadata = {
  title: "Terms of Service - FoxLink",
  description: "Read FoxLink's terms of service. Understand the rules and guidelines for using our link in bio platform.",
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
};

export const gdprMetadata: Metadata = {
  title: "GDPR - FoxLink",
  description: "Learn about FoxLink's GDPR compliance and how we protect your data rights. Understand our data processing practices and your privacy rights.",
  alternates: {
    canonical: `${baseUrl}/gdpr`,
  },
};

export const cookiesMetadata: Metadata = {
  title: "Cookie Policy - FoxLink",
  description: "Understand how FoxLink uses cookies to improve your experience. Learn about the types of cookies we use and how to manage them.",
  alternates: {
    canonical: `${baseUrl}/cookies`,
  },
}; 