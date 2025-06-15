"use client";
import React from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export default function FAQPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
        {/* Rest of your FAQ content */}
      </div>
    </>
  );
} 