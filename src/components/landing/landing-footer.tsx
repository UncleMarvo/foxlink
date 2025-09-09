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
