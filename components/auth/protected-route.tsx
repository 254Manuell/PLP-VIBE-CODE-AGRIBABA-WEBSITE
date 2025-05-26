"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Logo } from "@/components/logo"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: "farmer" | "buyer" | "exporter" | "processor"
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin")
        return
      }

      if (requiredUserType && profile?.user_type !== requiredUserType) {
        router.push("/dashboard")
        return
      }
    }
  }, [user, profile, loading, requiredUserType, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <Logo size="xl" linkTo="" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce animate-bounce-delay-1"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce animate-bounce-delay-2"></div>
          </div>
          <p className="text-green-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || (requiredUserType && profile?.user_type !== requiredUserType)) {
    return null
  }

  return <>{children}</>
}
