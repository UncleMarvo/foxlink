import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="bg-gradient-to-br from-brand-blue via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="FoxLink" className="h-8 w-8" />
              <span className="text-xl font-bold">FoxLink</span>
            </div>
            <p className="text-slate-200 mb-4 max-w-md">
              Create a beautiful, customizable page that showcases all your important links in one place. 
              Perfect for creators, influencers, and anyone who wants to share their content effectively.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/FoxLink_Bio" target="_blank" className="text-slate-300 transition-colors hover:text-brand-orange" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>

              {/*
              <Link href="#" className="text-slate-300 transition-colors hover:text-brand-orange" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-300 transition-colors hover:text-brand-orange" aria-label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-300 transition-colors hover:text-brand-orange" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link> 
              */}

            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-300 mb-4 md:mb-0">
            © 2026 FoxLink. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
              Cookie Policy
            </Link>
            <Link href="/gdpr" className="text-sm text-slate-200 hover:text-brand-orange transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
