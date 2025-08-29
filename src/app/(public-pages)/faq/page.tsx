"use client";
import React, { useState, useMemo } from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/app/components/FaqJsonLd";
import { Search, ChevronDown, ChevronUp, HelpCircle, DollarSign, Settings, BarChart3, Smartphone, Link, Crown, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // Start with first item expanded

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What is FoxLink?",
      answer: "FoxLink is a link in bio platform that helps you create a customizable page to showcase all your important links in one place. It's perfect for creators, influencers, and anyone who wants to share multiple links through a single URL.",
      category: "Getting Started",
      icon: <HelpCircle className="h-5 w-5 text-brand-orange" />
    },
    {
      question: "How much does FoxLink cost?",
      answer: "FoxLink offers a free plan with basic features and a Premium plan at $3.99/month or $39.99/year. The Premium plan includes unlimited links, advanced analytics, custom themes, and the ability to remove FoxLink branding.",
      category: "Pricing",
      icon: <DollarSign className="h-5 w-5 text-brand-blue" />
    },
    {
      question: "How do I get started with FoxLink?",
      answer: "Getting started is easy! Simply sign up for a free account, customize your profile, and start adding your links. You can then share your unique FoxLink URL in your social media bios and anywhere else you want to direct your audience.",
      category: "Getting Started",
      icon: <Sparkles className="h-5 w-5 text-purple-500" />
    },
    {
      question: "Can I customize my FoxLink page?",
      answer: "Yes! FoxLink offers various customization options including custom themes, colors, and layouts. Premium users get access to advanced customization features and can remove FoxLink branding.",
      category: "Features",
      icon: <Settings className="h-5 w-5 text-cyan-500" />
    },
    {
      question: "What kind of analytics does FoxLink provide?",
      answer: "FoxLink provides detailed analytics including click counts, view statistics, and engagement metrics. Premium users get access to advanced analytics features to better understand their audience's behavior.",
      category: "Features",
      icon: <BarChart3 className="h-5 w-5 text-emerald-500" />
    },
    {
      question: "Is FoxLink mobile-friendly?",
      answer: "Yes! FoxLink pages are fully responsive and optimized for all devices, including mobile phones, tablets, and desktop computers. Your links will look great no matter how your audience views them.",
      category: "Features",
      icon: <Smartphone className="h-5 w-5 text-amber-500" />
    },
    {
      question: "Can I change my FoxLink URL?",
      answer: "Yes, you can customize your FoxLink URL to match your brand or personal name. This helps make your link more memorable and professional.",
      category: "Getting Started",
      icon: <Link className="h-5 w-5 text-brand-orange" />
    },
    {
      question: "How do I upgrade to Premium?",
      answer: "You can upgrade to Premium at any time from your dashboard. Simply click the 'Upgrade' button and follow the payment process. We accept all major credit cards and PayPal.",
      category: "Pricing",
      icon: <Crown className="h-5 w-5 text-purple-500" />
    }
  ];

  // Filter FAQ items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return faqItems;
    return faqItems.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: FAQItem[] } = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={faqItems.map(item => ({ question: item.question, answer: item.answer }))} />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-brand-orange/3 to-purple-500/3">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-12 md:py-16">
          {/* Background decoration */}
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-gradient-to-br from-brand-orange/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 right-0 h-64 w-64 bg-gradient-to-br from-brand-orange/15 to-purple-500/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
                <span className="text-brand-blue">Frequently Asked</span>
                <br />
                <span className="text-brand-orange">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                Find answers to common questions about FoxLink and get the most out of your link in bio page.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 pb-16">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all questions below.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-orange/10 to-purple-500/10 px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-brand-blue">{category}</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {items.map((item, index) => {
                      const globalIndex = faqItems.findIndex(faq => faq.question === item.question);
                      const isExpanded = expandedItems.has(globalIndex);
                      
                      return (
                        <div key={index} className="transition-all duration-200 hover:bg-gray-50">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-inset"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-brand-orange" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="px-6 pb-4">
                              <div className="pl-8">
                                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-lg mb-6 opacity-90">
                Can't find what you're looking for? Our team is here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 