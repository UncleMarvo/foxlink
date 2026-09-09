"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Shield, Lock, Eye, Download, Trash2, Mail, Sparkles, CheckCircle } from "lucide-react";

/**
 * Privacy Page
 * Replace the placeholder text below with your actual privacy policy.
 */
export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const privacyFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-brand-orange" />,
      title: "Data Protection",
      description: "Your data is encrypted and protected with industry-standard security measures"
    },
    {
      icon: <Lock className="h-6 w-6 text-brand-blue" />,
      title: "Secure Storage",
      description: "All personal information is stored securely with limited access"
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-500" />,
      title: "Transparency",
      description: "We're clear about what data we collect and how we use it"
    },
    {
      icon: <Download className="h-6 w-6 text-cyan-500" />,
      title: "Data Export",
      description: "You can export your data anytime through your account settings"
    }
  ];

  const userRights = [
    {
      icon: <Eye className="h-5 w-5 text-green-500" />,
      title: "Access",
      description: "View all data we have about you"
    },
    {
      icon: <Download className="h-5 w-5 text-blue-500" />,
      title: "Export",
      description: "Download your data in standard formats"
    },
    {
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      title: "Update",
      description: "Correct or update your information"
    },
    {
      icon: <Trash2 className="h-5 w-5 text-red-500" />,
      title: "Delete",
      description: "Remove your account and all associated data"
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
                <Shield className="h-12 w-12 text-brand-orange mr-3" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">Privacy </span>
                  <span className="text-brand-orange">Policy</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                How we collect, use, and protect your data. We're committed to transparency 
                and keeping your information safe and secure.
              </p>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Last Updated: June 2026
            </div>
          </div>
        </div>

        {/* Privacy Features */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Privacy Commitment</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe your privacy is fundamental. Here's how we protect your data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {privacyFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Your Rights Section */}
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 mr-3 drop-shadow-sm" />
                <h2 className="text-2xl font-bold drop-shadow-sm">Your Rights</h2>
              </div>
              <p className="text-lg mb-6 opacity-95 drop-shadow-sm">
                You have complete control over your data. Here are your rights:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userRights.map((right, index) => (
                  <div key={index} className="flex items-center">
                    <div className="drop-shadow-sm">{right.icon}</div>
                    <div className="ml-3">
                      <div className="font-semibold drop-shadow-sm">{right.title}</div>
                      <div className="text-sm opacity-95 drop-shadow-sm">{right.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">1. Information We Collect</h2>
                  <p className="mb-4 text-gray-600">We collect the following types of information:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Account Information:</strong> Email address, username, and password when you register.</li>
                    <li><strong>Profile Information:</strong> Avatar images and social media handles that you choose to provide.</li>
                    <li><strong>Usage Data:</strong> Analytics including page views, link clicks, geographic location (country/region), and referrer information.</li>
                    <li><strong>Payment Information:</strong> When you upgrade to premium, payment details are processed securely through Stripe. We store only your subscription status and Stripe Customer ID.</li>
                    <li><strong>Technical Information:</strong> IP addresses, browser type, device information, and cookies for analytics and service improvement.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">2. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>To provide and maintain our service</li>
                    <li>To process your payments and manage your subscription</li>
                    <li>To analyze usage patterns and improve our service</li>
                    <li>To communicate with you about your account or our services</li>
                    <li>To prevent fraud and ensure security</li>
                    <li>To provide analytics about your link performance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">3. Data Sharing and Third Parties</h2>
                  <p className="mb-4 text-gray-600">We share data with the following third parties:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Stripe:</strong> For processing payments and managing subscriptions. Stripe processes and stores payment information according to PCI DSS standards.</li>
                    <li><strong>Cloud Service Providers:</strong> For secure storage of user content (such as profile images), hosting, and email delivery.</li>
                    <li><strong>Authentication and Database:</strong> Your account and application data are stored securely and authentication is handled using industry-standard methods.</li>
                  </ul>
                  <p className="mb-4 text-gray-600">All providers are reputable and bound by strict data protection agreements. We do not sell your personal information to third parties.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">4. Data Security</h2>
                  <p className="mb-4 text-gray-600">
                    We implement appropriate security measures to protect your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments</li>
                    <li>Secure password hashing</li>
                    <li>Limited employee access to personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">5. Contact Us</h2>
                  <p className="mb-4 text-gray-600">
                    If you have any questions about this Privacy Policy, please 
                    <a href="/contact?subject=Privacy" className="text-brand-orange hover:text-brand-blue transition-colors font-semibold ml-1">contact us</a>.
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