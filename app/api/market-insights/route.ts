import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products, users } from "@/lib/schema"
import { eq, avg, count, desc } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const county = searchParams.get("county")

    // Get average prices by category
    let priceQuery = db
      .select({
        category: products.category,
        averagePrice: avg(products.price),
        productCount: count(products.id),
      })
      .from(products)
      .leftJoin(users, eq(products.farmerId, users.id))
      .where(eq(products.status, "active"))
      .groupBy(products.category)

    if (county) {
      priceQuery = priceQuery.where(eq(users.county, county))
    }

    const priceData = await priceQuery

    // Get trending products
    const trendingProducts = await db
      .select({
        name: products.name,
        category: products.category,
        averagePrice: avg(products.price),
        totalSold: count(products.quantitySold),
      })
      .from(products)
      .where(eq(products.status, "active"))
      .groupBy(products.name, products.category)
      .orderBy(desc(count(products.quantitySold)))
      .limit(10)

    // Calculate demand levels (simplified logic)
    const insights = priceData.map((item) => ({
      category: item.category,
      averagePrice: Math.round((item.averagePrice || 0) * 100) / 100,
      productCount: item.productCount,
      demandLevel: item.productCount > 50 ? "high" : item.productCount > 20 ? "medium" : "low",
      supplyLevel: item.productCount > 100 ? "high" : item.productCount > 50 ? "medium" : "low",
    }))

    return NextResponse.json({
      insights,
      trending: trendingProducts,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Market insights error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
