"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Cookie, Shield, Settings, Eye, Sparkles, CheckCircle, Info } from "lucide-react";

export default function CookiesPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6 text-brand-orange" />,
      title: "Security Cookies",
      description: "Keep your account safe and secure"
    },
    {
      icon: <Settings className="h-6 w-6 text-brand-blue" />,
      title: "Session Cookies",
      description: "Remember you're logged in"
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-500" />,
      title: "Analytics Cookies",
      description: "Help us improve our service"
    },
    {
      icon: <Cookie className="h-6 w-6 text-cyan-500" />,
      title: "Preference Cookies",
      description: "Remember your settings"
    }
  ];

  const cookieBenefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Stay Logged In",
      description: "No need to sign in every time"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
      title: "Enhanced Security",
      description: "Protect against unauthorized access"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-500" />,
      title: "Better Experience",
      description: "Personalized and optimized service"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-cyan-500" />,
      title: "No Tracking",
      description: "We don't track you across sites"
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-brand-orange/3 to-purple-500/3">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-12 md:py-16">
          {/* Background decoration */}
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-gradient-to-br from-brand-orange/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 right-0 h-64 w-64 bg-gradient-to-br from-brand-orange/15 to-purple-500/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Cookie className="h-12 w-12 text-brand-orange mr-3" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">Cookie </span>
                  <span className="text-brand-orange">Policy</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                How (and why) we use cookies. We're transparent about our cookie usage 
                and committed to your privacy.
              </p>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Last Updated: June 2025
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Types of Cookies We Use</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We use cookies responsibly to improve your experience and keep your account secure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>
              ))}
            </div>

            {/* Cookie Benefits */}
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <Info className="h-8 w-8 mr-3 drop-shadow-sm" />
                <h2 className="text-2xl font-bold drop-shadow-sm">Why We Use Cookies</h2>
              </div>
              <p className="text-lg mb-6 opacity-95 drop-shadow-sm">
                Cookies help us provide a better experience while respecting your privacy:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cookieBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="drop-shadow-sm">{benefit.icon}</div>
                    <div className="ml-3">
                      <div className="font-semibold drop-shadow-sm">{benefit.title}</div>
                      <div className="text-sm opacity-95 drop-shadow-sm">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">What are cookies?</h2>
                  <p className="mb-4 text-gray-600">
                    Cookies are tiny text files that live in your browser. They help websites remember things about you—like keeping you logged in. Think of them as little sticky notes your browser uses to help you out.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">How we use cookies</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Staying logged in:</strong> We use cookies to remember who you are after you sign in, so you don't have to log in every time you visit.</li>
                    <li><strong>Keeping things secure:</strong> Some cookies help protect your account from sneaky stuff (like CSRF attacks).</li>
                    <li><strong>Understanding how our service is used:</strong> We use cookies to collect analytics about how people use our site (like which links are clicked or how many people view a profile). This helps us improve our service. All analytics data is stored and processed by us, and is <strong>not shared with third parties</strong>.</li>
                  </ul>
                  <p className="mb-4 text-gray-600">That's it! We don't use cookies for ads, marketing, or to follow you around the internet. No third-party tracking cookies here.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">Can I control cookies?</h2>
                  <p className="mb-4 text-gray-600">
                    Absolutely! You can clear or block cookies in your browser settings any time. Just know that if you block our cookies, you might get logged out or some things might not work quite right.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">Questions?</h2>
                  <p className="mb-4 text-gray-600">
                    If you have any questions about cookies (or just want to say hi), 
                    <a href="/contact?subject=Cookies" className="text-brand-orange hover:text-brand-blue transition-colors font-semibold ml-1">drop us a line</a>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 