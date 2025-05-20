"use client";
import React from "react";

export default function GDPRPage() {
  return (
    <div className="w-full p-8 bg-white rounded shadow mt-8 mb-8 border border-gray-300">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Data & GDPR</h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">How we look after your info (and your rights!)</p>
      </div>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What data do we collect?</h2>
          <p className="mb-4">
            We collect just enough info to make your account work and keep things running smoothly. This includes your email, username, password (safely scrambled), profile details (like your avatar), and any links you add. We also keep track of things like logins and link clicks to help you see your stats and keep your account secure.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why do we collect it?</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To create and manage your account</li>
            <li>To show you your analytics and stats</li>
            <li>To keep your account safe and secure</li>
            <li>To process payments if you go premium (handled by Stripe)</li>
            <li>To send you important emails (like password resets)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your rights under GDPR</h2>
          <p className="mb-4">You're the boss of your data! Here's what you can do:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>See your data:</strong> Ask us for a copy of the info we have about you.</li>
            <li><strong>Fix your data:</strong> Update your info any time in your profile settings.</li>
            <li><strong>Take your data:</strong> Download your data if you want to use it elsewhere.</li>
            <li><strong>Delete your data:</strong> Delete your account and we'll erase your info (unless we need to keep it for legal reasons).</li>
            <li><strong>"No thanks":</strong> Object to certain uses of your data or ask us to stop using it.</li>
            <li><strong>Change your mind:</strong> Withdraw consent for things you agreed to before.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">How long do we keep your data?</h2>
          <p className="mb-4">
            We keep your info only as long as you have an account (or as long as the law says we have to). If you delete your account, we'll remove your data as soon as we can.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">How do we protect your data?</h2>
          <p className="mb-4">
            We use strong security measures to keep your info safe—like encryption, secure passwords, and limiting who can see your data. We're always working to keep things secure.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions or requests?</h2>
          <p className="mb-4">
            If you want to use any of your rights, or just have a question about your data, email us at <a href="mailto:privacy@yourdomain.com" className="text-blue-600 hover:text-blue-800">privacy@yourdomain.com</a>. We're here to help!
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-8">Last updated: June 2025</p>
      </div>
    </div>
  );
} 