import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, farmerProfiles } from "@/lib/schema"
import { hashPassword, generateId, generateToken } from "@/lib/auth"
import { eq } from "drizzle-orm"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, phone, county, userType, farmDetails } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const userId = generateId()

    const newUser = {
      id: userId,
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      county,
      userType,
      verified: false,
    }

    await db.insert(users).values(newUser)

    // Create farmer profile if user is a farmer
    if (userType === "farmer" && farmDetails) {
      const farmerProfileId = generateId()
      await db.insert(farmerProfiles).values({
        id: farmerProfileId,
        userId,
        farmName: farmDetails.farmName,
        farmSize: farmDetails.farmSize,
        farmLocation: farmDetails.farmLocation,
        bio: farmDetails.bio,
        specializations: JSON.stringify(farmDetails.specializations || []),
        certifications: JSON.stringify(farmDetails.certifications || []),
      })
    }

    // Generate JWT token
    const token = generateToken(userId)

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: userId,
        email,
        firstName,
        lastName,
        userType,
      },
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
