import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, farmerProfiles, products } from "@/lib/schema"
import { eq, count, avg } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get farmer details
    const farmer = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        county: users.county,
        verified: users.verified,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, params.id))
      .limit(1)

    if (farmer.length === 0) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 })
    }

    // Get farmer profile
    const profile = await db.select().from(farmerProfiles).where(eq(farmerProfiles.userId, params.id)).limit(1)

    // Get farmer's products
    const farmerProducts = await db
      .select({
        id: products.id,
        name: products.name,
        category: products.category,
        price: products.price,
        unit: products.unit,
        images: products.images,
        organic: products.organic,
        status: products.status,
      })
      .from(products)
      .where(eq(products.farmerId, params.id))

    // Get farmer stats
    const [productCount, avgRating] = await Promise.all([
      db.select({ count: count() }).from(products).where(eq(products.farmerId, params.id)),
      db
        .select({ rating: avg(farmerProfiles.rating) })
        .from(farmerProfiles)
        .where(eq(farmerProfiles.userId, params.id)),
    ])

    const farmerData = farmer[0]
    const profileData = profile.length > 0 ? profile[0] : null

    return NextResponse.json({
      farmer: {
        id: farmerData.id,
        name: `${farmerData.firstName} ${farmerData.lastName}`,
        firstName: farmerData.firstName,
        lastName: farmerData.lastName,
        county: farmerData.county,
        verified: farmerData.verified,
        memberSince: farmerData.createdAt,
      },
      profile: profileData
        ? {
            farmName: profileData.farmName,
            farmSize: profileData.farmSize,
            farmLocation: profileData.farmLocation,
            bio: profileData.bio,
            specializations: profileData.specializations ? JSON.parse(profileData.specializations) : [],
            certifications: profileData.certifications ? JSON.parse(profileData.certifications) : [],
            rating: profileData.rating,
            totalReviews: profileData.totalReviews,
          }
        : null,
      products: farmerProducts.map((product) => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
      })),
      stats: {
        totalProducts: productCount[0]?.count || 0,
        averageRating: avgRating[0]?.rating || 0,
      },
    })
  } catch (error) {
    console.error("Get farmer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
