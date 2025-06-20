"use client"

import { motion } from "framer-motion"
import { Camera, Award, Users, Wrench } from "lucide-react"
import InstallationGallery from "@/components/installation-gallery"
import { Card, CardContent } from "@/components/ui/card"

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

export default function GalleryPage() {
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
              <Camera className="w-16 h-16 mx-auto text-blue-600" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Installation Gallery
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our recent air conditioning installations across the Yarra Valley. See the quality and
              professionalism that sets RSM Air Conditioning apart.
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
              { icon: Wrench, value: "50+", label: "Installations Completed", color: "text-blue-600" },
              { icon: Users, value: "100%", label: "Customer Satisfaction", color: "text-green-600" },
              { icon: Award, value: "2+", label: "Years Experience", color: "text-purple-600" },
              { icon: Camera, value: "200+", label: "Project Photos", color: "text-orange-600" },
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

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Recent Work</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Browse through our portfolio of successful installations, maintenance services, and satisfied customers
              </p>
            </div>

            <InstallationGallery />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready for Your Installation?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our satisfied customers and experience the RSM Air Conditioning difference. Professional installation
              with attention to detail.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-600 px-8 py-3 text-lg font-medium shadow-lg transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Your Free Quote
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
