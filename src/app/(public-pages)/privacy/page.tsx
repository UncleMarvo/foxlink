"use client";
import React from "react";

/**
 * Privacy Page
 * Replace the placeholder text below with your actual privacy policy.
 */
export default function PrivacyPage() {
  return (
    <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          How we collect, use, and protect your data
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Information:</strong> Email address, username, and password when you register.</li>
            <li><strong>Profile Information:</strong> Avatar images and social media handles that you choose to provide.</li>
            <li><strong>Usage Data:</strong> Analytics including page views, link clicks, geographic location (country/region), and referrer information.</li>
            <li><strong>Payment Information:</strong> When you upgrade to premium, payment details are processed securely through Stripe. We store only your subscription status and Stripe Customer ID.</li>
            <li><strong>Technical Information:</strong> IP addresses, browser type, device information, and cookies for analytics and service improvement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To process your payments and manage your subscription</li>
            <li>To analyze usage patterns and improve our service</li>
            <li>To communicate with you about your account or our services</li>
            <li>To prevent fraud and ensure security</li>
            <li>To provide analytics about your link performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Third Parties</h2>
          <p className="mb-4">We share data with the following third parties:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Stripe:</strong> For processing payments and managing subscriptions. Stripe processes and stores payment information according to PCI DSS standards.</li>
            <li><strong>Cloud Service Providers:</strong> For secure storage of user content (such as profile images), hosting, and email delivery.</li>
            <li><strong>Authentication and Database:</strong> Your account and application data are stored securely and authentication is handled using industry-standard methods.</li>
          </ul>
          <p className="mb-4">All providers are reputable and bound by strict data protection agreements. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Export your data</li>
            <li>Update or correct your information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Secure password hashing</li>
            <li>Limited employee access to personal data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="/contact?subject=Privacy" className="text-blue-600 hover:text-blue-800">contact us</a>
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-8">Last updated: June 2025</p>
      </div>
    </div>
  );
} 