"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Shield, Eye, Download, Trash2, Clock, Lock, Sparkles, CheckCircle, UserCheck } from "lucide-react";

export default function GDPRPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'GDPR', path: '/gdpr' },
  ];

  const gdprRights = [
    {
      icon: <Eye className="h-6 w-6 text-brand-orange" />,
      title: "Right to Access",
      description: "See all data we have about you"
    },
    {
      icon: <Download className="h-6 w-6 text-brand-blue" />,
      title: "Right to Portability",
      description: "Download your data anytime"
    },
    {
      icon: <UserCheck className="h-6 w-6 text-purple-500" />,
      title: "Right to Rectification",
      description: "Update or correct your information"
    },
    {
      icon: <Trash2 className="h-6 w-6 text-cyan-500" />,
      title: "Right to Erasure",
      description: "Delete your account and data"
    }
  ];

  const dataProtection = [
    {
      icon: <Lock className="h-5 w-5 text-green-500" />,
      title: "Encrypted Storage",
      description: "All data is encrypted at rest and in transit"
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      title: "Limited Access",
      description: "Only authorized personnel can access your data"
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      title: "Data Retention",
      description: "We only keep data as long as necessary"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-cyan-500" />,
      title: "Regular Audits",
      description: "We regularly review our security practices"
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
                  <span className="text-brand-blue">Your Data & </span>
                  <span className="text-brand-orange">GDPR</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                How we look after your info (and your rights!). We're committed to 
                protecting your data and respecting your privacy under GDPR.
              </p>
            </div>

            {/* Last Updated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Last Updated: June 2026
            </div>
          </div>
        </div>

        {/* GDPR Rights */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Your GDPR Rights</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You're the boss of your data! Here are your rights under GDPR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {gdprRights.map((right, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {right.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{right.title}</h3>
                  <p className="text-gray-600 text-sm">{right.description}</p>
                </div>
              ))}
            </div>

            {/* Data Protection */}
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 mr-3 drop-shadow-sm" />
                <h2 className="text-2xl font-bold drop-shadow-sm">How We Protect Your Data</h2>
              </div>
              <p className="text-lg mb-6 opacity-95 drop-shadow-sm">
                We use strong security measures to keep your information safe:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dataProtection.map((protection, index) => (
                  <div key={index} className="flex items-center">
                    <div className="drop-shadow-sm">{protection.icon}</div>
                    <div className="ml-3">
                      <div className="font-semibold drop-shadow-sm">{protection.title}</div>
                      <div className="text-sm opacity-95 drop-shadow-sm">{protection.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">What data do we collect?</h2>
                  <p className="mb-4 text-gray-600">
                    We collect just enough info to make your account work and keep things running smoothly. This includes your email, username, password (safely scrambled), profile details (like your avatar), and any links you add. We also keep track of things like logins and link clicks to help you see your stats and keep your account secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">Why do we collect it?</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>To create and manage your account</li>
                    <li>To show you your analytics and stats</li>
                    <li>To keep your account safe and secure</li>
                    <li>To process payments if you go premium (handled by Stripe)</li>
                    <li>To send you important emails (like password resets)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">Your rights under GDPR</h2>
                  <p className="mb-4 text-gray-600">You're the boss of your data! Here's what you can do:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>See your data:</strong> Ask us for a copy of the info we have about you.</li>
                    <li><strong>Fix your data:</strong> Update your info any time in your profile settings.</li>
                    <li><strong>Take your data:</strong> Download your data if you want to use it elsewhere.</li>
                    <li><strong>Delete your data:</strong> Delete your account and we'll erase your info (unless we need to keep it for legal reasons).</li>
                    <li><strong>"No thanks":</strong> Object to certain uses of your data or ask us to stop using it.</li>
                    <li><strong>Change your mind:</strong> Withdraw consent for things you agreed to before.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">How long do we keep your data?</h2>
                  <p className="mb-4 text-gray-600">
                    We keep your info only as long as you have an account (or as long as the law says we have to). If you delete your account, we'll remove your data as soon as we can.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">How do we protect your data?</h2>
                  <p className="mb-4 text-gray-600">
                    We use strong security measures to keep your info safe—like encryption, secure passwords, and limiting who can see your data. We're always working to keep things secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-brand-blue mb-4">Questions or requests?</h2>
                  <p className="mb-4 text-gray-600">
                    If you want to use any of your rights, or just have a question about your data, 
                    <a href="/contact?subject=GDPR" className="text-brand-orange hover:text-brand-blue transition-colors font-semibold ml-1">email us</a>. We're here to help!
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