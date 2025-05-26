"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, Users, DollarSign, Plus, Star } from "lucide-react"
import { useCurrency } from "@/components/currency-provider"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const { formatPrice } = useCurrency()
  const { user, profile } = useAuth()
  const [stats, setStats] = useState({
    totalListings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingOrders: 0,
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && profile) {
      fetchDashboardData()
    }
  }, [user, profile])

  const fetchDashboardData = async () => {
    try {
      if (profile?.user_type === "farmer") {
        // Fetch farmer stats
        const { data: productsData } = await supabase.from("products").select("*").eq("farmer_id", user?.id).limit(5)

        const { data: ordersData } = await supabase
          .from("orders")
          .select("total_amount, status, payment_status")
          .eq("farmer_id", user?.id)

        setProducts(productsData || [])

        const totalRevenue =
          ordersData
            ?.filter((order) => order.payment_status === "paid")
            .reduce((sum, order) => sum + order.total_amount, 0) || 0

        const pendingOrders = ordersData?.filter((order) => order.status === "pending").length || 0

        setStats({
          totalListings: productsData?.length || 0,
          totalRevenue,
          monthlyRevenue: totalRevenue * 0.3, // Simplified calculation
          pendingOrders,
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-green-900 mb-2">
                  Welcome, {profile?.first_name} {profile?.last_name}! 👋
                </h1>
                <p className="text-gray-600">Here's a quick overview of your {profile?.user_type} dashboard.</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Profile Completion</div>
                  <div className="text-lg font-semibold text-green-600">75%</div>
                </div>
                <div className="w-16 h-16 relative">
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-green-600 border-t-transparent transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-600">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Listings</p>
                    <p className="text-2xl font-bold text-green-900">{stats.totalListings}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+2 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-green-900">{stats.pendingOrders}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">Respond within 24hrs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-900">{formatPrice(stats.totalRevenue)}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+15% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Community Ranking</p>
                    <p className="text-2xl font-bold text-green-900">Top 10%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">{profile?.county} County</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Products */}
          <Card className="border-green-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-green-900">Your Recent Products</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.length > 0 ? (
                  products.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 border border-green-100 rounded-lg"
                    >
                      <img
                        src={product.images?.[0] || "/placeholder.svg?height=64&width=64"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-900">{product.name}</h3>
                          <Badge variant={product.status === "active" ? "default" : "destructive"}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {formatPrice(product.price)} / {product.unit} • {product.quantity_sold}/
                          {product.quantity_available} sold
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((product.quantity_sold / product.quantity_available) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No products yet. Start by adding your first product!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
