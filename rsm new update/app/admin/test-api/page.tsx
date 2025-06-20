"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function TestApiPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testGoogleApi = async () => {
    setLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const response = await fetch("/api/google-reviews")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      setTestResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Google Places API Test</CardTitle>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Test your Google Places API configuration
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button onClick={testGoogleApi} disabled={loading} size="lg">
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Testing API...
                      </>
                    ) : (
                      "Test Google Places API"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-700 dark:text-red-300">API Test Failed</p>
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>

                      {error.includes("API key") && (
                        <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                          <p className="font-semibold">Possible solutions:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Check that GOOGLE_PLACES_API_KEY is set in your environment</li>
                            <li>Verify your API key is correct</li>
                            <li>Ensure Places API is enabled in Google Cloud Console</li>
                            <li>Check API key restrictions and permissions</li>
                          </ul>
                        </div>
                      )}

                      {error.includes("NOT_FOUND") && (
                        <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                          <p className="font-semibold">Place ID issue:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Verify your Place ID is correct: /g/11wv6v7s_r</li>
                            <li>Try converting /g/ format to ChIJ format</li>
                            <li>Check if your business is verified on Google My Business</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {testResult && (
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-semibold text-green-700 dark:text-green-300">API Test Successful!</span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Business Information:</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> {testResult.name}
                        </div>
                        <div>
                          <span className="font-medium">Rating:</span> {testResult.rating} ⭐
                        </div>
                        <div>
                          <span className="font-medium">Total Reviews:</span> {testResult.user_ratings_total}
                        </div>
                        <div>
                          <span className="font-medium">Reviews Fetched:</span> {testResult.reviews?.length || 0}
                        </div>
                        {testResult.formatted_address && (
                          <div className="md:col-span-2">
                            <span className="font-medium">Address:</span> {testResult.formatted_address}
                          </div>
                        )}
                        {testResult.formatted_phone_number && (
                          <div>
                            <span className="font-medium">Phone:</span> {testResult.formatted_phone_number}
                          </div>
                        )}
                      </div>
                    </div>

                    {testResult.reviews && testResult.reviews.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Sample Review:</h3>
                        <div className="text-sm">
                          <p className="font-medium">{testResult.reviews[0].author_name}</p>
                          <p className="text-yellow-500">{"★".repeat(testResult.reviews[0].rating)}</p>
                          <p className="mt-2 italic">"{testResult.reviews[0].text}"</p>
                          <p className="text-gray-500 mt-1">{testResult.reviews[0].relative_time_description}</p>
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <Button asChild>
                        <a href="/reviews">View All Reviews</a>
                      </Button>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Current Configuration:</h3>
                  <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <p>
                      <span className="font-medium">Place ID:</span> /g/11wv6v7s_r
                    </p>
                    <p>
                      <span className="font-medium">API Key:</span>{" "}
                      {process.env.GOOGLE_PLACES_API_KEY ? "✅ Configured" : "❌ Missing"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
