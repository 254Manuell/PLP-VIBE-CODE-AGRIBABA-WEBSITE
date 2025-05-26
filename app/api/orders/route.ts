import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, products, users } from "@/lib/schema"
import { generateId, verifyToken } from "@/lib/auth"
import { eq, desc } from "drizzle-orm"

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

    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("userType") || "buyer"

    const userOrders = await db
      .select({
        id: orders.id,
        quantity: orders.quantity,
        unitPrice: orders.unitPrice,
        totalAmount: orders.totalAmount,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        deliveryAddress: orders.deliveryAddress,
        deliveryDate: orders.deliveryDate,
        createdAt: orders.createdAt,
        productName: products.name,
        productUnit: products.unit,
        buyerName: users.firstName,
        buyerLastName: users.lastName,
        farmerName: users.firstName,
        farmerLastName: users.lastName,
      })
      .from(orders)
      .leftJoin(products, eq(orders.productId, products.id))
      .leftJoin(users, userType === "buyer" ? eq(orders.farmerId, users.id) : eq(orders.buyerId, users.id))
      .where(userType === "buyer" ? eq(orders.buyerId, decoded.userId) : eq(orders.farmerId, decoded.userId))
      .orderBy(desc(orders.createdAt))

    return NextResponse.json({
      orders: userOrders,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { productId, quantity, deliveryAddress, deliveryDate } = body

    if (!productId || !quantity || !deliveryAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get product details
    const product = await db.select().from(products).where(eq(products.id, productId)).limit(1)
    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const productData = product[0]
    if (productData.quantityAvailable < quantity) {
      return NextResponse.json({ error: "Insufficient quantity available" }, { status: 400 })
    }

    const orderId = generateId()
    const totalAmount = productData.price * quantity

    const newOrder = {
      id: orderId,
      buyerId: decoded.userId,
      farmerId: productData.farmerId,
      productId,
      quantity,
      unitPrice: productData.price,
      totalAmount,
      deliveryAddress,
      deliveryDate,
      status: "pending" as const,
      paymentStatus: "pending" as const,
    }

    await db.insert(orders).values(newOrder)

    // Update product quantity
    await db
      .update(products)
      .set({
        quantityAvailable: productData.quantityAvailable - quantity,
        quantitySold: productData.quantitySold + quantity,
      })
      .where(eq(products.id, productId))

    return NextResponse.json({
      message: "Order created successfully",
      order: { id: orderId, ...newOrder },
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
