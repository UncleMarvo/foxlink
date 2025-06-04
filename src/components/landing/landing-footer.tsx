import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              {/* Replaced text-based logo with fox logo image - now 25% larger for better visibility */}
              <img
                src="/logo.png"
                alt="FoxLink Logo"
                className="h-10 w-10 object-contain rounded-md"
                style={{ background: 'white' }}
              />
              <span className="text-lg font-semibold">FoxLink</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">The easiest way to share all your content with a single link.</p>
            <div className="mt-6 flex space-x-4">
              {/*
                Social media links are commented out because there is currently no social media presence.
                Uncomment and update the hrefs when accounts are created.
              */}
              {/**
              <Link href="#" className="text-gray-500 transition-colors hover:text-indigo-600" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 transition-colors hover:text-indigo-600" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 transition-colors hover:text-indigo-600" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 transition-colors hover:text-indigo-600" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              */}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-gray-600 hover:text-indigo-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-gray-600 hover:text-indigo-600">
                  Pricing
                </Link>
              </li>
              <li>
                {/*
                  'Testimonials' link is commented out because the page does not exist yet.
                  Uncomment when the page is created.
                */}
                {/**
                <Link href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                  Testimonials
                </Link>
                */}
              </li>
              <li>
                {/*
                  'FAQ' link is commented out because the page does not exist yet.
                  Uncomment when the page is created.
                */}
                {/**
                <Link href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                  FAQ
                </Link>
                */}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-indigo-600">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-sm text-gray-600 hover:text-indigo-600">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FoxLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
