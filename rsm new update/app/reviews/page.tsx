"use client"

import { motion } from "framer-motion"
import { Star, Users, MessageSquare, Award } from "lucide-react"
import ReviewSubmissionForm from "@/components/review-submission-form"
import GoogleBusinessEmbed from "@/components/google-business-embed"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const facebookReviews = [
  {
    name: "Charli Tyler",
    rating: 5,
    text: "River was incredibly professional and easy to deal with, and was able to help us work out exactly what we needed to best suit our space. He was lovely and very easy to converse with while organising the installation. Highly recommend 😊",
    location: "Yarra Valley",
    image: "/images/reviews/charli-tyler.jpg",
    platform: "Facebook",
  },
  {
    name: "Jenn Walter",
    rating: 5,
    text: "Can highly recommend River and his team who installed our second storey split system. He was knowledgeable, friendly, professional and reliable.",
    location: "Yarra Valley",
    image: "/images/reviews/jenn-walter.jpg",
    platform: "Facebook",
  },
  {
    name: "Haydi Kubrak",
    rating: 5,
    text: "Highly recommend River. We had a split system put in today, he recommended the correct size and brand needed. So professional, punctual and thorough. 10/10 totally recommend his high quality work.",
    location: "Yarra Valley",
    image: "/images/reviews/haydi-kubrak.jpg",
    platform: "Facebook",
  },
  {
    name: "Brayy Sarree",
    rating: 5,
    text: "Couldn’t be happier with the service! Highly recommend ⭐️",
    location: "Yarra Valley",
    image: "/images/reviews/brayy-sarree.jpeg",
    platform: "Facebook",
  },
  {
    name: "Simon Fry",
    rating: 5,
    text: "Absolute pleasure to deal with River.\nCame out in a timely manner, kept me updated with timeframe aswell fair pricing. \nThanks",
    location: "Yarra Valley",
    image: "/images/reviews/simon-fry.jpeg",
    platform: "Facebook",
  },
  {
    name: "Osasti Osasti",
    rating: 5,
    text: "Very happy with the service I was provided today. The technician was friendly and professional and the service was top notch. Highly recommend",
    location: "Yarra Valley",
    image: "/images/reviews/osasti-osasti.jpeg",
    platform: "Facebook",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <MessageSquare className="w-16 h-16 mx-auto text-blue-600" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Reviews
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              See what our customers say about RSM Air Conditioning and share your own experience
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: Star, value: "4.9", label: "Google Rating", color: "text-yellow-500" },
              { icon: Users, value: "50+", label: "Happy Customers", color: "text-blue-600" },
              { icon: MessageSquare, value: "47+", label: "Google Reviews", color: "text-green-600" },
              { icon: Award, value: "100%", label: "Satisfaction Rate", color: "text-purple-600" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Tabs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
                <TabsTrigger value="google">Google Reviews</TabsTrigger>
                <TabsTrigger value="website">Facebook Reviews</TabsTrigger>
                <TabsTrigger value="submit">Submit Review</TabsTrigger>
              </TabsList>

              <TabsContent value="google" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Google My Business Reviews</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Authentic reviews from our Google My Business listing
                  </p>
                </div>
                <GoogleBusinessEmbed />
              </TabsContent>

              <TabsContent value="website" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Facebook Reviews</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Customer testimonials from our Facebook business page
                  </p>
                </div>

                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {facebookReviews.map((review, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
                        <CardContent className="p-6">
                          {/* Facebook Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Facebook
                            </div>
                          </div>

                          <div className="flex items-center mb-4">
                            <div className="relative w-12 h-12 mr-4">
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt={review.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex mb-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{review.text}"</p>
                          <div className="flex items-center justify-end">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="submit" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Share Your Experience</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Help others by sharing your experience with RSM Air Conditioning
                  </p>
                </div>
                <ReviewSubmissionForm />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
