"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Curated real reviews from your Google Business page
const curatedReviews = [
  {
    author_name: "Jon Zwart",
    rating: 5,
    text: "Bloody brilliant work River!! Couldn’t get the job done better.",
    relative_time_description: "Just now", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/jon-zwart.png",
    verified: true,
  },
  {
    author_name: "Jacinta Karalus",
    rating: 5,
    text: "Great experience with RSM Air Conditioning, highly recommend.",
    relative_time_description: "Recently", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/jacinta-karalus.png",
    verified: true,
  },
  {
    author_name: "Wayne Akers",
    rating: 5,
    text: "Highly recommend River from RSM air conditioning, Very efficient, reliable and respectful of his customers, helped me get the best possible price for my new air con",
    relative_time_description: "A while ago", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/wayne-akers.png",
    verified: true,
  },
  {
    author_name: "Corey Munro",
    rating: 5,
    text: "Highly recommend River from RSM\nVery efficient, reliable and respectful of his customers, helped me get the best possible price for my new air con in comparison to other quotes.\nalong with superb almost brand new maintenance to my unit on the roof.\nCheers river :)",
    relative_time_description: "Last month", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/corey-munro.png",
    verified: true,
  },
  {
    author_name: "Lace Humber",
    rating: 5,
    text: "River was kind enough to come out to fix our air con after hours as we were desperate. He was super accommodating, efficient, trust worthy and reliable. Couldn’t recommend RSM enough to those who are looking for good quality service!!!!",
    relative_time_description: "Few weeks ago", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/lace-humber.png",
    verified: true,
  },
  {
    author_name: "Caleb Highgate",
    rating: 5,
    text: "Replaced my old air conditioner, new one works a dream",
    relative_time_description: "Recently", // Placeholder, adjust as needed
    profile_photo_url: "/images/reviews/caleb-highgate.png",
    verified: true,
  },
]

export default function GoogleBusinessEmbed() {
  const [showGoogleEmbed, setShowGoogleEmbed] = useState(false)
  const [reviews] = useState(curatedReviews)

  const businessData = {
    name: "RSM Air Conditioning",
    rating: 4.9,
    user_ratings_total: 47,
    url: "https://maps.app.goo.gl/jYcgij5FyLvLSeFA6",
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Google Business Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{businessData.name} on Google</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(Math.round(businessData.rating))}</div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{businessData.rating}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">({businessData.user_ratings_total} reviews)</span>
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <a href={businessData.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Google
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Reviews curated from Google My Business</span>
              <Button onClick={() => setShowGoogleEmbed(!showGoogleEmbed)} variant="ghost" size="sm">
                {showGoogleEmbed ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showGoogleEmbed ? "Hide" : "Show"} Google Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Google Business Page Embed */}
      {showGoogleEmbed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Live Google Business Page</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src={businessData.url}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RSM Air Conditioning Google Business Page"
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This shows your live Google Business page. Customers can see all reviews and business information
                directly from Google.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Curated Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={`${review.author_name}-${index}`}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
              <CardContent className="p-6">
                {/* Google Badge */}
                <div className="absolute top-4 right-4 flex flex-col items-end space-y-1">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">Google</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{review.relative_time_description}</span>
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
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{review.author_name}</h4>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>

                {/* Google Link */}
                <a
                  href={businessData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium inline-flex items-center"
                >
                  View on Google
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href={businessData.url} target="_blank" rel="noopener noreferrer">
              <Star className="w-4 h-4 mr-2" />
              Write a Google Review
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={businessData.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Reviews on Google
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
