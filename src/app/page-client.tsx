"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { PricingCards } from "@/components/landing/pricing-cards";
import { LandingFooter } from "@/components/landing/landing-footer";
import { useGSAP } from "@/hooks/useGSAP";

interface LandingPageProps {
  freePlanLinkLimit: number;
}

export default function LandingPage({ freePlanLinkLimit }: LandingPageProps) {
  const { containerRef } = useGSAP();

  return (
    <div className="flex min-h-screen flex-col" ref={containerRef}>
      {/* NAVBAR */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section with Image Side-by-Side */}
        <section className="relative overflow-hidden py-10 md:py-22">
          {/* Dynamic animated background elements */}
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-gradient-to-br from-brand-orange/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 right-0 h-64 w-64 bg-gradient-to-br from-brand-orange/15 to-purple-500/15 rounded-full blur-2xl pointer-events-none bg-pulse" />
          <div className="absolute bottom-1/4 left-0 h-48 w-48 bg-gradient-to-br from-cyan-500/12 to-brand-blue/12 rounded-full blur-2xl pointer-events-none animate-pulse" style={{animationDuration: '6s'}} />
          
          {/* Floating sparkles */}
          <div className="absolute top-20 left-10 floating-sparkle">
            <Sparkles className="h-6 w-6 text-brand-orange" />
          </div>
          <div className="absolute top-32 right-20 floating-star">
            <Star className="h-5 w-5 text-purple-500" />
          </div>
          <div className="absolute bottom-20 left-1/4 floating-zap">
            <Zap className="h-6 w-6 text-cyan-500" />
          </div>
          
          <div className="container relative z-10 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 text-center md:text-left">
            {/* Hero Content (left on desktop) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              {/* Enhanced hero title with gradient and sparkle */}
              <div className="relative mb-6">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-brand-blue">
                    One Link to Share
                  </span>
                  <br />
                  <span className="text-brand-orange">
                    All Your Content
                  </span>
                </h1>
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <Sparkles className="h-8 w-8 text-brand-orange" />
                </div>
              </div>
              
              <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Create a <span className="font-semibold text-brand-orange">stunning, customizable page</span> that showcases your links, social profiles, and content in one place. 
                <span className="font-semibold text-brand-blue"> Share a single link</span> in your bio to connect your audience to everything you do.
              </p>
              
              <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start justify-center">
                <Button
                  size="xl"
                  variant="default"
                  className="gsap-button bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white hover:shadow-lg hover:shadow-brand-orange/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  asChild
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center relative z-10"
                  >
                    <span className="relative z-10">Try for free</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="gsap-button border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
              
              {/* Social proof */}
              {/*               
              <div className="mt-8 flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
                <span>Trusted by 10,000+ creators</span>
              </div> 
              */}
            </div>
            
            {/* Image (right on desktop) */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-brand-orange/30 bg-gradient-to-br from-white via-brand-orange/5 to-purple-500/5 shadow-2xl hover:shadow-brand-orange/25 transition-all duration-500 hover:scale-105 group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-purple-500/10 to-cyan-500/10 pointer-events-none group-hover:opacity-75 transition-opacity" />
                <div className="absolute -top-4 -right-4 h-8 w-8 bg-gradient-to-r from-brand-orange to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 h-6 w-6 bg-gradient-to-r from-cyan-500 to-brand-blue rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
                
                {/* Use high-res logo for crisp display on all devices */}
                <Image
                  src="/logo_lg.png"
                  width={480}
                  height={480}
                  alt="FoxLink Logo"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30rem"
                  className="w-full max-w-[30rem] h-auto object-contain rounded-2xl shadow-lg mx-auto relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Beta Banner Section */}
        <section className="w-full">
          <div className="container mx-auto px-4 bg-gradient-to-r from-brand-orange/20 via-purple-500/20 to-cyan-500/20 border-l-4 border-brand-orange p-6 my-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 text-brand-blue">
              <span role="img" aria-label="rocket" className="animate-bounce">🚀</span>
              FoxLink is in Beta!
            </h2>
            <p className="mt-2 text-foreground">
              We're just getting started, and you're an important part of our journey.<br />
              As an early user, your feedback will help shape FoxLink into the best bio-link platform possible.<br />
              <strong>See something you'd like improved? Have an idea?</strong>
              <br />
              <a href="/contact" className="text-brand-orange underline hover:text-brand-orange/80 transition-colors font-semibold">Let us know!</a>
            </p>
            <p className="mt-2 text-muted-foreground">
              Thank you for joining us at the beginning. We're excited to build FoxLink together with you!
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gradient-to-br from-white via-brand-orange/3 to-purple-500/3 py-10 md:py-22 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-orange/3 via-transparent to-cyan-500/3"></div>
          
          <div className="container mx-auto px-4 relative z-10">
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
              <div className="rounded-2xl border-2 border-brand-orange/20 bg-gradient-to-br from-white to-brand-orange/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-brand-orange/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/20 to-purple-500/20 group-hover:scale-110 transition-transform feature-icon">
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
              <div className="rounded-2xl border-2 border-cyan-500/20 bg-gradient-to-br from-white to-cyan-500/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-cyan-500/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:scale-110 transition-transform feature-icon">
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
              <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-white to-purple-500/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-purple-500/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-brand-orange/20 group-hover:scale-110 transition-transform feature-icon">
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
              <div className="rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-white to-emerald-500/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-emerald-500/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform feature-icon">
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
              <div className="rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-white to-amber-500/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-amber-500/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-brand-orange/20 group-hover:scale-110 transition-transform feature-icon">
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
              <div className="rounded-2xl border-2 border-brand-blue/20 bg-gradient-to-br from-white to-brand-blue/5 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-brand-blue/40 group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/20 to-cyan-500/20 group-hover:scale-110 transition-transform feature-icon">
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
            
            {/* Features CTA */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                variant="default"
                className="gsap-button bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white hover:shadow-lg hover:shadow-brand-orange/25 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center"
                >
                  Try for free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-10 md:py-22 bg-gradient-to-br from-brand-blue/3 via-purple-500/3 to-cyan-500/3 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-brand-blue">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Get started with FoxLink in just a few simple steps.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-purple-500 text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">
                  Create Your Account
                </h3>
                <p className="text-muted-foreground">
                  Sign up for FoxLink and set up your profile with your name,
                  photo, and bio.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Add Your Links</h3>
                <p className="text-muted-foreground">
                  Add all your important links, social profiles, and content to
                  your page.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-brand-orange text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand-blue">Share Your Page</h3>
                <p className="text-muted-foreground">
                  Share your unique FoxLink URL on your social media profiles
                  and start connecting with your audience.
                </p>
              </div>
            </div>
            
            {/* How It Works CTA */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                variant="default"
                className="gsap-button bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 text-white hover:shadow-lg hover:shadow-brand-orange/25 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center"
                >
                  Try for free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-10 md:py-22 bg-gradient-to-br from-white via-brand-orange/3 to-purple-500/3">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-brand-blue">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Choose the plan that's right for you and start connecting with
                your audience today.
              </p>
            </div>
            <PricingCards freePlanLinkLimit={freePlanLinkLimit} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-22">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-slate-800 via-brand-orange to-purple-600 p-8 text-center shadow-2xl md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
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
                    className="gsap-button bg-white text-brand-orange hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
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
                    className="gsap-button border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 hover:scale-105"
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
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
} 