"use client";
import React from "react";

/**
 * Terms and Conditions Page
 * Replace the placeholder text below with your actual terms.
 */
export default function TermsPage() {
  return (
    <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          The rules and guidelines for using our platform
        </p>
      </div>

      <p className="mb-4">
        <p className="text-gray-500 italic">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">1. Acceptance of Terms</h2>
        <p className="ml-4">
          By accessing and using LinkInBio, you accept and agree to be bound by
          the terms and provision of this agreement.
        </p>
        <p className="ml-4">
          If you do not agree to abide by the above, please do not use this
          service.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">2. Description of Service</h2>
        <p className="ml-4">
          LinkInBio provides a platform for users to create a personalized
          landing page with multiple links. The service allows users to
          customize their profile, add links, and track analytics related to
          link clicks.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">3. User Accounts</h2>
        <p className="ml-4">
          To access certain features of the platform, you may be required to
          register for an account. You agree to:
        </p>
        <ul className="ml-4">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account and password</li>
          <li>
            Accept responsibility for all activities that occur under your
            account
          </li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>

        <h2 className="text-xl font-bold mb-4 mt-4">4. Subscription Services</h2>
        <h3 className="text-lg font-bold">4.1 Subscription Plans</h3>
        <p className="ml-4">
          LinkInBio offers both free and premium subscription plans. Premium
          plans provide access to additional features and capabilities as
          outlined in our pricing page.
        </p>

        <h3 className="text-lg font-bold">4.2 Billing and Payment</h3>
        <p className="ml-4">
          By subscribing to a premium plan, you agree to pay all fees associated
          with your subscription. Fees are billed in advance on a monthly or
          annual basis, depending on your selected billing cycle. All payments
          are non-refundable except as required by law or as explicitly stated
          in our refund policy.
        </p>

        <h3 className="text-lg font-bold">4.3 Cancellation Policy</h3>
        <p className="ml-4">
          You may cancel your subscription at any time. Upon cancellation, you
          will continue to have access to premium features until the end of your
          current billing period. No refunds will be provided for partial months
          of service. To cancel your subscription, please follow the
          instructions in your account settings or contact our support team.
        </p>

        <h3 className="text-lg font-bold">4.4 Refund Policy</h3>
        <p className="ml-4">
          We offer a 14-day money-back guarantee for new subscribers. If you are
          not satisfied with our service, you may request a full refund within
          14 days of your initial subscription. Refunds will be processed within
          5-10 business days. After the 14-day period, refunds will only be
          provided in exceptional circumstances at our sole discretion.
        </p>

        <h3 className="text-lg font-bold">4.5 Subscription Changes</h3>
        <p className="ml-4">
          You may upgrade or downgrade your subscription plan at any time. When
          upgrading, you will be charged the prorated difference for the
          remainder of your billing cycle. When downgrading, the change will
          take effect at the start of your next billing cycle.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">5. User Content</h2>
        <p className="ml-4">
          You retain all rights to any content you submit, post, or display on
          or through the service. By submitting content, you grant us a
          worldwide, non-exclusive, royalty-free license to use, reproduce,
          modify, adapt, publish, and distribute such content.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">6. Prohibited Activities</h2>
        <p className="ml-4">You agree not to:</p>
        <ul className="ml-4">
          <li>Use the service for any illegal purpose</li>
          <li>Violate any laws in your jurisdiction</li>
          <li>
            Post content that is defamatory, obscene, or otherwise objectionable
          </li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the service or servers</li>
        </ul>

        <h2 className="text-xl font-bold mb-4 mt-4">7. Termination</h2>
        <p className="ml-4">
          We may terminate or suspend your account and bar access to the service
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of the Terms.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">8. Limitation of Liability</h2>
        <p className="ml-4">
          In no event shall LinkInBio, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from your access to or use of or
          inability to access or use the service.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">9. Changes to Terms</h2>
        <p className="ml-4">
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material, we will provide at least 30 days' notice prior
          to any new terms taking effect. What constitutes a material change
          will be determined at our sole discretion.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-4">10. Contact Us</h2>
        <p className="ml-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="ml-4">Email: legal@linkinbio.com</p>
      </p>
    </div>
  );
}
