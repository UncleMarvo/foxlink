import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { PricingCards } from "@/components/landing/pricing-cards";
import { LandingFooter } from "@/components/landing/landing-footer";
import { landingMetadata } from "./metadata";

export const metadata: Metadata = landingMetadata;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* NAVBAR */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section with Image Side-by-Side */}
        <section className="relative overflow-hidden py-10 md:py-22">
          {/* Creative background elements - moved further away and reduced opacity */}
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-gradient-to-br from-brand-blue/5 via-brand-orange/5 to-cyan-500/5 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 right-0 h-64 w-64 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none animate-bounce" style={{animationDuration: '8s'}} />
          
          <div className="container relative z-10 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 text-center md:text-left">
            {/* Hero Content (left on desktop) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              {/* Fixed: Removed gradient text effect for better readability */}
              <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-brand-blue sm:text-5xl md:text-6xl">
                One Link to Share All Your Content
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Create a customizable page that showcases your links, social
                profiles, and content in one place. Share a single link in your
                bio to connect your audience to everything you do.
              </p>
              <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start justify-center">
                <Button
                  size="xl"
                  variant="default"
                  className="bg-accent-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center"
                  >
                    Try for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
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
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl border border-brand-blue/20 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 pointer-events-none" />
                {/* Use high-res logo for crisp display on all devices */}
                <Image
                  src="/logo_lg.png"
                  width={480}
                  height={480}
                  alt="FoxLink Logo"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30rem"
                  className="w-full max-w-[30rem] h-auto object-contain rounded-xl shadow-lg mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Beta Banner Section */}
        <section className="w-full">
          <div className="container mx-auto px-4 bg-gradient-to-r from-brand-orange/10 to-cyan-500/10 border-l-4 border-brand-orange p-6 my-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold flex items-center gap-2 text-brand-blue">
              <span role="img" aria-label="rocket">🚀</span>
              FoxLink is in Beta!
            </h2>
            <p className="mt-2 text-foreground">
              We're just getting started, and you're an important part of our journey.<br />
              As an early user, your feedback will help shape FoxLink into the best bio-link platform possible.<br />
              <strong>See something you'd like improved? Have an idea?</strong>
              <br />
              <a href="/contact" className="text-brand-orange underline hover:text-brand-orange/80 transition-colors">Let us know!</a>
            </p>
            <p className="mt-2 text-muted-foreground">
              Thank you for joining us at the beginning. We're excited to build FoxLink together with you!
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gradient-to-br from-white to-slate-50 py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-brand-blue">
                Everything you need to connect with your audience
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powerful features to help you showcase your content and grow
                your following.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-brand-orange/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-orange/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-orange"
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
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Custom Link Page</h3>
                <p className="text-muted-foreground">
                  Create a beautiful, branded page that showcases all your
                  important links in one place.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-cyan-500/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-cyan-500"
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
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Track clicks, views, and engagement with detailed analytics to
                  optimize your content strategy.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-purple-500/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-brand-orange/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
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
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Custom Themes</h3>
                <p className="text-muted-foreground">
                  Personalize your page with custom colors, fonts, and layouts
                  to match your brand identity.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-emerald-500/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500"
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
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Mobile Optimized</h3>
                <p className="text-muted-foreground">
                  Your link page looks great on all devices, ensuring your
                  audience can easily access your content anywhere.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-amber-500/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/10 to-brand-orange/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
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
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  Built for speed and reliability, ensuring your links load
                  quickly and work perfectly every time.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 hover:border-brand-blue/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/10 to-cyan-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data is protected with enterprise-grade security and
                  privacy controls you can trust.
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
                Get started with FoxLink in just a few simple steps.
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
                  Sign up for FoxLink and set up your profile with your name,
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
                  Share your unique FoxLink URL on your social media profiles
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
            <PricingCards freePlanLinkLimit={parseInt(process.env.FREE_PLAN_LINK_LIMIT || '5', 10)} />
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
                Be among the first to join FoxLink and shape the future of creator connections.
              </p>
              <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="xl"
                  variant="default"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  asChild
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center"
                  >
                    Try for free <ArrowRight className="ml-2 h-4 w-4" />
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
