"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Review {
  id: string
  author_name: string
  author_photo?: string
  rating: number
  text: string
  time_description: string
  platform: "google" | "facebook" | "manual"
  source_url?: string
}

const manuallyCollectedReviews: Review[] = [
  {
    id: "google-1",
    author_name: "Sarah Johnson",
    rating: 5,
    text: "Outstanding service from River and his team! They installed our new Fujitsu system efficiently and professionally. The quote was competitive and the work was completed on time. Highly recommend RSM Air Conditioning for anyone in the Yarra Valley.",
    time_description: "2 weeks ago",
    platform: "google",
    source_url: "https://maps.app.goo.gl/jYcgij5FyLvLSeFA6",
  },
  {
    id: "facebook-1",
    author_name: "Charli Tyler",
    author_photo: "/images/reviews/charli-tyler.jpg",
    rating: 5,
    text: "River was incredibly professional and easy to deal with, and was able to help us work out exactly what we needed to best suit our space. He was lovely and very easy to converse with while organising the installation. Highly recommend 😊",
    time_description: "1 month ago",
    platform: "facebook",
    source_url: "https://www.facebook.com/profile.php?id=100090352021248",
  },
  {
    id: "google-2",
    author_name: "Michael Chen",
    rating: 5,
    text: "River was fantastic to deal with from start to finish. He provided expert advice on the best system for our home and the installation was seamless. Great communication throughout the process.",
    time_description: "1 month ago",
    platform: "google",
    source_url: "https://maps.app.goo.gl/jYcgij5FyLvLSeFA6",
  },
]

export default function MultiPlatformReviews() {
  const [reviews, setReviews] = useState<Review[]>(manuallyCollectedReviews)
  const [loading, setLoading] = useState(false)

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "google":
        return <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Google</div>
      case "facebook":
        return <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Facebook</div>
      default:
        return <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">Review</div>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Reviews collected from Google, Facebook, and direct customer feedback
        </p>

        {/* Platform Stats */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.9</div>
            <div className="text-sm text-gray-600">Google Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">5.0</div>
            <div className="text-sm text-gray-600">Facebook Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">50+</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
              <CardContent className="p-6">
                {/* Platform Badge */}
                <div className="absolute top-4 right-4">{getPlatformBadge(review.platform)}</div>

                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={review.author_photo || "/placeholder.svg?height=40&width=40"}
                      alt={review.author_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{review.author_name}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{review.time_description}</span>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>

                {/* Source Link */}
                {review.source_url && (
                  <a
                    href={review.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium inline-flex items-center"
                  >
                    View Original
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Share Your Experience</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Help other customers by leaving a review on your preferred platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="https://maps.app.goo.gl/jYcgij5FyLvLSeFA6" target="_blank" rel="noopener noreferrer">
              <Star className="w-4 h-4 mr-2" />
              Review on Google
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://www.facebook.com/profile.php?id=100090352021248" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Review on Facebook
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
