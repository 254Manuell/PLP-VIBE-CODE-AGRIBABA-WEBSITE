"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShoppingCart } from "lucide-react"
import { useCurrency } from "@/components/currency-provider"
import Link from "next/link"

const featuredProduce = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 120,
    unit: "kg",
    farmer: "Sarah Wanjiku",
    location: "Kiambu County",
    rating: 4.9,
    image: "/images/tomatoes.jpg",
    badge: "Organic",
    badgeColor: "bg-green-600",
  },
  {
    id: 2,
    name: "Fresh Avocados",
    price: 200,
    unit: "kg",
    farmer: "John Mwangi",
    location: "Murang'a County",
    rating: 4.8,
    image: "/images/avocados.jpg",
    badge: "Premium",
    badgeColor: "bg-yellow-600",
  },
  {
    id: 3,
    name: "Sweet Maize",
    price: 80,
    unit: "kg",
    farmer: "Grace Akinyi",
    location: "Nakuru County",
    rating: 4.7,
    image: "/images/sweet-corn.jpg",
    badge: "Fresh",
    badgeColor: "bg-blue-600",
  },
  {
    id: 4,
    name: "Green Beans",
    price: 150,
    unit: "kg",
    farmer: "Peter Kimani",
    location: "Meru County",
    rating: 4.9,
    image: "/images/green-beans.jpg",
    badge: "Export Quality",
    badgeColor: "bg-purple-600",
  },
]

export function ProduceSpotlight() {
  const { formatPrice } = useCurrency()

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Fresh Produce Spotlight</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the finest quality produce from verified farmers across Kenya. All products are carefully selected
            for freshness and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProduce.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg?height=300&width=300"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white`}>{product.badge}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-green-900 text-lg">{product.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)} / {product.unit}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">by {product.farmer}</div>

                  <Link href={`/marketplace?search=${encodeURIComponent(product.name)}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:shadow-md transition-all duration-300">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/marketplace">
            <Button
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:shadow-md transition-all duration-300"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
