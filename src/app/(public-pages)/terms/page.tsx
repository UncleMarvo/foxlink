"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FileText, CheckCircle, AlertTriangle, CreditCard, Users, Shield, Sparkles, Scale } from "lucide-react";

/**
 * Terms and Conditions Page
 * Replace the placeholder text below with your actual terms.
 */
export default function TermsPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const termsHighlights = [
    {
      icon: <Users className="h-6 w-6 text-brand-orange" />,
      title: "User Accounts",
      description: "Secure account creation and management"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-brand-blue" />,
      title: "Subscription Plans",
      description: "Clear billing and payment terms"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Content Guidelines",
      description: "Safe and appropriate content policies"
    },
    {
      icon: <Scale className="h-6 w-6 text-cyan-500" />,
      title: "Legal Protection",
      description: "Your rights and our responsibilities"
    }
  ];

  const keyPoints = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Accept Terms",
      description: "By using FoxLink, you agree to these terms"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
      title: "Account Security",
      description: "Keep your account credentials safe"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-500" />,
      title: "Content Ownership",
      description: "You retain rights to your content"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      title: "Prohibited Use",
      description: "No illegal or harmful activities"
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
                <FileText className="h-12 w-12 text-brand-orange mr-3" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">Terms of </span>
                  <span className="text-brand-orange">Service</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                The rules and guidelines for using our platform. We believe in clear, 
                fair terms that protect both you and us.
              </p>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Last Updated: 29/05/2025
            </div>
          </div>
        </div>

        {/* Terms Highlights */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Key Terms Overview</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's what you need to know about using FoxLink.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {termsHighlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </div>
              ))}
            </div>

            {/* Key Points Section */}
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 mr-3 drop-shadow-sm" />
                <h2 className="text-2xl font-bold drop-shadow-sm">Important Points</h2>
              </div>
              <p className="text-lg mb-6 opacity-95 drop-shadow-sm">
                These are the key things you need to know:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center">
                    <div className="drop-shadow-sm">{point.icon}</div>
                    <div className="ml-3">
                      <div className="font-semibold drop-shadow-sm">{point.title}</div>
                      <div className="text-sm opacity-95 drop-shadow-sm">{point.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">1. Acceptance of Terms</h2>
                  <p className="mb-4 text-gray-600">
                    By accessing and using FoxLink, you accept and agree to be bound by
                    the terms and provision of this agreement.
                  </p>
                  <p className="mb-4 text-gray-600">
                    If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">2. Description of Service</h2>
                  <p className="mb-4 text-gray-600">
                    FoxLink provides a platform for users to create a personalized
                    landing page with multiple links. The service allows users to
                    customize their profile, add links, and track analytics related to
                    link clicks.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">3. User Accounts</h2>
                  <p className="mb-4 text-gray-600">
                    To access certain features of the platform, you may be required to
                    register for an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account and password</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">4. Subscription Services</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Subscription Plans</h3>
                  <p className="mb-4 text-gray-600">
                    FoxLink offers both free and premium subscription plans. Premium
                    plans provide access to additional features and capabilities as
                    outlined in our pricing page.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Billing and Payment</h3>
                  <p className="mb-4 text-gray-600">
                    By subscribing to a premium plan, you agree to pay all fees associated
                    with your subscription. Fees are billed in advance on a monthly or
                    annual basis, depending on your selected billing cycle. All payments
                    are non-refundable except as required by law or as explicitly stated
                    in our refund policy.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Cancellation Policy</h3>
                  <p className="mb-4 text-gray-600">
                    You may cancel your subscription at any time. Upon cancellation, you
                    will continue to have access to premium features until the end of your
                    current billing period. No refunds will be provided for partial months
                    of service. To cancel your subscription, please follow the
                    instructions in your account settings or contact our support team.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Refund Policy</h3>
                  <p className="mb-4 text-gray-600">
                    We offer a 14-day money-back guarantee for new subscribers. If you are
                    not satisfied with our service, you may request a full refund within
                    14 days of your initial subscription. Refunds will be processed within
                    5-10 business days. After the 14-day period, refunds will only be
                    provided in exceptional circumstances at our sole discretion.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4.5 Subscription Changes</h3>
                  <p className="mb-4 text-gray-600">
                    You may upgrade or downgrade your subscription plan at any time. When
                    upgrading, you will be charged the prorated difference for the
                    remainder of your billing cycle. When downgrading, the change will
                    take effect at the start of your next billing cycle.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">5. User Content</h2>
                  <p className="mb-4 text-gray-600">
                    You retain all rights to any content you submit, post, or display on
                    or through the service. By submitting content, you grant us a
                    worldwide, non-exclusive, royalty-free license to use, reproduce,
                    modify, adapt, publish, and distribute such content.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">6. Prohibited Activities</h2>
                  <p className="mb-4 text-gray-600">You agree not to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>Use the service for any illegal purpose</li>
                    <li>Violate any laws in your jurisdiction</li>
                    <li>Post content that is defamatory, obscene, or otherwise objectionable</li>
                    <li>Impersonate any person or entity</li>
                    <li>Interfere with or disrupt the service or servers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">7. Termination</h2>
                  <p className="mb-4 text-gray-600">
                    We may terminate or suspend your account and bar access to the service
                    immediately, without prior notice or liability, under our sole
                    discretion, for any reason whatsoever and without limitation,
                    including but not limited to a breach of the Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">8. Limitation of Liability</h2>
                  <p className="mb-4 text-gray-600">
                    In no event shall FoxLink, nor its directors, employees, partners,
                    agents, suppliers, or affiliates, be liable for any indirect,
                    incidental, special, consequential or punitive damages, including
                    without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses, resulting from your access to or use of or
                    inability to access or use the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">9. Changes to Terms</h2>
                  <p className="mb-4 text-gray-600">
                    We reserve the right to modify or replace these Terms at any time. If
                    a revision is material, we will provide at least 30 days' notice prior
                    to any new terms taking effect. What constitutes a material change
                    will be determined at our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">10. Contact Us</h2>
                  <p className="mb-4 text-gray-600">
                    If you have any questions about these Terms, please 
                    <a href="/contact?subject=Terms" className="text-brand-orange hover:text-brand-blue transition-colors font-semibold ml-1">contact us</a>.
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
