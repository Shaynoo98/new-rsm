import { NextResponse } from "next/server"

// Trustpilot API integration (if you create a Trustpilot business profile)
const TRUSTPILOT_API_KEY = process.env.TRUSTPILOT_API_KEY
const TRUSTPILOT_BUSINESS_ID = process.env.TRUSTPILOT_BUSINESS_ID

export async function GET() {
  try {
    if (!TRUSTPILOT_API_KEY || !TRUSTPILOT_BUSINESS_ID) {
      return NextResponse.json({ error: "Trustpilot API not configured" }, { status: 500 })
    }

    const response = await fetch(`https://api.trustpilot.com/v1/business-units/${TRUSTPILOT_BUSINESS_ID}/reviews`, {
      headers: {
        ApiKey: TRUSTPILOT_API_KEY,
      },
    })

    const data = await response.json()

    const reviews =
      data.reviews?.map((review: any) => ({
        id: review.id,
        author_name: review.consumer.displayName,
        rating: review.stars,
        text: review.text,
        time_description: new Date(review.createdAt).toLocaleDateString(),
        platform: "trustpilot",
        source_url: review.url,
      })) || []

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Error fetching Trustpilot reviews:", error)
    return NextResponse.json({ error: "Failed to fetch Trustpilot reviews" }, { status: 500 })
  }
}
