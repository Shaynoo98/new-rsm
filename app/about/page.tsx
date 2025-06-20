"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, MapPin, Clock, Wrench, Heart } from "lucide-react"
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

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center mb-16">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About RSM Air Conditioning
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Your trusted local air conditioning specialists serving the Yarra Valley with dedication and expertise
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Founded with a passion for keeping Yarra Valley homes and businesses comfortable, RSM Air Conditioning
                has been proudly serving our local community for 2 years. What started as a vision to provide reliable,
                professional air conditioning services has grown into a trusted name throughout the region.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We specialize in premium Fujitsu air conditioning systems, chosen for their reliability, energy
                efficiency, and superior performance. Our team is committed to delivering exceptional service, from
                initial consultation through installation and ongoing maintenance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Award className="w-4 h-4 mr-2" />
                  Licensed & Insured
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Users className="w-4 h-4 mr-2" />
                  Local Experts
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Customer Focused
                </Badge>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/rsm-technician-work.png"
                alt="RSM Air Conditioning technician servicing Fujitsu outdoor unit"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose RSM Air Conditioning?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're more than just an air conditioning company - we're your local comfort specialists
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MapPin,
                title: "Local Knowledge",
                description:
                  "Born and raised in the Yarra Valley, we understand the unique climate challenges of our region and provide tailored solutions.",
              },
              {
                icon: Wrench,
                title: "Expert Installation",
                description:
                  "Our certified technicians ensure every installation meets the highest standards for performance, safety, and longevity.",
              },
              {
                icon: Award,
                title: "Quality Products",
                description:
                  "We exclusively use Fujitsu air conditioning systems, renowned for their reliability, efficiency, and innovative technology.",
              },
              {
                icon: Clock,
                title: "Reliable Service",
                description:
                  "While we don't offer 24/7 emergency service, we're committed to prompt, professional service during business hours.",
              },
              {
                icon: Heart,
                title: "Customer Care",
                description:
                  "Your satisfaction is our priority. We build lasting relationships through honest communication and quality workmanship.",
              },
              {
                icon: Users,
                title: "Community Focused",
                description:
                  "As a local business, we're invested in our community's comfort and well-being. Your neighbors are our neighbors.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Service Areas
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Proudly serving all areas across the beautiful Yarra Valley
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center"
          >
            {[
              "Healesville",
              "Yarra Glen",
              "Lilydale",
              "Coldstream",
              "Wandin",
              "Seville",
              "Woori Yallock",
              "Launching Place",
              "Yarra Junction",
              "Warburton",
              "Millgrove",
              "Wesburn",
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300"
              >
                <p className="font-semibold text-gray-800 dark:text-gray-200">{area}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
