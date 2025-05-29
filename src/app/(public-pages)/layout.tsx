import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-purple-600">
              <span className="text-xs font-bold text-white">LB</span>
            </div>
            <span className="text-sm font-semibold">FoxLink</span>
          </div>
        </div>
        <ModeToggle />
      </header>
      <main className="flex flex-1 p-4 md:p-8">
        <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-full space-y-6">{children}</div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FoxLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
