"use client"

import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "FoxLink has completely transformed how I share my content. My audience engagement has increased by 40% since I started using it!",
    author: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "As a photographer, I needed a clean way to showcase my portfolio links. FoxLink's customization options are perfect for my brand.",
    author: "Michael Chen",
    role: "Photographer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The analytics feature has been a game-changer for my business. I can now see which links perform best and optimize my strategy.",
    author: "Emma Rodriguez",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="flex flex-col">
          <CardContent className="flex-1 pt-6">
            <div className="mb-4 text-4xl">"</div>
            <p className="text-gray-700">{testimonial.quote}</p>
          </CardContent>
          <CardFooter className="flex items-center gap-4 border-t pt-6">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
