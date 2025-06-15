import "./globals.css";
import { ThemeProvider as NextThemesProvider} from "@/components/providers/theme-provider";
import { ThemeProvider as CustomThemeProvider } from "@/app/context/ThemeContext";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import { JsonLd } from "@/components/JsonLd";
import { WebSiteJsonLd } from "@/components/WebSiteJsonLd";
import { Organization } from "@/utils/jsonld";

export const metadata = {
  title: "FoxLink",
  description: "Link In Bio Initial Version",
};

// Organization data for JSON-LD
const organizationData: Organization = {
  '@type': 'Organization',
  '@context': 'https://schema.org',
  name: 'FoxLink',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio',
  logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio'}/logo_lg.png`,
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxlink.bio';

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
