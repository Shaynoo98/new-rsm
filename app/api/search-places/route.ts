<<<<<<< HEAD
export const dynamic = "force-dynamic"

=======
>>>>>>> 6315b7d791308d625fe39bb40571267fe37a0f33
import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({ error: "Google Places API key not configured" }, { status: 500 })
    }

    // Use Google Places Text Search API
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query,
    )}&key=${GOOGLE_PLACES_API_KEY}`

    const response = await fetch(searchUrl)
    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error(`Google Places API error: ${data.status}`)
    }

    // Return simplified results
    const results = data.results.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      types: place.types,
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error searching places:", error)
    return NextResponse.json({ error: "Failed to search places" }, { status: 500 })
  }
}
