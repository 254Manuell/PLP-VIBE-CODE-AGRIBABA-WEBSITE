import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products, users } from "@/lib/schema"
import { verifyToken } from "@/lib/auth"
import { deleteImage } from "@/lib/blob"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        category: products.category,
        price: products.price,
        unit: products.unit,
        quantityAvailable: products.quantityAvailable,
        quantitySold: products.quantitySold,
        images: products.images,
        organic: products.organic,
        harvestDate: products.harvestDate,
        expiryDate: products.expiryDate,
        status: products.status,
        createdAt: products.createdAt,
        farmerName: users.firstName,
        farmerLastName: users.lastName,
        farmerCounty: users.county,
        farmerId: products.farmerId,
      })
      .from(products)
      .leftJoin(users, eq(products.farmerId, users.id))
      .where(eq(products.id, params.id))
      .limit(1)

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const productData = product[0]
    return NextResponse.json({
      ...productData,
      images: productData.images ? JSON.parse(productData.images) : [],
      farmer: `${productData.farmerName} ${productData.farmerLastName}`,
      location: productData.farmerCounty,
    })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if product exists and belongs to the user
    const existingProduct = await db.select().from(products).where(eq(products.id, params.id)).limit(1)

    if (existingProduct.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (existingProduct[0].farmerId !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      description,
      category,
      price,
      unit,
      quantityAvailable,
      images,
      organic,
      harvestDate,
      expiryDate,
      status,
    } = body

    const updatedProduct = {
      name,
      description,
      category,
      price: price ? Number.parseFloat(price) : existingProduct[0].price,
      unit,
      quantityAvailable: quantityAvailable ? Number.parseInt(quantityAvailable) : existingProduct[0].quantityAvailable,
      images: images ? JSON.stringify(images) : existingProduct[0].images,
      organic: organic !== undefined ? Boolean(organic) : existingProduct[0].organic,
      harvestDate,
      expiryDate,
      status,
      updatedAt: new Date().toISOString(),
    }

    await db.update(products).set(updatedProduct).where(eq(products.id, params.id))

    return NextResponse.json({
      message: "Product updated successfully",
      product: { id: params.id, ...updatedProduct },
    })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if product exists and belongs to the user
    const existingProduct = await db.select().from(products).where(eq(products.id, params.id)).limit(1)

    if (existingProduct.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (existingProduct[0].farmerId !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete associated images from blob storage
    if (existingProduct[0].images) {
      const imageUrls = JSON.parse(existingProduct[0].images)
      for (const url of imageUrls) {
        try {
          await deleteImage(url)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    await db.delete(products).where(eq(products.id, params.id))

    return NextResponse.json({
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
