"use client"

import { motion } from "framer-motion"
import PlaceIdFinder from "@/components/place-id-finder"
import PlaceIdExtractor from "@/components/place-id-extractor"
import { Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function PlaceIdPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" animate="animate" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <Settings className="w-16 h-16 mx-auto text-blue-600" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your Google Place ID
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Use these tools to find your Google My Business Place ID for reviews integration
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Place ID Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Tabs defaultValue="extractor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="extractor">Extract from URL</TabsTrigger>
                <TabsTrigger value="finder">Search & Find</TabsTrigger>
              </TabsList>

              <TabsContent value="extractor" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Extract Place ID from URL</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Already have a Google Maps link? Extract the Place ID directly from it
                  </p>
                </div>
                <PlaceIdExtractor />
              </TabsContent>

              <TabsContent value="finder" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Search for Your Business</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Search for your business and get the Place ID automatically
                  </p>
                </div>
                <PlaceIdFinder />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
