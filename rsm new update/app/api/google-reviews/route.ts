import { type NextRequest, NextResponse } from "next/server"

// You'll need to set these environment variables
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJ_7s_r6v7wV4RrS_v6wV11g" // Your actual Place ID

export async function GET(request: NextRequest) {
  try {
    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({ error: "Google Places API key missing" }, { status: 500 })
    }

    // Use your actual Place ID
    const placeId = GOOGLE_PLACE_ID

    // Fetch place details including reviews
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url,formatted_address,formatted_phone_number&key=${GOOGLE_PLACES_API_KEY}`

    console.log("Fetching from:", placeDetailsUrl.replace(GOOGLE_PLACES_API_KEY, "API_KEY_HIDDEN"))

    const response = await fetch(placeDetailsUrl)
    const data = await response.json()

    console.log("Google Places API Response:", data.status, data.error_message || "Success")

    if (data.status !== "OK") {
      console.error("Google Places API error:", data)
      throw new Error(`Google Places API error: ${data.status} - ${data.error_message || "Unknown error"}`)
    }

    // Transform the data to match our interface
    const placeData = {
      name: data.result.name || "RSM Air Conditioning",
      rating: data.result.rating || 5.0,
      user_ratings_total: data.result.user_ratings_total || 0,
      reviews: data.result.reviews || [],
      place_id: placeId,
      url: data.result.url || `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      formatted_address: data.result.formatted_address,
      formatted_phone_number: data.result.formatted_phone_number,
    }

    // Cache the response for 1 hour
    return NextResponse.json(placeData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching Google reviews:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Google reviews",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
