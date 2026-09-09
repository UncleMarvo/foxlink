"use client";
import ContactForm from "@/components/ContactForm";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
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

  const contactMethods: any[] = [];

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

        {/* Main content */}
        <main className="flex-1 bg-gradient-to-br from-white via-brand-orange/3 to-purple-500/3">
          {/* Hero Section */}
          <div className="relative overflow-hidden py-12 md:py-16">
            {/* Background decoration */}
            <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-gradient-to-br from-brand-orange/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute top-1/3 right-0 h-64 w-64 bg-gradient-to-br from-brand-orange/15 to-purple-500/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="container relative z-10 mx-auto px-4 text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
                  <span className="text-brand-blue">Get in </span>
                  <span className="text-brand-orange">Touch</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                  Have questions, feedback, or need help? We're here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-orange/10 to-purple-500/10 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-2xl font-semibold text-brand-blue">Send us a Message</h2>
                  <p className="text-gray-600 mt-1">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                <div className="p-6 md:p-8">
                  <ContactForm initialSubject={subject} />
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 mr-3 drop-shadow-sm" />
                    <h3 className="text-2xl font-bold drop-shadow-sm">We're Here to Help!</h3>
                  </div>
                  <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto drop-shadow-sm">
                    Whether you're just getting started with FoxLink or need help with advanced features, 
                    our support team is ready to assist you. We typically respond within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                      <span className="drop-shadow-sm">24/7 Email Support</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                      <span className="drop-shadow-sm">Quick Response Time</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                      <span className="drop-shadow-sm">Expert Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-4 text-center text-sm text-muted-foreground bg-white">
          <p>&copy; {new Date().getFullYear()} FoxLink. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
