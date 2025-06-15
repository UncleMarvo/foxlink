"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-auto p-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            variant="default"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Areas of Interest</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/#pricing" 
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">Pricing</h4>
              <p className="text-sm text-gray-600">View our plans and features</p>
            </Link>
            <Link 
              href="/faq" 
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">FAQ</h4>
              <p className="text-sm text-gray-600">Find answers to common questions</p>
            </Link>
            <Link 
              href="/contact" 
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">Contact</h4>
              <p className="text-sm text-gray-600">Get in touch with our team</p>
            </Link>
            <Link 
              href="/auth/signup" 
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">Sign Up</h4>
              <p className="text-sm text-gray-600">Create your FoxLink account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 