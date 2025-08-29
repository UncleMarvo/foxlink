import { Metadata } from "next";

export const landingMetadata: Metadata = {
  title: "FoxLink - One Link to Share All Your Content",
  description: "Create a stunning, customizable page that showcases your links, social profiles, and content in one place. Share a single link in your bio to connect your audience to everything you do.",
  keywords: [
    "bio link",
    "link in bio",
    "social media links",
    "creator tools",
    "content creator",
    "social media management",
    "link page",
    "social links",
    "creator platform",
    "social media bio"
  ],
  authors: [{ name: "FoxLink Team" }],
  creator: "FoxLink",
  publisher: "FoxLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FoxLink - One Link to Share All Your Content",
    description: "Create a stunning, customizable page that showcases your links, social profiles, and content in one place. Share a single link in your bio to connect your audience to everything you do.",
    url: "/",
    siteName: "FoxLink",
    images: [
      {
        url: "/logo_lg.png",
        width: 1200,
        height: 630,
        alt: "FoxLink - One Link to Share All Your Content",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoxLink - One Link to Share All Your Content",
    description: "Create a stunning, customizable page that showcases your links, social profiles, and content in one place. Share a single link in your bio to connect your audience to everything you do.",
    images: ["/logo_lg.png"],
    creator: "@foxlink",
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