"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface PricingCardsProps {
  freePlanLinkLimit: number;
}

export function PricingCards({ freePlanLinkLimit }: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: {
        monthly: "$0",
        annually: "$0",
      },
      features: [
        `${freePlanLinkLimit} links`,
        "Basic analytics",
        "Mobile-optimized pages",
      ],
      cta: "Try for free",
      popular: false,
    },
    {
      name: "Premium",
      description: "For creators who want more customization",
      price: {
        monthly: "$3.99",
        annually: "$39.99",
      },
      features: [
        "Unlimited links",
        "Advanced analytics",
        "Custom themes",
        "Remove FoxLink branding",
      ],
      cta: "Try for free",
      popular: true,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Enhanced pricing toggle with brand colors */}
      <div className="mb-8 flex items-center justify-center space-x-2">
        <span
          className={`text-sm transition-colors duration-300 ${!isAnnual ? "font-medium text-brand-blue" : "text-muted-foreground"}`}
        >
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-brand-orange data-[state=unchecked]:bg-brand-blue border-2 border-gray-300 data-[state=checked]:border-brand-orange/50 data-[state=unchecked]:border-brand-blue/50 shadow-sm"
        />
        <span
          className={`text-sm transition-colors duration-300 ${isAnnual ? "font-medium text-brand-blue" : "text-muted-foreground"}`}
        >
          Annually{" "}
          <span className="rounded-full bg-gradient-to-r from-brand-orange/20 to-cyan-500/20 px-2 py-0.5 text-xs text-brand-orange font-medium">
            Save 20%
          </span>
        </span>
      </div>

      <div className="grid gap-6 w-[70%] sm:w-[90%] md:w-[70%] md:grid-cols-2 mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col transition-all duration-500 hover:scale-105 ${
              plan.popular
                ? "border-brand-orange/30 shadow-lg shadow-brand-orange/10 ring-2 ring-brand-orange/20 bg-gradient-to-br from-white to-brand-orange/5"
                : "border-brand-blue/20 shadow-md hover:shadow-lg hover:border-brand-blue/40"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-accent-gradient px-3 py-1 text-center text-xs font-medium text-white shadow-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle
                className={`${plan.popular ? "text-brand-orange" : "text-brand-blue"}`}
              >
                {plan.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${plan.popular ? "text-brand-orange" : "text-brand-blue"}`}
                >
                  {isAnnual ? plan.price.annually : plan.price.monthly}
                </span>
                <span className="text-muted-foreground">
                  /{isAnnual ? "year" : "month"}
                </span>
                {isAnnual && (
                  <p className="text-sm text-muted-foreground">
                    Billed annually
                  </p>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check
                      className={`mr-2 h-4 w-4 ${plan.popular ? "text-brand-orange" : "text-emerald-500"}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full transition-all duration-300 ${
                  plan.popular
                    ? "bg-accent-gradient hover:shadow-lg hover:shadow-brand-orange/25 hover:scale-105"
                    : "bg-brand-blue hover:bg-brand-blue/90 hover:shadow-lg hover:scale-105"
                }`}
                variant={plan.popular ? "default" : "default"}
                asChild
              >
                <Link href="/auth/register">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
