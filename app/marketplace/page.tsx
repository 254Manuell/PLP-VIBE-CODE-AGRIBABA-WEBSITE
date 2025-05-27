"use client"

import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, ShoppingCart, Grid, List } from "lucide-react"
import { useCurrency } from "@/components/currency-provider"

// Hardcoded product data (updated appearance)
const products = [
  {
    id: 1,
    name: "Carrots",
    description: "Sweet, crunchy carrots ideal for juicing and salads.",
    category: "Vegetables",
    price: 90,
    unit: "kg",
    images: ["/images/carrots.jpg"],
    farmer: "Kibet Farms",
    location: "Nakuru",
    organic: true,
  },
  {
    id: 2,
    name: "Avocados",
    description: "Creamy, ripe avocados perfect for salads and spreads.",
    category: "Fruits",
    price: 200,
    unit: "kg",
    images: ["/images/avocados.jpg"],
    farmer: "Omondi Orchards",
    location: "Kisii",
    organic: true,
  },
  {
    id: 3,
    name: "Passion Fruits",
    description: "Tangy and sweet passion fruits, perfect for juice.",
    category: "Fruits",
    price: 180,
    unit: "kg",
    images: ["/images/passion-fruits.jpg"],
    farmer: "Achieng Farms",
    location: "Nandi",
    organic: false,
  },
  {
    id: 4,
    name: "Dragon Fruits",
    description: "Exotic dragon fruits, rich in antioxidants.",
    category: "Fruits",
    price: 350,
    unit: "kg",
    images: ["/images/dragon-fruits.jpg"],
    farmer: "Waweru Exotics",
    location: "Thika",
    organic: true,
  },
  {
    id: 5,
    name: "Sweet Potatoes",
    description: "Nutritious sweet potatoes, great for roasting.",
    category: "Roots",
    price: 70,
    unit: "kg",
    images: ["/images/Sweet Potatoes.jpg"],
    farmer: "Mwikali Roots",
    location: "Kitui",
    organic: true,
  },
  {
    id: 6,
    name: "Limes",
    description: "Zesty limes, perfect for drinks and cooking.",
    category: "Fruits",
    price: 60,
    unit: "kg",
    images: ["/images/limes.jpg"],
    farmer: "Mutua Citrus",
    location: "Machakos",
    organic: false,
  },
  {
    id: 7,
    name: "Rice",
    description: "Locally grown rice, soft and aromatic.",
    category: "Grains",
    price: 130,
    unit: "kg",
    images: ["/images/rice.jpg"],
    farmer: "Omondi Rice Fields",
    location: "Ahero",
    organic: false,
  },
  {
    id: 8,
    name: "Watermelon",
    description: "Juicy watermelon, perfect for hot days.",
    category: "Fruits",
    price: 100,
    unit: "each",
    images: ["/images/watermelon.jpg"],
    farmer: "Chebet Melons",
    location: "Bomet",
    organic: true,
  },
  {
    id: 9,
    name: "Sweet Corn",
    description: "Tender sweet corn, ideal for boiling or grilling.",
    category: "Vegetables",
    price: 110,
    unit: "kg",
    images: ["/images/sweet-corn.jpg"],
    farmer: "Kipkorir Cornfields",
    location: "Uasin Gishu",
    organic: false,
  },
  {
    id: 10,
    name: "Green Beans",
    description: "Crisp and fresh green beans, great for stir fry.",
    category: "Vegetables",
    price: 100,
    unit: "kg",
    images: ["/images/green-beans.jpg"],
    farmer: "Chebet Greens",
    location: "Kericho",
    organic: true,
  },
  {
    id: 11,
    name: "Tomatoes",
    description: "Juicy, organic tomatoes direct from our farm.",
    category: "Vegetables",
    price: 120,
    unit: "kg",
    images: ["/images/tomatoes.jpg"],
    farmer: "Wanjiku Farm",
    location: "Kiambu",
    organic: true,
  },
  {
    id: 12,
    name: "Oranges",
    description: "Delicious, vitamin-rich oranges.",
    category: "Fruits",
    price: 80,
    unit: "dozen",
    images: ["/images/Oranges.jpg"],
    farmer: "Kamau Orchards",
    location: "Muranga",
    organic: false,
  },
  {
    id: 13,
    name: "White Maize",
    description: "High-yield, drought-resistant maize.",
    category: "Grains",
    price: 60,
    unit: "kg",
    images: ["/images/white-maize.jpg"],
    farmer: "Otieno Farms",
    location: "Kisumu",
    organic: false,
  },
];

export default function MarketplacePage() {
  const { formatPrice } = useCurrency()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-30 w-full">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center space-x-4">
            <img src="/images/AGRIBABA LOGO.jpg" alt="AgriBaba Logo" className="h-10 w-10 rounded-full object-cover border-2 border-green-600 bg-white p-1" />
            <span className="text-2xl font-bold text-green-700">AgriBaba</span>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6 text-green-700" />
            </Button>
            <Button variant="ghost" size="icon">
              <img src="/placeholder-user.jpg" alt="User" className="h-8 w-8 rounded-full" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="rounded-2xl overflow-hidden mb-8 relative bg-green-100 flex items-center h-56">
          <img
            src="/images/AGRIBABA LOGO.jpg"
            alt="AgriBaba Logo Background"
            className="absolute inset-0 w-full h-full object-contain opacity-20 bg-white"
          />
          <div className="relative z-10 p-8 flex flex-col items-center">
            <img src="/images/AGRIBABA LOGO.jpg" alt="AgriBaba Logo" className="h-20 w-20 rounded-full object-cover border-4 border-green-600 bg-white mb-4 shadow-lg" />
            <h1 className="text-3xl md:text-5xl font-bold text-green-900 mb-2 drop-shadow-lg text-center">
              Welcome to AgriBaba Marketplace
            </h1>
            <p className="text-lg md:text-2xl text-green-800 font-medium drop-shadow text-center">
              Find the best farm produce directly from Kenyan farmers
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1">Organic</Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-green-900 mb-1">{product.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4 mr-1" /> {product.farmer}
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-green-700">
                      KES {product.price} / {product.unit}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">Category: {product.category}</div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* End Product Grid */}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            Load More Products
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
