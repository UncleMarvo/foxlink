import "./globals.css";
import { ThemeProvider as NextThemesProvider} from "@/components/providers/theme-provider";
import { ThemeProvider as CustomThemeProvider } from "@/app/context/ThemeContext";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import { JsonLd } from "@/components/JsonLd";
import { WebSiteJsonLd } from "@/components/WebSiteJsonLd";
import { Organization } from "@/utils/jsonld";
import { Viewport } from "next";

// Base URL for the application
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: "FoxLink",
  description: "Create your personalized link in bio page with FoxLink. Share all your important links in one place.",
  metadataBase: new URL(baseUrl),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'FoxLink',
    title: 'FoxLink - Your Personal Link in Bio',
    description: 'Create your personalized link in bio page with FoxLink. Share all your important links in one place.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'FoxLink - Your Personal Link in Bio',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'FoxLink - Your Personal Link in Bio',
    description: 'Create your personalized link in bio page with FoxLink. Share all your important links in one place.',
    images: [`${baseUrl}/og-image.png`],
    creator: '@foxlink',
    site: '@foxlink',
  },

  // Additional meta tags
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  alternates: {
    canonical: baseUrl,
  },
};

// Organization data for JSON-LD
const organizationData: Organization = {
  '@type': 'Organization',
  '@context': 'https://schema.org',
  name: 'FoxLink',
  url: baseUrl,
  logo: `${baseUrl}/logo_lg.png`,
  sameAs: [
    'https://twitter.com/foxlink',
    'https://github.com/foxlink',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationData} type="Organization" />
        <WebSiteJsonLd
          name="FoxLink"
          url={baseUrl}
          description="Create your personalized link in bio page with FoxLink. Share all your important links in one place."
        />
      </head>
      <body className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <Toaster />
        <AuthProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CustomThemeProvider>
              <ModalProvider />
              {children}
            </CustomThemeProvider>
          </NextThemesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
