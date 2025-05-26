import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, products, users } from "@/lib/schema"
import { verifyToken } from "@/lib/auth"
import { eq, sum, count, and, gte } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user type
    const user = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1)
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userType = user[0].userType
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format

    if (userType === "farmer") {
      // Farmer dashboard stats
      const [totalListings, totalRevenue, monthlyRevenue, pendingOrders] = await Promise.all([
        db.select({ count: count() }).from(products).where(eq(products.farmerId, decoded.userId)),
        db
          .select({ total: sum(orders.totalAmount) })
          .from(orders)
          .where(and(eq(orders.farmerId, decoded.userId), eq(orders.paymentStatus, "paid"))),
        db
          .select({ total: sum(orders.totalAmount) })
          .from(orders)
          .where(
            and(
              eq(orders.farmerId, decoded.userId),
              eq(orders.paymentStatus, "paid"),
              gte(orders.createdAt, currentMonth),
            ),
          ),
        db
          .select({ count: count() })
          .from(orders)
          .where(and(eq(orders.farmerId, decoded.userId), eq(orders.status, "pending"))),
      ])

      return NextResponse.json({
        totalListings: totalListings[0]?.count || 0,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        pendingOrders: pendingOrders[0]?.count || 0,
        userType: "farmer",
      })
    } else {
      // Buyer dashboard stats
      const [totalOrders, totalSpent, monthlySpent, pendingOrders] = await Promise.all([
        db.select({ count: count() }).from(orders).where(eq(orders.buyerId, decoded.userId)),
        db
          .select({ total: sum(orders.totalAmount) })
          .from(orders)
          .where(and(eq(orders.buyerId, decoded.userId), eq(orders.paymentStatus, "paid"))),
        db
          .select({ total: sum(orders.totalAmount) })
          .from(orders)
          .where(
            and(
              eq(orders.buyerId, decoded.userId),
              eq(orders.paymentStatus, "paid"),
              gte(orders.createdAt, currentMonth),
            ),
          ),
        db
          .select({ count: count() })
          .from(orders)
          .where(and(eq(orders.buyerId, decoded.userId), eq(orders.status, "pending"))),
      ])

      return NextResponse.json({
        totalOrders: totalOrders[0]?.count || 0,
        totalSpent: totalSpent[0]?.total || 0,
        monthlySpent: monthlySpent[0]?.total || 0,
        pendingOrders: pendingOrders[0]?.count || 0,
        userType: "buyer",
      })
    }
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
