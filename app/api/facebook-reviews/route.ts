import { NextResponse } from "next/server"

// Facebook Graph API integration
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID

export async function GET() {
  try {
    if (!FACEBOOK_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
      return NextResponse.json({ error: "Facebook API not configured" }, { status: 500 })
    }

    // Facebook Graph API call
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/ratings?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=reviewer,rating,review_text,created_time`,
    )

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    // Transform Facebook reviews to our format
    const reviews =
      data.data?.map((review: any) => ({
        id: review.id,
        author_name: review.reviewer?.name || "Facebook User",
        rating: review.rating,
        text: review.review_text || "",
        time_description: new Date(review.created_time).toLocaleDateString(),
        platform: "facebook",
        source_url: `https://www.facebook.com/profile.php?id=100090352021248`,
      })) || []

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Error fetching Facebook reviews:", error)
    return NextResponse.json({ error: "Failed to fetch Facebook reviews" }, { status: 500 })
  }
}
