"use client";
import React from "react";

export default function CookiesPage() {
  return (
    <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Cookies Policy</h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">How (and why) we use cookies</p>
      </div>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What are cookies?</h2>
          <p className="mb-4">
            Cookies are tiny text files that live in your browser. They help websites remember things about you—like keeping you logged in. Think of them as little sticky notes your browser uses to help you out.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">How we use cookies</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Staying logged in:</strong> We use cookies to remember who you are after you sign in, so you don't have to log in every time you visit.</li>
            <li><strong>Keeping things secure:</strong> Some cookies help protect your account from sneaky stuff (like CSRF attacks).</li>
            <li><strong>Understanding how our service is used:</strong> We use cookies to collect analytics about how people use our site (like which links are clicked or how many people view a profile). This helps us improve our service. All analytics data is stored and processed by us, and is <strong>not shared with third parties</strong>.</li>
          </ul>
          <p className="mb-4">That's it! We don't use cookies for ads, marketing, or to follow you around the internet. No third-party tracking cookies here.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Can I control cookies?</h2>
          <p className="mb-4">
            Absolutely! You can clear or block cookies in your browser settings any time. Just know that if you block our cookies, you might get logged out or some things might not work quite right.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="mb-4">
            If you have any questions about cookies (or just want to say hi), drop us a line at <a href="/contact?subject=Cookies" className="text-blue-600 hover:text-blue-800">contact us</a>.
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">Last updated: June 2025</p>
      </div>
    </div>
  );
} 