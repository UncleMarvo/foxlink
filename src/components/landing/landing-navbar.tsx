"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-brand-blue/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="FoxLink" className="h-8 w-8" />
            <span className="text-xl font-bold text-brand-blue">FoxLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors duration-300"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors duration-300"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground hover:text-brand-orange transition-colors duration-300"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
              asChild
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-accent-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/auth/register">Try for free</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border-brand-blue/20 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-brand-blue/10 shadow-lg">
              <Link
                href="#features"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 pb-2 border-t border-brand-blue/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mb-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-accent-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Try for free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
