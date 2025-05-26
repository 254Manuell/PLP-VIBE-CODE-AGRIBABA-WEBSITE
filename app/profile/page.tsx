"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Camera, Star, Verified, Edit } from "lucide-react"

const kenyanCounties = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
]

const recentOrders = [
  {
    id: "ORD-001",
    buyer: "Safari Lodge Restaurant",
    product: "Organic Tomatoes",
    quantity: "50 kg",
    amount: "KES 6,000",
    status: "Delivered",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    buyer: "FreshMart Supermarket",
    product: "Sweet Corn",
    quantity: "100 kg",
    amount: "KES 8,000",
    status: "In Transit",
    date: "2024-01-12",
  },
  {
    id: "ORD-003",
    buyer: "Green Valley Hotel",
    product: "Green Beans",
    quantity: "25 kg",
    amount: "KES 3,750",
    status: "Delivered",
    date: "2024-01-10",
  },
]

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Wanjiku",
    email: "sarah.wanjiku@email.com",
    phone: "+254 700 123 456",
    county: "Kiambu",
    farmName: "Wanjiku Organic Farm",
    farmSize: "5",
    farmLocation: "Limuru, Kiambu County",
    bio: "Organic farmer specializing in tomatoes, green beans, and leafy vegetables. 10 years of farming experience with focus on sustainable practices.",
    specializations: ["Organic Vegetables", "Tomatoes", "Green Beans"],
    certifications: ["Organic Certification", "GlobalGAP"],
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    console.log("Saving profile:", profileData)
    setIsEditing(false)
    // Handle save logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border-green-100 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Sarah Wanjiku" />
                    <AvatarFallback className="text-2xl bg-green-100 text-green-600">SW</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-green-600 hover:bg-green-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-green-900">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <Badge className="bg-green-600 text-white">
                      <Verified className="h-3 w-3 mr-1" />
                      Verified Farmer
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.farmLocation}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9 (89 reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{profileData.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "border-green-600 text-green-600" : "bg-green-600 hover:bg-green-700"}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-green-50 border border-green-200">
              <TabsTrigger value="personal" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="farm" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Farm Details
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Order History
              </TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-900">Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="border-green-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="border-green-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Select
                      value={profileData.county}
                      onValueChange={(value) => setProfileData({ ...profileData, county: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="border-green-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {kenyanCounties.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="border-green-200"
                      placeholder="Tell buyers about yourself and your farming experience..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Farm Details */}
            <TabsContent value="farm">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-900">Farm Information</CardTitle>
                  <CardDescription>Details about your farm and agricultural practices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input
                      id="farmName"
                      value={profileData.farmName}
                      onChange={(e) => setProfileData({ ...profileData, farmName: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (acres)</Label>
                      <Input
                        id="farmSize"
                        type="number"
                        value={profileData.farmSize}
                        onChange={(e) => setProfileData({ ...profileData, farmSize: e.target.value })}
                        disabled={!isEditing}
                        className="border-green-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmLocation">Farm Location</Label>
                      <Input
                        id="farmLocation"
                        value={profileData.farmLocation}
                        onChange={(e) => setProfileData({ ...profileData, farmLocation: e.target.value })}
                        disabled={!isEditing}
                        className="border-green-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Specializations</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.specializations.map((spec, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800 border border-green-200">
                          {spec}
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newSpecs = profileData.specializations.filter((_, i) => i !== index)
                                setProfileData({ ...profileData, specializations: newSpecs })
                              }}
                              className="ml-2 text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          + Add Specialization
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Certifications</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.certifications.map((cert, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 border border-blue-200">
                          {cert}
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newCerts = profileData.certifications.filter((_, i) => i !== index)
                                setProfileData({ ...profileData, certifications: newCerts })
                              }}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                          + Add Certification
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order History */}
            <TabsContent value="orders">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-900">Recent Orders</CardTitle>
                  <CardDescription>Your recent sales and order history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="border-green-200 text-green-700">
                              {order.id}
                            </Badge>
                            <span className="font-medium text-green-900">{order.buyer}</span>
                          </div>
                          <Badge
                            className={
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "In Transit"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Product:</span>
                            <br />
                            {order.product}
                          </div>
                          <div>
                            <span className="font-medium">Quantity:</span>
                            <br />
                            {order.quantity}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span>
                            <br />
                            <span className="text-green-600 font-semibold">{order.amount}</span>
                          </div>
                          <div>
                            <span className="font-medium">Date:</span>
                            <br />
                            {order.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      View All Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
