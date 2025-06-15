"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/app/components/FaqJsonLd";

export default function FAQPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  const faqItems = [
    {
      question: "What is FoxLink?",
      answer: "FoxLink is a link in bio platform that helps you create a customizable page to showcase all your important links in one place. It's perfect for creators, influencers, and anyone who wants to share multiple links through a single URL."
    },
    {
      question: "How much does FoxLink cost?",
      answer: "FoxLink offers a free plan with basic features and a Premium plan at $3.99/month or $39.99/year. The Premium plan includes unlimited links, advanced analytics, custom themes, and the ability to remove FoxLink branding."
    },
    {
      question: "How do I get started with FoxLink?",
      answer: "Getting started is easy! Simply sign up for a free account, customize your profile, and start adding your links. You can then share your unique FoxLink URL in your social media bios and anywhere else you want to direct your audience."
    },
    {
      question: "Can I customize my FoxLink page?",
      answer: "Yes! FoxLink offers various customization options including custom themes, colors, and layouts. Premium users get access to advanced customization features and can remove FoxLink branding."
    },
    {
      question: "What kind of analytics does FoxLink provide?",
      answer: "FoxLink provides detailed analytics including click counts, view statistics, and engagement metrics. Premium users get access to advanced analytics features to better understand their audience's behavior."
    },
    {
      question: "Is FoxLink mobile-friendly?",
      answer: "Yes! FoxLink pages are fully responsive and optimized for all devices, including mobile phones, tablets, and desktop computers. Your links will look great no matter how your audience views them."
    },
    {
      question: "Can I change my FoxLink URL?",
      answer: "Yes, you can customize your FoxLink URL to match your brand or personal name. This helps make your link more memorable and professional."
    },
    {
      question: "How do I upgrade to Premium?",
      answer: "You can upgrade to Premium at any time from your dashboard. Simply click the 'Upgrade' button and follow the payment process. We accept all major credit cards and PayPal."
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={faqItems} />
      <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">Find answers to common questions about FoxLink</p>
        </div>
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h2>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 