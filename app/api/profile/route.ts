import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, farmerProfiles } from "@/lib/schema"
import { verifyToken } from "@/lib/auth"
import { eq } from "drizzle-orm"

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

    const user = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1)
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userData = user[0]
    let profile = null

    if (userData.userType === "farmer") {
      const farmerProfile = await db
        .select()
        .from(farmerProfiles)
        .where(eq(farmerProfiles.userId, decoded.userId))
        .limit(1)

      if (farmerProfile.length > 0) {
        profile = {
          ...farmerProfile[0],
          specializations: farmerProfile[0].specializations ? JSON.parse(farmerProfile[0].specializations) : [],
          certifications: farmerProfile[0].certifications ? JSON.parse(farmerProfile[0].certifications) : [],
        }
      }
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        county: userData.county,
        userType: userData.userType,
        verified: userData.verified,
      },
      profile,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
    const { user: userUpdates, profile: profileUpdates } = body

    // Update user information
    if (userUpdates) {
      const { firstName, lastName, phone, county } = userUpdates
      await db
        .update(users)
        .set({
          firstName,
          lastName,
          phone,
          county,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(users.id, decoded.userId))
    }

    // Update farmer profile if provided
    if (profileUpdates) {
      const { farmName, farmSize, farmLocation, bio, specializations, certifications } = profileUpdates

      const existingProfile = await db
        .select()
        .from(farmerProfiles)
        .where(eq(farmerProfiles.userId, decoded.userId))
        .limit(1)

      const profileData = {
        farmName,
        farmSize: farmSize ? Number.parseFloat(farmSize) : null,
        farmLocation,
        bio,
        specializations: specializations ? JSON.stringify(specializations) : null,
        certifications: certifications ? JSON.stringify(certifications) : null,
        updatedAt: new Date().toISOString(),
      }

      if (existingProfile.length > 0) {
        await db.update(farmerProfiles).set(profileData).where(eq(farmerProfiles.userId, decoded.userId))
      } else {
        await db.insert(farmerProfiles).values({
          id: `profile_${decoded.userId}`,
          userId: decoded.userId,
          ...profileData,
        })
      }
    }

    return NextResponse.json({
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
