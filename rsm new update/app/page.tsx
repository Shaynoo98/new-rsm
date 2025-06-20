"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, Mail, MapPin, Snowflake, Wind, Thermometer, Shield, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

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

const units = [
  {
    name: "Fujitsu C2.5kW H3.2kW Reverse Cycle Split System",
    image: "/images/units/fujitsu-2-5kw.png",
    features: ["2.5kW Cooling", "3.2kW Heating", "Energy Efficient", "Quiet Operation"],
  },
  {
    name: "Panasonic C3.5kW H4.3kW Reverse Cycle Split System",
    image: "/images/units/panasonic-3-5kw.webp",
    features: ["3.5kW Cooling", "4.3kW Heating", "WiFi Control", "Advanced Filtration"],
  },
  {
    name: "Hisense C5.0kW H6.4kW Reverse Cycle Split System",
    image: "/images/units/hisense-5kw.avif",
    features: ["5.0kW Cooling", "6.4kW Heating", "Dual Zone", "Smart Sensors"],
  },
]

const reviews = [
  {
    name: "Charli Tyler",
    rating: 5,
    text: "River was incredibly professional and easy to deal with, and was able to help us work out exactly what we needed to best suit our space. He was lovely and very easy to converse with while organising the installation. Highly recommend 😊",
    location: "Yarra Valley",
    image: "/images/reviews/charli-tyler.jpg",
  },
  {
    name: "Jenn Walter",
    rating: 5,
    text: "Can highly recommend River and his team who installed our second storey split system. He was knowledgeable, friendly, professional and reliable.",
    location: "Yarra Valley",
    image: "/images/reviews/jenn-walter.jpg",
  },
  {
    name: "Haydi Kubrak",
    rating: 5,
    text: "Highly recommend River. We had a split system put in today, he recommended the correct size and brand needed. So professional, punctual and thorough. 10/10 totally recommend his high quality work.",
    location: "Yarra Valley",
    image: "/images/reviews/haydi-kubrak.jpg",
  },
]

const brands = [
  {
    name: "Fujitsu",
    logo: "/images/brands/fujitsu-logo-new-2.png",
    description: "Leading Japanese air conditioning technology",
  },
  {
    name: "Mitsubishi Electric",
    logo: "/images/brands/mitsubishi-electric-logo-new.png",
    description: "Premium electric air conditioning systems",
  },
  {
    name: "Mitsubishi Heavy",
    logo: "/images/brands/mitsubishi-heavy-logo-new.png",
    description: "Industrial-grade cooling solutions",
  },
  {
    name: "Panasonic",
    logo: "/images/brands/panasonic-logo-new.png",
    description: "Innovative climate control technology",
  },
  {
    name: "Samsung",
    logo: "/images/brands/samsung-logo.png",
    description: "Smart air conditioning solutions",
  },
  {
    name: "Daikin",
    logo: "/images/brands/daikin-logo.png",
    description: "World-leading air conditioning innovation",
  },
  {
    name: "TCL",
    logo: "/images/brands/tcl-logo.png",
    description: "Affordable quality cooling systems",
  },
  {
    name: "Rinnai",
    logo: "/images/brands/rinnai-logo.png",
    description: "Energy-efficient heating and cooling",
  },
  {
    name: "Brivis",
    logo: "/images/brands/brivis-logo.png",
    description: "Australian climate control specialists",
  },
  {
    name: "Braemar",
    logo: "/images/brands/braemar-logo-new.png",
    description: "Professional HVAC solutions",
  },
]

export default function HomePage() {
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null)
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source
              src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761"
              type="video/mp4"
            />
            {/* Fallback image if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
          </video>
          {/* Enhanced video overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-cyan-800/60" />
          {/* Additional overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              <Snowflake className="w-6 h-6 text-white/40" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="container mx-auto px-4 text-center z-10 relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, duration: 0.8 }}
            className="mb-12"
          >
            <Image
              src="/images/rsm-logo.png"
              alt="RSM Air Conditioning"
              width={400}
              height={140}
              className="mx-auto drop-shadow-2xl max-w-full h-auto w-auto max-h-40 sm:max-h-48 md:max-h-56"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
              priority
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Yarra Valley's Premier
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              AC Specialists
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-10 max-w-4xl mx-auto drop-shadow-md leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Professional Air Conditioning Installation, Maintenance & Repair Services
            <br />
            <span className="text-cyan-200 font-medium">Serving the Yarra Valley with Excellence</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-0 rounded-full"
            >
              <Link href="/contact">
                <Phone className="w-6 h-6 mr-3" />
                Get Free Quote
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 text-black bg-white border-2 border-white/80 hover:bg-gray-100 hover:text-blue-600 shadow-2xl backdrop-blur-sm rounded-full"
            >
              <Link href="/about">
                <Play className="w-6 h-6 mr-3" />
                Learn More
              </Link>
            </Button>
          </motion.div>

          {/* Enhanced trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: Shield, text: "Licensed & Insured", color: "text-cyan-300" },
              { icon: Star, text: "5-Star Reviews", color: "text-yellow-400" },
              { icon: MapPin, text: "Yarra Valley Local", color: "text-blue-300" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-white font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive air conditioning solutions for your home and business
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Snowflake,
                title: "Installation",
                desc: "Professional AC unit installation",
                color: "text-blue-600",
              },
              { icon: Wind, title: "Maintenance", desc: "Regular servicing and tune-ups", color: "text-cyan-600" },
              {
                icon: Thermometer,
                title: "Repairs",
                desc: "Quick and reliable repair services",
                color: "text-blue-500",
              },
              { icon: Shield, title: "Warranty", desc: "Comprehensive warranty coverage", color: "text-cyan-500" },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 flex items-center justify-center`}
                    >
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brands We Work With Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/50 to-cyan-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted Brands We Work With
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We partner with the world's leading air conditioning manufacturers to bring you the best in cooling
              technology
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {brands.map((brand, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
                  onMouseEnter={() => setHoveredBrand(index)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <div className="relative mb-6 h-20 flex items-center justify-center">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={`${brand.name} logo`}
                        width={180}
                        height={90}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{brand.name}</h3>
                    <motion.p
                      className="text-sm text-gray-600 dark:text-gray-400 text-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredBrand === index ? 1 : 0,
                        height: hoveredBrand === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {brand.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Can't find your preferred brand? We work with many more manufacturers to meet your specific needs.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link href="/contact">Discuss Your Requirements</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Air Conditioning Units Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Air Conditioning Units
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Premium quality units with professional installation
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {units.map((unit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg"
                  onMouseEnter={() => setHoveredUnit(index)}
                  onMouseLeave={() => setHoveredUnit(null)}
                >
                  <div className="relative">
                    <Image
                      src={unit.image || "/placeholder.svg"}
                      alt={unit.name}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredUnit === index ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-cyan-600/90 flex items-center justify-center"
                    >
                      <div className="text-center text-white">
                        <p className="text-sm mb-2 font-medium">Contact us for</p>
                        <p className="text-4xl font-bold">Free Quote</p>
                      </div>
                    </motion.div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{unit.name}</h3>
                    <div className="space-y-3">
                      {unit.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="mr-3 mb-2 px-3 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/50 to-cyan-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Customers Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real reviews from satisfied customers across the Yarra Valley
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {reviews.map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative w-14 h-14 mr-4">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover border-3 border-blue-200 shadow-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">{review.name}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">"{review.text}"</p>
                    <div className="flex items-center justify-end">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {review.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Ready to Stay Cool?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact RSM Air Conditioning today for a free quote on your new air conditioning system
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full shadow-2xl">
                <Link href="/contact">
                  <Phone className="w-6 h-6 mr-3" />
                  Get Free Quote
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 text-black border-2 border-white/80 hover:bg-white hover:text-blue-600 rounded-full shadow-2xl"
              >
                <Link href="mailto:riverrsmair@gmail.com">
                  <Mail className="w-6 h-6 mr-3" />
                  Email Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
