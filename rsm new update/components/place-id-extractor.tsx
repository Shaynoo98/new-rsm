"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, CheckCircle, ExternalLink, AlertCircle } from "lucide-react"

export default function PlaceIdExtractor() {
  const [googleUrl, setGoogleUrl] = useState("https://maps.app.goo.gl/jYcgij5FyLvLSeFA6")
  const [extractedId, setExtractedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const extractPlaceId = async () => {
    setLoading(true)
    setError(null)
    setExtractedId(null)

    try {
      // For short URLs like maps.app.goo.gl, we need to follow the redirect
      // In a real implementation, you'd do this server-side

      // For now, let's provide instructions for manual extraction
      if (googleUrl.includes("maps.app.goo.gl") || googleUrl.includes("goo.gl")) {
        setError("Short URL detected. Please follow the manual steps below to get the full URL first.")
        setLoading(false)
        return
      }

      // Extract Place ID from full Google Maps URLs
      const placeIdMatch =
        googleUrl.match(/place_id=([^&]+)/) ||
        googleUrl.match(/!1s([^!]+)/) ||
        googleUrl.match(/data=.*!3m1!4b1!4m[^!]*!3m[^!]*!1s([^!]+)/)

      if (placeIdMatch) {
        const placeId = placeIdMatch[1]
        setExtractedId(placeId)
      } else {
        setError("Could not extract Place ID from this URL. Please try the manual method below.")
      }
    } catch (err) {
      setError("Error processing URL. Please try the manual method below.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>Extract Place ID from Google Maps URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Google Maps URL</Label>
            <Input
              id="url"
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              placeholder="Paste your Google Maps URL here"
            />
          </div>

          <Button onClick={extractPlaceId} disabled={loading} className="w-full">
            {loading ? "Extracting..." : "Extract Place ID"}
          </Button>

          {error && (
            <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-orange-700 dark:text-orange-300">{error}</span>
            </div>
          )}

          {extractedId && (
            <div className="space-y-3">
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 dark:text-green-300">Place ID extracted successfully!</span>
              </div>

              <div className="space-y-2">
                <Label>Your Place ID:</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-3 rounded border font-mono text-sm break-all">
                    {extractedId}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(extractedId)}>
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Instructions for Short URLs */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">Manual Method for Short URLs (like yours)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              Your URL is a short link (maps.app.goo.gl). Follow these steps to get the Place ID:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>Click the link below to open your Google Maps listing</li>
              <li>Once the page loads, look at the URL in your browser's address bar</li>
              <li>The URL should now be much longer and contain your Place ID</li>
              <li>Look for a string that starts with "ChIJ" (about 27 characters long)</li>
              <li>Copy that string - that's your Place ID!</li>
            </ol>
          </div>

          <Button asChild className="w-full">
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Your Google Maps Listing
            </a>
          </Button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-semibold mb-2">What to look for in the expanded URL:</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded font-mono text-xs break-all">
              https://www.google.com/maps/place/RSM+Air+Conditioning/@-37.123,145.456,17z/data=!3m1!4b1!4m6!3m5!1s
              <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">ChIJXXXXXXXXXXXXXXXXXXXX</span>
              !8m2!3d-37.123!4d145.456!16s%2Fg%2F11xyz
            </div>
            <p className="mt-2">The highlighted part starting with "ChIJ" is your Place ID!</p>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Method */}
      <Card>
        <CardHeader>
          <CardTitle>Alternative: Use Google's Place ID Finder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If the manual method doesn't work, you can use Google's official Place ID Finder tool:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Click the button below to open Google's Place ID Finder</li>
            <li>Search for "RSM Air Conditioning" in the Yarra Valley area</li>
            <li>Click on your business marker on the map</li>
            <li>The Place ID will appear in the sidebar</li>
          </ol>

          <Button asChild variant="outline" className="w-full">
            <a
              href="https://developers.google.com/maps/documentation/places/web-service/place-id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Google's Place ID Finder
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Expected Place ID Format */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-sm">What a Place ID looks like</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Example Place ID format:</p>
            <code className="text-sm font-mono">ChIJN1t_tDeuEmsRUsoyG83frY4</code>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              • Always starts with "ChIJ"
              <br />• About 27 characters long
              <br />• Contains letters, numbers, and sometimes underscores or hyphens
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
