import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const county = searchParams.get("county")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const offset = (page - 1) * limit

    let query = supabase
      .from("products")
      .select(`
        *,
        farmer:user_profiles!farmer_id (
          first_name,
          last_name,
          county
        )
      `)
      .eq("status", "active")

    // Apply filters
    if (category && category !== "All") {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    if (county) {
      query = query.eq("farmer.county", county)
    }

    const { data: products, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      products:
        products?.map((product) => ({
          ...product,
          farmer: `${product.farmer?.first_name} ${product.farmer?.last_name}`,
          location: product.farmer?.county,
        })) || [],
      pagination: {
        page,
        limit,
        hasMore: products?.length === limit,
      },
    })
  } catch (error) {
    console.error("Get products error:", error)
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
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, category, price, unit, quantityAvailable, images, organic, harvestDate, expiryDate } =
      body

    if (!name || !category || !price || !unit || !quantityAvailable) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: product, error } = await supabase
      .from("products")
      .insert({
        farmer_id: user.id,
        name,
        description,
        category,
        price: Number.parseFloat(price),
        unit,
        quantity_available: Number.parseInt(quantityAvailable),
        images: images || [],
        organic: Boolean(organic),
        harvest_date: harvestDate,
        expiry_date: expiryDate,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      message: "Product created successfully",
      product,
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
