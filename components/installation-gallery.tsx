"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Wrench, Play } from "lucide-react"
import Image from "next/image"

interface Installation {
  id: number
  title: string
  location: string
  date: string
  category: "residential" | "commercial" | "maintenance"
  images: string[]
  description: string
  unit: string
  features: string[]
  beforeImage?: string
  afterImage?: string
  isVideo?: boolean
}

const installations: Installation[] = [
  {
    id: 1,
    title: "Recent Installation in Warranwood",
    location: "Warranwood",
    date: "December 2024",
    category: "residential",
    images: ["/images/gallery/warranwood-installation.jpg"],
    description: "A recent installation in Warranwood 📍",
    unit: "Fujitsu Split System",
    features: ["Professional Installation", "Clean Finish", "Optimal Positioning", "Customer Satisfaction"],
  },
  {
    id: 2,
    title: "5x Fujitsu Split Systems - Double Story Townhouse",
    location: "Burwood",
    date: "December 2024",
    category: "residential",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AQOaNld93axYbQkTeSuzhDotgRSocm_D_WsJgpmIfFfJoYiLDwUmdJlHHgoT3eZTNmBXFmO3ggEeItIOhueF15tRpcdSERTEpm4Wcn4-yrdWI6eSyvRPpe0YPCkKMQsh1BUcuk.mp4",
    ], // Updated video URL
    description:
      "5x Fujitsu split systems installed at a double story townhouse in Burwood, very happy with the finished product. ✅",
    unit: "5x Fujitsu Split Systems",
    features: ["Multi-Zone Installation", "Double Story Coverage", "Professional Finish", "Customer Satisfaction"],
    isVideo: true,
  },
  {
    id: 3,
    title: "Fujitsu 26kW 3 Phase Ducted System",
    location: "Commercial Installation",
    date: "December 2024",
    category: "commercial",
    images: ["/images/gallery/fujitsu-26kw-ducted.jpg"],
    description: "Fujitsu 26kw 3 Phase Ducted RCAC fit off coming along.",
    unit: "Fujitsu 26kW 3 Phase Ducted System",
    features: ["Commercial Grade", "3 Phase Power", "High Capacity", "Professional Installation"],
  },
  {
    id: 4,
    title: "Mitsubishi Heavy Industries for Ray White",
    location: "Ray White Real Estate",
    date: "November 2024",
    category: "commercial",
    images: ["/images/gallery/mitsubishi-heavy-raywhite.jpg"],
    description:
      "Supply & Install of 2x Mitsubishi Heavy Industries reverse cycle Split Systems completed for Ray White Real Estate.",
    unit: "2x Mitsubishi Heavy Industries Split Systems",
    features: ["Commercial Installation", "Reverse Cycle", "Real Estate Office", "Professional Service"],
  },
  {
    id: 5,
    title: "2x Panasonic Systems in Rowville",
    location: "Rowville",
    date: "November 2024",
    category: "residential",
    images: ["/images/gallery/panasonic-rowville.jpg"],
    description: "2x Panasonic 2.5kw Reverse Cycle Split System installations completed for a property in Rowville.",
    unit: "2x Panasonic 2.5kW Split Systems",
    features: ["Dual Installation", "Energy Efficient", "Reverse Cycle", "Clean Installation"],
  },
  {
    id: 6,
    title: "4x Systems Weekend Installation",
    location: "Shepparton",
    date: "November 2024",
    category: "residential",
    images: ["/images/gallery/hisense-shepparton.jpg"],
    description: "4x Reverse Cycle Split System installations this weekend in Shepparton.",
    unit: "4x Hisense Split Systems",
    features: ["Weekend Service", "Multiple Units", "Reverse Cycle", "Efficient Installation"],
  },
]

const categories = [
  { id: "all", label: "All Projects", count: installations.length },
  { id: "residential", label: "Residential", count: installations.filter((i) => i.category === "residential").length },
  { id: "commercial", label: "Commercial", count: installations.filter((i) => i.category === "commercial").length },
  { id: "maintenance", label: "Maintenance", count: installations.filter((i) => i.category === "maintenance").length },
]

export default function InstallationGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)

  const filteredInstallations =
    selectedCategory === "all"
      ? installations
      : installations.filter((installation) => installation.category === selectedCategory)

  const nextImage = () => {
    if (selectedInstallation) {
      setCurrentImageIndex((prev) => (prev === selectedInstallation.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedInstallation) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedInstallation.images.length - 1 : prev - 1))
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "residential":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "commercial":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.label}
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredInstallations.map((installation, index) => (
            <motion.div
              key={installation.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => {
                  setSelectedInstallation(installation)
                  setCurrentImageIndex(0)
                  setShowBeforeAfter(false)
                }}
              >
                <div className="relative">
                  {installation.isVideo ? (
                    <div className="relative w-full h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
                      <video
                        src={installation.images[0]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        muted
                        playsInline
                        preload="metadata"
                        poster="/placeholder.svg?height=256&width=400"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                        <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={installation.images[0] || "/placeholder.svg"}
                      alt={installation.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(installation.category)}>{installation.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {installation.isVideo ? "Video" : `${installation.images.length} photos`}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">
                      {installation.isVideo ? "Click to play video" : "Click to view details"}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{installation.title}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{installation.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{installation.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {installation.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <Wrench className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{installation.unit}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedInstallation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInstallation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedInstallation.title}</h2>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedInstallation.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{selectedInstallation.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedInstallation(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image/Video Viewer */}
                <div className="relative mb-6">
                  <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {selectedInstallation.isVideo ? (
                      <video
                        src={selectedInstallation.images[currentImageIndex]}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src={selectedInstallation.images[currentImageIndex]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={selectedInstallation.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${selectedInstallation.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}

                    {/* Navigation arrows - only show for multiple images, not for single video */}
                    {selectedInstallation.images.length > 1 && !selectedInstallation.isVideo && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}

                    {/* Counter - show different text for video */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedInstallation.isVideo
                        ? "Video Content"
                        : `${currentImageIndex + 1} / ${selectedInstallation.images.length}`}
                    </div>
                  </div>

                  {/* Thumbnail Navigation - only for multiple images */}
                  {selectedInstallation.images.length > 1 && !selectedInstallation.isVideo && (
                    <div className="flex space-x-2 mt-4 overflow-x-auto">
                      {selectedInstallation.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                            index === currentImageIndex ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Before/After Comparison */}
                {selectedInstallation.beforeImage && selectedInstallation.afterImage && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Before & After</h3>
                      <Button variant="outline" size="sm" onClick={() => setShowBeforeAfter(!showBeforeAfter)}>
                        {showBeforeAfter ? "Hide" : "Show"} Comparison
                      </Button>
                    </div>

                    {showBeforeAfter && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Image
                            src={selectedInstallation.beforeImage || "/placeholder.svg"}
                            alt="Before installation"
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                            Before
                          </div>
                        </div>
                        <div className="relative">
                          <Image
                            src={selectedInstallation.afterImage || "/placeholder.svg"}
                            alt="After installation"
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                            After
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedInstallation.description}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-4">
                      <Wrench className="w-5 h-5 mr-2" />
                      <span className="font-medium">{selectedInstallation.unit}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Features & Benefits</h3>
                    <div className="space-y-2">
                      {selectedInstallation.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
