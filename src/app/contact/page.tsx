"use client";
import ContactForm from "@/components/ContactForm";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

// Contact page: includes header with logo and back button, and a wider contact form
export default function ContactPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const subject = searchParams?.get("subject") || "";
  const router = useRouter();

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="flex min-h-screen flex-col">
        {/* Header Bar: matches Privacy Policy page */}
        <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FoxLink Logo"
                className="h-8 w-8 object-contain rounded-md"
                style={{ background: "white" }}
              />
              <span className="text-sm font-semibold">FoxLink</span>
              <span className="text-xs text-muted-foreground">(beta)</span>
            </div>
          </div>
          <ModeToggle />
        </header>
        {/* Main content card */}
        <main className="flex flex-1 p-4 md:p-8">
          <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-full space-y-6">


          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white p-8 space-y-6">
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                How to get in touch with us
              </p>

              {/* Contact form */}
              <ContactForm initialSubject={subject} />

            </div>
          </div>

          </div>
        </main>
        {/* Footer */}
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FoxLink. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
