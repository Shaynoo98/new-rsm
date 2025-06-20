"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, RefreshCw, AlertCircle } from "lucide-react"
import Image from "next/image"

interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GooglePlaceData {
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
  place_id: string
  url: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [placeData, setPlaceData] = useState<GooglePlaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Mock Google Reviews data (replace with actual API call)
  const mockGoogleReviews: GooglePlaceData = {
    name: "RSM Air Conditioning",
    rating: 4.9,
    user_ratings_total: 47,
    place_id: "ChIJXXXXXXXXXXXXXXXXXXXX", // Your actual place ID
    url: "https://www.google.com/maps/place/RSM+Air+Conditioning",
    reviews: [
      {
        author_name: "Sarah Johnson",
        author_url: "https://www.google.com/maps/contrib/123456789",
        language: "en",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Outstanding service from River and his team! They installed our new Fujitsu system efficiently and professionally. The quote was competitive and the work was completed on time. Highly recommend RSM Air Conditioning for anyone in the Yarra Valley.",
        time: 1703097600,
      },
      {
        author_name: "Michael Chen",
        author_url: "https://www.google.com/maps/contrib/987654321",
        language: "en",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "River was fantastic to deal with from start to finish. He provided expert advice on the best system for our home and the installation was seamless. Great communication throughout the process.",
        time: 1700505600,
      },
      {
        author_name: "Emma Wilson",
        author_url: "https://www.google.com/maps/contrib/456789123",
        language: "en",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "Professional, reliable, and reasonably priced. River installed our split system quickly and cleaned up perfectly afterwards. Would definitely use RSM Air Conditioning again.",
        time: 1699900800,
      },
      {
        author_name: "David Thompson",
        author_url: "https://www.google.com/maps/contrib/789123456",
        language: "en",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        rating: 5,
        relative_time_description: "2 months ago",
        text: "Excellent service and workmanship. River is knowledgeable, punctual, and takes pride in his work. Our new air conditioning system works perfectly. Highly recommended!",
        time: 1697308800,
      },
      {
        author_name: "Lisa Martinez",
        author_url: "https://www.google.com/maps/contrib/321654987",
        language: "en",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        rating: 4,
        relative_time_description: "3 months ago",
        text: "Great experience with RSM Air Conditioning. River was helpful in choosing the right unit for our space and the installation was done professionally. Good value for money.",
        time: 1694630400,
      },
    ],
  }

  const fetchGoogleReviews = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/google-reviews")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      setPlaceData(data)
      setReviews(data.reviews || [])
      setLastUpdated(new Date())

      // Clear any previous errors
      setError(null)
    } catch (err) {
      console.error("Error fetching Google reviews:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error"

      // If it's an API configuration issue, show helpful message
      if (errorMessage.includes("API key") || errorMessage.includes("PERMISSION_DENIED")) {
        setError("Google Places API configuration issue. Please check your API key and permissions.")
      } else if (errorMessage.includes("NOT_FOUND")) {
        setError("Business not found with the provided Place ID. Please verify your Place ID.")
      } else {
        setError(`Failed to load Google reviews: ${errorMessage}`)
      }

      // Don't show mock data if we have a real API error - let user know what's wrong
      setPlaceData(null)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoogleReviews()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600 dark:text-gray-400">Loading Google reviews...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchGoogleReviews} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Google Business Summary */}
      {placeData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{placeData.name} on Google</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(Math.round(placeData.rating))}</div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{placeData.rating}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">({placeData.user_ratings_total} reviews)</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="shrink-0">
                  <a href={placeData.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Google
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Last updated: {lastUpdated?.toLocaleDateString()} at {lastUpdated?.toLocaleTimeString()}
                </span>
                <Button onClick={fetchGoogleReviews} variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Google Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={`${review.author_name}-${review.time}`}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
              <CardContent className="p-6">
                {/* Google Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">Google</div>
                </div>

                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={review.profile_photo_url || "/placeholder.svg"}
                      alt={review.author_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{review.author_name}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {review.relative_time_description}
                      </span>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>

                {/* Author Link */}
                {review.author_url && (
                  <a
                    href={review.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium inline-flex items-center"
                  >
                    View on Google
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Had a great experience with us?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Share your experience on Google to help other customers find us!
        </p>
        <Button asChild>
          <a
            href={`https://search.google.com/local/writereview?placeid=${placeData?.place_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star className="w-4 h-4 mr-2" />
            Write a Google Review
          </a>
        </Button>
      </motion.div>
    </div>
  )
}
