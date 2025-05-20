import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { PricingCards } from "@/components/landing/pricing-cards";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* NAVBAR */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section with Image Side-by-Side */}
        <section className="relative overflow-hidden py-10 md:py-22">
          <div className="container relative z-10 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 text-center md:text-left">
            {/* Hero Content (left on desktop) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              <div className="absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-br from-indigo-100/20 via-purple-100/20 to-pink-100/20 blur-3xl pointer-events-none" />
              <h1 className="mb-6 max-w-4xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                One Link to Share All Your Content
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
                Create a customizable page that showcases your links, social
                profiles, and content in one place. Share a single link in your
                bio to connect your audience to everything you do.
              </p>
              <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start justify-center">
                <Button
                  size="xl"
                  variant="default"
                  className="text-white bg-indigo-600 hover:bg-indigo-400"
                  asChild
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-gray-500 bg-gray-100 text-indigo-600 hover:bg-white/10"
                  asChild
                >
                  <Link
                    href="#features"
                    className="flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            {/* Image (right on desktop) */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl border bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  width={600}
                  height={300}
                  alt="LinkInBio Dashboard Preview"
                  className="w-full h-auto rounded-xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to connect with your audience
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Powerful features to help you showcase your content and grow
                your following.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Custom Link Page</h3>
                <p className="text-gray-600">
                  Create a beautiful, branded page that showcases all your
                  important links in one place.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600">
                  Track clicks, views, and engagement with detailed analytics to
                  optimize your content strategy.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Custom Themes</h3>
                <p className="text-gray-600">
                  Personalize your page with custom colors, fonts, and layouts
                  to match your brand identity.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Mobile Optimized</h3>
                <p className="text-gray-600">
                  Your page looks great on any device, ensuring a seamless
                  experience for all visitors.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
                <p className="text-gray-600">
                  Your data is always secure with enterprise-grade security and
                  privacy controls.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Social Integration
                </h3>
                <p className="text-gray-600">
                  Seamlessly connect your social media profiles and showcase
                  your content from various platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Get started with LinkInBio in just a few simple steps.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Create Your Account
                </h3>
                <p className="text-gray-600">
                  Sign up for LinkInBio and set up your profile with your name,
                  photo, and bio.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Add Your Links</h3>
                <p className="text-gray-600">
                  Add all your important links, social profiles, and content to
                  your page.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Share Your Page</h3>
                <p className="text-gray-600">
                  Share your unique LinkInBio URL on your social media profiles
                  and start connecting with your audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the plan that's right for you and start connecting with
                your audience today.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-center shadow-xl md:p-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to grow your audience?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Join thousands of creators who use LinkInBio to connect with
                their audience.
              </p>
              <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="xl"
                  variant="default"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  asChild
                >
                  <Link
                    href="/register"
                    className="flex items-center justify-center"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link
                    href="#features"
                    className="flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
}
