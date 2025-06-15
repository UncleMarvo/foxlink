"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md" role="banner">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <img
              src="/logo.png"
              alt="FoxLink Logo"
              className="h-10 w-10 object-contain rounded-md"
              style={{ background: 'white' }}
            />
            <span className="text-lg font-semibold">FoxLink</span>
            <span className="text-xs text-muted-foreground">(beta)</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main menu">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {isLoggedIn ? (
            <Button
              variant="default"
              className="text-white bg-indigo-600 hover:bg-indigo-400"
              asChild
            >
              <Link href="/dashboard" aria-label="Go to dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                className="text-white bg-indigo-600 hover:bg-indigo-400"
                asChild
              >
                <Link href="/auth/signin" aria-label="Log in to your account">Log in</Link>
              </Button>
              <Button
                variant="outline"
                className="border-gray-500 bg-gray-100 text-indigo-600 hover:bg-white/10"
                asChild
              >
                <Link href="/auth/register" aria-label="Create a new account">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu" role="navigation" aria-label="Mobile menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#features"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <div className="mt-4 space-y-2">
              {isLoggedIn ? (
                <Button variant="default" asChild>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} aria-label="Go to dashboard">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="default" asChild>
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} aria-label="Log in to your account">
                      Log in
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Create a new account"
                    >
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
