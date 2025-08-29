"use client";
import React, { useState } from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Zap, Instagram, Youtube, Twitter, Facebook, Linkedin, CheckCircle, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export default function IntegrationsPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Integrations', path: '/integrations' },
  ];

  const socialIntegrations = [
    {
      name: "Instagram",
      description: "Auto-update bio links when posts are published",
      icon: <Instagram className="h-8 w-8 text-pink-500" />,
      status: "Coming Soon"
    },
    {
      name: "YouTube",
      description: "Link to latest videos automatically",
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      status: "Planned"
    },
    {
      name: "Twitter/X",
      description: "Update bio links based on recent tweets",
      icon: <Twitter className="h-8 w-8 text-blue-400" />,
      status: "Planned"
    },
    {
      name: "Facebook",
      description: "Sync with Facebook page links",
      icon: <Facebook className="h-8 w-8 text-blue-600" />,
      status: "Planned"
    },
    {
      name: "LinkedIn",
      description: "Professional profile integration",
      icon: <Linkedin className="h-8 w-8 text-blue-700" />,
      status: "Planned"
    }
  ];

  const automationTools = [
    {
      name: "Zapier",
      description: "Connect to 5000+ apps and automate workflows",
      icon: "⚡",
      status: "Coming Soon",
      featured: true
    },
    {
      name: "IFTTT",
      description: "Create custom automation rules and recipes",
      icon: "🔗",
      status: "Planned"
    },
    {
      name: "Make.com",
      description: "Advanced workflow automation and integrations",
      icon: "⚙️",
      status: "Planned"
    },
    {
      name: "n8n",
      description: "Self-hosted automation for complete control",
      icon: "🚀",
      status: "Planned"
    }
  ];

  const contentIntegrations = [
    {
      name: "WordPress",
      description: "Auto-add new blog posts to your link page",
      icon: "📝",
      status: "Planned"
    },
    {
      name: "Shopify",
      description: "Link to latest products and collections",
      icon: "🛍️",
      status: "Planned"
    },
    {
      name: "Substack",
      description: "Auto-link to new newsletters and posts",
      icon: "📧",
      status: "Planned"
    },
    {
      name: "Medium",
      description: "Link to latest articles and stories",
      icon: "📰",
      status: "Planned"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real implementation, you'd send this to your backend
      console.log("Integrations interest signup:", email);
    }
  };

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
                <Zap className="h-12 w-12 text-brand-orange mr-3" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">Integrations</span>
                  <br />
                  <span className="text-brand-orange">& Automation</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Connect FoxLink with your favorite tools and automate your link management. 
                No coding required - just powerful integrations that work.
              </p>
            </div>

            {/* Beta Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Coming Soon - Join the Waitlist
            </div>
          </div>
        </div>

        {/* Zapier Integration - Featured */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4 drop-shadow-sm">⚡</div>
                <div>
                  <h2 className="text-3xl font-bold mb-2 drop-shadow-sm">Zapier Integration</h2>
                  <p className="text-lg opacity-95 drop-shadow-sm">Connect FoxLink to 5000+ apps and automate your workflows</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 drop-shadow-sm">Auto-Update Links</h3>
                  <p className="text-sm opacity-95 drop-shadow-sm">When you post on social media, automatically add that link to your FoxLink page</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 drop-shadow-sm">Track Engagement</h3>
                  <p className="text-sm opacity-95 drop-shadow-sm">Send link click data to your CRM, analytics tools, or notification systems</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 drop-shadow-sm">Sync Data</h3>
                  <p className="text-sm opacity-95 drop-shadow-sm">Keep your FoxLink profile in sync with your other platforms automatically</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold drop-shadow-sm">
                  Coming Soon - Join the waitlist below
                </span>
              </div>
            </div>

            {/* Social Media Integrations */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Social Media Integrations</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Automatically sync your FoxLink page with your social media activity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialIntegrations.map((integration, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      {integration.icon}
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        {integration.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{integration.name}</h3>
                    <p className="text-gray-600">{integration.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation Tools */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Automation Tools</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Connect FoxLink with your favorite automation platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {automationTools.map((tool, index) => (
                  <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 ${tool.featured ? 'ring-2 ring-brand-orange' : ''}`}>
                    <div className="text-4xl mb-4">{tool.icon}</div>
                    <div className="flex items-center justify-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                      {tool.featured && <Sparkles className="h-4 w-4 text-brand-orange ml-2" />}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Platform Integrations */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Content Platform Integrations</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Automatically add your latest content to your FoxLink page.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contentIntegrations.map((platform, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">{platform.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{platform.description}</p>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                      {platform.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-blue mb-4">Why Integrations Matter</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Automate your link management and focus on creating great content instead of manual updates.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">⏰</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
                  <p className="text-gray-600 text-sm">Automate repetitive tasks and focus on what matters most</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-4">🔄</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-gray-600 text-sm">Your FoxLink page automatically reflects your latest content</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Insights</h3>
                  <p className="text-gray-600 text-sm">Connect analytics and track performance across platforms</p>
                </div>
              </div>
            </div>

            {/* Waitlist Signup */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-blue mb-4">Get Early Access</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Be among the first to know when our integrations launch. We'll notify you about early access, tutorials, and special automation templates.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex space-x-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <p className="text-green-800">Thanks! We'll notify you when integrations launch.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
