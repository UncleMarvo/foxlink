"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: {
        monthly: "$0",
        annually: "$0",
      },
      features: ["5 links", "Basic analytics", "Mobile-optimized pages"],
      cta: "Get Started",
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
        "Remove LinkInBio branding",
      ],
      cta: "Get Started",
      popular: true,
    }
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-center space-x-2">
        <span className={`text-sm ${!isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}>Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`text-sm ${isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}>
          Annually <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Save 20%</span>
        </span>
      </div>

      <div className="grid gap-6 w-[70%] sm:w-[90%] md:w-[70%] md:grid-cols-2 mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.popular ? "border-indigo-200 shadow-lg shadow-indigo-100 ring-2 ring-indigo-600" : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-center text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{isAnnual ? plan.price.annually : plan.price.monthly}</span>
                <span className="text-gray-500">/month</span>
                {isAnnual && <p className="text-sm text-gray-500">Billed annually</p>}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/register">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
