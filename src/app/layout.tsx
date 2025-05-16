import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "LinkInBio",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
