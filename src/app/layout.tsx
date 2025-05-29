import "./globals.css";
import { ThemeProvider as NextThemesProvider} from "@/components/providers/theme-provider";
import { ThemeProvider as CustomThemeProvider } from "@/app/context/ThemeContext";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "FoxLink",
  description: "Link In Bio Initial Version",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
