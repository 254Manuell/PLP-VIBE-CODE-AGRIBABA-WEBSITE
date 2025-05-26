"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, ShoppingCart, Grid, List } from "lucide-react"
import { useCurrency } from "@/components/currency-provider"

const categories = ["All", "Vegetables", "Fruits", "Grains", "Herbs & Spices", "Dairy & Eggs", "Meat & Poultry"]

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 120,
    unit: "kg",
    farmer: "Sarah Wanjiku",
    location: "Kiambu County",
    rating: 4.9,
    reviews: 45,
    image: "/images/tomatoes.jpg",
    badge: "Organic",
    badgeColor: "bg-green-600",
    category: "Vegetables",
    description:
      "Fresh, juicy organic tomatoes grown without pesticides. Perfect for salads, cooking, and sauces. Rich in vitamins and antioxidants.",
  },
  {
    id: 2,
    name: "Fresh Avocados",
    price: 200,
    unit: "kg",
    farmer: "John Mwangi",
    location: "Murang'a County",
    rating: 4.8,
    reviews: 32,
    image: "/images/avocados.jpg",
    badge: "Premium",
    badgeColor: "bg-yellow-600",
    category: "Fruits",
    description:
      "Creamy, nutrient-rich Hass avocados. Excellent source of healthy fats, fiber, and potassium. Perfect for guacamole, salads, or toast.",
  },
  {
    id: 3,
    name: "Sweet Maize",
    price: 80,
    unit: "kg",
    farmer: "Grace Akinyi",
    location: "Nakuru County",
    rating: 4.7,
    reviews: 28,
    image: "/images/sweet-corn.jpg",
    badge: "Fresh",
    badgeColor: "bg-blue-600",
    category: "Grains",
    description:
      "Sweet, tender maize kernels harvested at peak freshness. High in fiber and natural sugars. Great for boiling, roasting, or making ugali.",
  },
  {
    id: 4,
    name: "Green Beans",
    price: 150,
    unit: "kg",
    farmer: "Peter Kimani",
    location: "Meru County",
    rating: 4.9,
    reviews: 67,
    image: "/images/green-beans.jpg",
    badge: "Export Quality",
    badgeColor: "bg-purple-600",
    category: "Vegetables",
    description:
      "Crisp, tender green beans meeting international export standards. Rich in vitamins A, C, and K. Perfect for stir-fries, salads, or steaming.",
  },
  {
    id: 5,
    name: "Passion Fruits",
    price: 180,
    unit: "kg",
    farmer: "Mary Njeri",
    location: "Nyeri County",
    rating: 4.6,
    reviews: 23,
    image: "/images/passion-fruits.jpg",
    badge: "Sweet",
    badgeColor: "bg-orange-600",
    category: "Fruits",
    description:
      "Aromatic passion fruits with golden, seed-filled pulp. Bursting with tropical flavor and vitamin C. Ideal for juices, desserts, and cocktails.",
  },
  {
    id: 6,
    name: "White Maize",
    price: 60,
    unit: "kg",
    farmer: "James Kiprop",
    location: "Uasin Gishu County",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Grade A",
    badgeColor: "bg-indigo-600",
    category: "Grains",
    description:
      "Premium white maize kernels, carefully dried and sorted. Staple grain perfect for making ugali, posho, and other traditional dishes.",
  },
  {
    id: 7,
    name: "Dragon Fruits",
    price: 250,
    unit: "kg",
    farmer: "Alice Wambui",
    location: "Machakos County",
    rating: 4.7,
    reviews: 34,
    image: "/images/dragon-fruits.jpg",
    badge: "Exotic",
    badgeColor: "bg-pink-600",
    category: "Fruits",
    description:
      "Exotic dragon fruits with vibrant pink skin and white flesh dotted with black seeds. Mildly sweet with a unique texture, rich in antioxidants.",
  },
  {
    id: 8,
    name: "Fresh Limes",
    price: 90,
    unit: "kg",
    farmer: "Michael Kiprotich",
    location: "Kwale County",
    rating: 4.8,
    reviews: 56,
    image: "/images/limes.jpg",
    badge: "Citrus Fresh",
    badgeColor: "bg-lime-600",
    category: "Fruits",
    description:
      "Juicy, aromatic limes with bright green skin. High in vitamin C and citric acid. Perfect for cooking, beverages, and natural preservation.",
  },
  {
    id: 9,
    name: "Sweet Potatoes",
    price: 70,
    unit: "kg",
    farmer: "Ruth Chebet",
    location: "Bomet County",
    rating: 4.8,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Nutritious",
    badgeColor: "bg-amber-600",
    category: "Vegetables",
    description:
      "Orange-fleshed sweet potatoes packed with beta-carotene and fiber. Naturally sweet and versatile for roasting, boiling, or baking.",
  },
  {
    id: 10,
    name: "Fresh Carrots",
    price: 85,
    unit: "kg",
    farmer: "David Mutua",
    location: "Nyandarua County",
    rating: 4.7,
    reviews: 38,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Crunchy",
    badgeColor: "bg-orange-500",
    category: "Vegetables",
    description:
      "Crisp, sweet carrots rich in beta-carotene and fiber. Excellent for snacking, cooking, or juicing. Supports eye health and immunity.",
  },
]

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { formatPrice } = useCurrency()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover fresh produce from verified farmers across Kenya</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products, farmers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="newest">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">Showing {filteredProducts.length} products</div>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-green-100 group"
            >
              {viewMode === "grid" ? (
                <>
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
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

                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(product.price)} / {product.unit}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">by {product.farmer}</div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <Badge className={`absolute -top-2 -right-2 ${product.badgeColor} text-white text-xs`}>
                        {product.badge}
                      </Badge>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-green-900 text-xl mb-1">{product.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{product.location}</span>
                            </div>
                            <span>by {product.farmer}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            {formatPrice(product.price)} / {product.unit}
                          </div>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

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
