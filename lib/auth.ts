import { supabase } from "./supabase"
import type { UserProfile } from "./supabase"

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  county?: string
  userType: "farmer" | "buyer" | "exporter" | "processor"
  farmDetails?: {
    farmName?: string
    farmSize?: number
    farmLocation?: string
    bio?: string
    specializations?: string[]
    certifications?: string[]
  }
}

export interface SignInData {
  email: string
  password: string
}

// Utility functions for legacy API compatibility
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateToken(userId: string): string {
  // Simple token generation for compatibility
  return Buffer.from(JSON.stringify({ userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64")
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString())
    if (decoded.exp > Date.now()) {
      return { userId: decoded.userId }
    }
    return null
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  // Simple hash for compatibility - in production, use proper hashing
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Main Supabase auth functions
export async function signUp(data: SignUpData) {
  const { email, password, firstName, lastName, phone, county, userType, farmDetails } = data

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
      },
    },
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (!authData.user) {
    throw new Error("Failed to create user")
  }

  // Create user profile
  const { error: profileError } = await supabase.from("user_profiles").insert({
    id: authData.user.id,
    email,
    first_name: firstName,
    last_name: lastName,
    phone,
    county,
    user_type: userType,
    verified: false,
  })

  if (profileError) {
    throw new Error(profileError.message)
  }

  // Create farmer profile if user is a farmer
  if (userType === "farmer" && farmDetails) {
    const { error: farmerError } = await supabase.from("farmer_profiles").insert({
      user_id: authData.user.id,
      farm_name: farmDetails.farmName,
      farm_size: farmDetails.farmSize,
      farm_location: farmDetails.farmLocation,
      bio: farmDetails.bio,
      specializations: farmDetails.specializations || [],
      certifications: farmDetails.certifications || [],
    })

    if (farmerError) {
      throw new Error(farmerError.message)
    }
  }

  return authData
}

export async function signIn(data: SignInData) {
  const { email, password } = data

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return authData
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  if (!user) {
    return null
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    throw new Error(profileError.message)
  }

  return { user, profile }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase.from("user_profiles").update(updates).eq("id", userId)

  if (error) {
    throw new Error(error.message)
  }
}
