"use client";
import React from "react";

/**
 * Terms and Conditions Page
 * Replace the placeholder text below with your actual terms.
 */
export default function TermsPage() {
  return (
    <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded shadow mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        {/* TODO: Replace this placeholder with your real terms and conditions. */}
        By using this service, you agree to the following terms and conditions. Please read them carefully before registering or using the site.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>This is a sample clause. Add your own legal text here.</li>
        <li>Your use of the service is at your own risk.</li>
        <li>We reserve the right to update these terms at any time.</li>
        <li>For questions, contact support@example.com.</li>
      </ul>
      <p className="text-gray-500 text-sm">Last updated: June 2024</p>
    </div>
  );
} 