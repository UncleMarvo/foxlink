import { Metadata } from "next";

export const landingMetadata: Metadata = {
  // Essential SEO - Updated with privacy-first messaging
  title: "FoxLink - Privacy-First Bio Links | No Tracking, No Ads",
  description: "Create beautiful bio link pages without tracking or ads. Free tier available, premium plans that won't break the bank. The privacy-first alternative to expensive bio link tools.",
  keywords: [
    "bio links",
    "linktree alternative", 
    "privacy-first",
    "no tracking",
    "link in bio",
    "creator tools",
    "no ads",
    "affordable bio links",
    "privacy focused",
    "clean interface"
  ],
  authors: [{ name: "FoxLink Team" }],
  creator: "FoxLink",
  publisher: "FoxLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Updated to use foxlink.bio as the canonical URL
  metadataBase: new URL("https://foxlink.bio"),
  alternates: {
    canonical: "https://foxlink.bio",
  },
  // Open Graph / Facebook - Updated with privacy-first messaging
  openGraph: {
    type: "website",
    title: "FoxLink - Privacy-First Bio Links",
    description: "Bio links without tracking. No ads, affordable pricing, clean interface. Free tier + premium plans that actually make sense.",
    url: "https://foxlink.bio",
    siteName: "FoxLink",
    images: [
      {
        url: "https://foxlink.bio/social-preview.png",
        width: 1200,
        height: 630,
        alt: "FoxLink - Privacy-First Bio Links",
      },
    ],
    locale: "en_US",
  },
  // Twitter Card - Updated with privacy-first messaging and correct handle
  twitter: {
    card: "summary_large_image",
    title: "FoxLink - Privacy-First Bio Links",
    description: "Bio links without tracking. No ads, affordable pricing, clean interface.",
    images: ["https://foxlink.bio/social-preview.png"],
    site: "@foxlinkbio",
    creator: "@foxlinkbio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const faqMetadata: Metadata = {
  title: "FAQ - FoxLink",
  description: "Find answers to frequently asked questions about FoxLink. Learn about our features, pricing, and how to get started with your personalized link in bio page.",
  alternates: {
    canonical: "/faq",
  },
};

export const pricingMetadata: Metadata = {
  title: "Pricing - FoxLink",
  description: "Choose the perfect FoxLink plan for your needs. Start with our free plan or upgrade to Premium for unlimited links, advanced analytics, and custom themes.",
  alternates: {
    canonical: "/pricing",
  },
};

export const contactMetadata: Metadata = {
  title: "Contact Us - FoxLink",
  description: "Get in touch with the FoxLink team. We're here to help with any questions about our link in bio platform, features, or support.",
  alternates: {
    canonical: "/contact",
  },
};

export const privacyMetadata: Metadata = {
  title: "Privacy Policy - FoxLink",
  description: "Learn how FoxLink protects your privacy and handles your data. Our privacy policy explains your rights and our data practices.",
  alternates: {
    canonical: "/privacy",
  },
};

export const termsMetadata: Metadata = {
  title: "Terms of Service - FoxLink",
  description: "Read FoxLink's terms of service. Understand the rules and guidelines for using our link in bio platform.",
  alternates: {
    canonical: "/terms",
  },
};

export const gdprMetadata: Metadata = {
  title: "GDPR - FoxLink",
  description: "Learn about FoxLink's GDPR compliance and how we protect your data rights. Understand our data processing practices and your privacy rights.",
  alternates: {
    canonical: "/gdpr",
  },
};

export const cookiesMetadata: Metadata = {
  title: "Cookie Policy - FoxLink",
  description: "Understand how FoxLink uses cookies to improve your experience. Learn about the types of cookies we use and how to manage them.",
  alternates: {
    canonical: "/cookies",
  },
}; 