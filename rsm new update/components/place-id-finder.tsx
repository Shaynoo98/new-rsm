"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ExternalLink, Copy, CheckCircle, AlertCircle } from "lucide-react"

export default function PlaceIdFinder() {
  const [searchQuery, setSearchQuery] = useState("RSM Air Conditioning Yarra Valley")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const searchPlaces = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setSearchResults([])

    try {
      // This would call your backend API that uses Google Places API
      const response = await fetch(`/api/search-places?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSearchResults(data.results || [])
    } catch (err) {
      setError("Failed to search places. Please try the manual methods below.")
      console.error("Error searching places:", err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(text)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Tool */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Find Your Google Place ID
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Business Name and Location</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., RSM Air Conditioning Yarra Valley"
                onKeyPress={(e) => e.key === "Enter" && searchPlaces()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={searchPlaces} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Search Results:</h3>
              {searchResults.map((place, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{place.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{place.formatted_address}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(place.place_id)}
                      className="shrink-0"
                    >
                      {copiedId === place.place_id ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <Copy className="w-4 h-4 mr-1" />
                      )}
                      {copiedId === place.place_id ? "Copied!" : "Copy ID"}
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-sm font-mono break-all">
                    {place.place_id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Methods */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Method 1: Google Maps URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Method 1: Google Maps URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                1. Go to Google Maps and search for your business
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2. Click on your business listing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                3. Look at the URL - find the part that looks like this:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs font-mono">
                https://maps.google.com/maps/place/.../@.../<strong>ChIJ...</strong>/...
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                4. The Place ID starts with "ChIJ" and is about 27 characters long
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Google Maps
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Method 2: Place ID Finder Tool */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Method 2: Google's Place ID Finder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">1. Use Google's official Place ID Finder tool</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2. Search for "RSM Air Conditioning" in Yarra Valley area
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">3. Click on your business marker on the map</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">4. Copy the Place ID from the sidebar</p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Place ID Finder
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Method 3: Manual Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Method 3: Create Google My Business Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Don't have a Google My Business listing yet?
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              If your business doesn't appear in Google searches, you'll need to create a Google My Business profile
              first. This is essential for local SEO and customer reviews.
            </p>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p>1. Go to Google My Business</p>
              <p>2. Click "Manage now" and sign in with your Google account</p>
              <p>3. Add your business name and address</p>
              <p>4. Verify your business (usually by postcard)</p>
              <p>5. Once verified, you can find your Place ID using the methods above</p>
            </div>
            <Button asChild className="mt-4">
              <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Google My Business
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Temporary Solution */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="text-lg text-orange-800 dark:text-orange-200">
            Temporary Solution: Mock Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            While you're setting up your Google My Business listing, the reviews page will show mock Google reviews.
            Once you have your Place ID, simply update the environment variables and the real reviews will appear.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">When you get your Place ID, add it to your environment:</p>
            <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border">
              GOOGLE_PLACES_API_KEY=your_api_key_here
              <br />
              GOOGLE_PLACE_ID=your_place_id_here
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
