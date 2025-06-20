"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation" // Import useRouter

interface ReviewFormData {
  name: string
  email: string
  location: string
  rating: number
  review: string
  photo?: File | null
}

export default function ReviewSubmissionForm() {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    location: "",
    rating: 0,
    review: "",
    photo: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [hoveredStar, setHoveredStar] = useState(0)
  const router = useRouter() // Initialize useRouter

  const handleInputChange = (field: keyof ReviewFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }))
    setPhotoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the data to your backend
      console.log("Review submitted:", formData)

      setSubmitStatus("success")
      router.push("/thank-you") // Redirect to thank you page
    } catch (error) {
      console.error("Error submitting review:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.rating > 0 && formData.review.length >= 10

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Share Your Experience</CardTitle>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Help others by sharing your experience with RSM Air Conditioning
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-600 mb-2">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your review has been submitted successfully. Redirecting you now...
              </p>
            </motion.div>
          ) : submitStatus === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-600 mb-2">Oops!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There was an error submitting your review. Please try again.
              </p>
              <Button onClick={() => setSubmitStatus("idle")} variant="outline">
                Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., Healesville, Yarra Glen"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Rating *</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleInputChange("rating", star)}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredStar || formData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {formData.rating > 0 && `${formData.rating} star${formData.rating !== 1 ? "s" : ""}`}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <Label htmlFor="review">Your Review *</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => handleInputChange("review", e.target.value)}
                  placeholder="Tell us about your experience with RSM Air Conditioning..."
                  rows={4}
                  className="resize-none"
                  required
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minimum 10 characters ({formData.review.length}/10)
                </p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photo (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  {photoPreview ? (
                    <div className="relative inline-block">
                      <Image
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="w-24 h-24 rounded-full object-cover mx-auto"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload a photo of yourself (optional)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Label
                        htmlFor="photo-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Choose Photo
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Privacy Notice:</strong> Your review may be displayed on our website and marketing materials.
                  Your email address will not be published. By submitting this review, you consent to its public
                  display.
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
