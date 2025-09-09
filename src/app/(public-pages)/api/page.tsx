"use client";
import React, { useState } from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Code, Zap, Webhook, Database, BarChart3, Settings, Sparkles, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function APIPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'API', path: '/api' },
  ];

  const apiFeatures = [
    {
      icon: <Webhook className="h-6 w-6 text-brand-orange" />,
      title: "Webhooks",
      description: "Real-time notifications when links are clicked or profiles are updated",
      status: "Coming Soon"
    },
    {
      icon: <Database className="h-6 w-6 text-brand-blue" />,
      title: "Link Management",
      description: "Create, update, and delete links programmatically",
      status: "Planned"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Analytics API",
      description: "Retrieve click statistics and engagement data",
      status: "Planned"
    },
    {
      icon: <Settings className="h-6 w-6 text-cyan-500" />,
      title: "Profile Management",
      description: "Update profile information and themes via API",
      status: "Planned"
    }
  ];

  const useCases = [
    {
      title: "Social Media Managers",
      description: "Bulk update links across multiple client profiles",
      icon: "👥"
    },
    {
      title: "Content Creators",
      description: "Automatically update links when new content is published",
      icon: "🎬"
    },
    {
      title: "Agencies",
      description: "Manage multiple client accounts through a single interface",
      icon: "🏢"
    },
    {
      title: "Developers",
      description: "Integrate FoxLink into custom applications and workflows",
      icon: "⚡"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            topic: 'api'
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);
        } else {
          // Handle error (e.g., already signed up)
          console.error('Waitlist signup failed:', data.error);
          // You could show an error message to the user here
        }
      } catch (error) {
        console.error('Failed to submit to waitlist:', error);
        // You could show an error message to the user here
      }
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
                <Code className="h-12 w-12 text-brand-orange mr-3" />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">FoxLink</span>
                  <br />
                  <span className="text-brand-orange">API</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Automate your link management and integrate FoxLink into your workflows. 
                Start with webhooks, expand with our full API.
              </p>
            </div>

            {/* Beta Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Coming Soon - Join the Waitlist
            </div>
          </div>
        </div>

        {/* API Features */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">API Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our API will provide powerful tools to automate and integrate FoxLink into your existing workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {apiFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Perfect For</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you're a developer, content creator, or agency, our API will help you work smarter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 text-sm">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Webhook-First Approach */}
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-white mb-16 shadow-xl">
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 mr-3 drop-shadow-sm" />
                <h2 className="text-2xl font-bold drop-shadow-sm">Webhook-First Approach</h2>
              </div>
              <p className="text-lg mb-6 opacity-95 drop-shadow-sm">
                We're starting with webhooks because they're simple, powerful, and work with tools you already use like Zapier, IFTTT, and Make.com.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                  <span className="drop-shadow-sm">No authentication required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                  <span className="drop-shadow-sm">Works with Zapier & IFTTT</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 drop-shadow-sm" />
                  <span className="drop-shadow-sm">Real-time notifications</span>
                </div>
              </div>
            </div>

            {/* Waitlist Signup */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-blue mb-4">Get Early Access</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Be among the first to know when our API launches. We'll notify you about early access, documentation, and special developer resources.
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
                    <p className="text-green-800">Thanks! We'll notify you when the API launches.</p>
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
