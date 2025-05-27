import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Search, Truck, Shield, Users, BarChart3, Leaf } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Leaf,
    title: "Fresh from Farm",
    description: "Source the freshest produce directly from verified farmers, ensuring quality and traceability.",
  },
  {
    icon: BarChart3,
    title: "Competitive Pricing",
    description: "Get better prices by eliminating middlemen and dealing directly with farmers.",
  },
  {
    icon: Search,
    title: "Easy Discovery",
    description: "Find exactly what you need with advanced search and filtering by location, quality, and price.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "All farmers are verified and products are quality-checked before listing.",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    description: "Build long-term relationships with farmers for consistent supply of your needed produce.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "Communicate directly with farmers to negotiate terms and build partnerships.",
  },
]

const buyerTypes = [
  {
    title: "Restaurants & Hotels",
    description: "Source fresh ingredients directly from local farmers for your kitchen.",
    features: ["Bulk ordering", "Custom specifications", "Regular delivery schedules", "Chef-farmer connections"],
    image: "/images/luxury-hotel.jpg",
  },
  {
    title: "Retailers & Supermarkets",
    description: "Stock your shelves with the freshest produce from verified farmers.",
    features: ["Wholesale pricing", "Quality guarantees", "Flexible quantities", "Branding support"],
    image: "/images/modern-supermarket.jpg",
  },
  {
    title: "Exporters",
    description: "Access export-quality produce for international markets.",
    features: ["Export certifications", "Large volumes", "Quality standards", "Documentation support"],
    image: "/images/export-shipping.jpg",
  },
  {
    title: "Food Processors",
    description: "Source raw materials directly from farmers for processing.",
    features: ["Bulk purchasing", "Contract farming", "Seasonal planning", "Quality specifications"],
    image: "/images/food-processing-facility.jpg",
  },
]

const steps = [
  {
    step: "01",
    title: "Browse Products",
    description: "Explore thousands of fresh produce listings from verified farmers across Kenya.",
  },
  {
    step: "02",
    title: "Connect with Farmers",
    description: "Contact farmers directly to discuss quantities, pricing, and delivery terms.",
  },
  {
    step: "03",
    title: "Place Orders",
    description: "Secure your orders with our trusted payment system and track delivery.",
  },
  {
    step: "04",
    title: "Build Relationships",
    description: "Develop long-term partnerships with reliable farmers for consistent supply.",
  },
]

const testimonials = [
  {
    name: "Maria Gonzalez",
    role: "Head Chef",
    company: "Safari Lodge Restaurant",
    quote: "The quality of produce we get from AgriBaba is exceptional. Our guests love the fresh, local ingredients.",
  },
  {
    name: "David Kimathi",
    role: "Procurement Manager",
    company: "FreshMart Supermarkets",
    quote:
      "AgriBaba has revolutionized our sourcing. We get better prices and fresher produce than traditional suppliers.",
  },
  {
    name: "Sarah Johnson",
    role: "Export Director",
    company: "Kenya Exports Ltd",
    quote: "Finding export-quality produce has never been easier. The platform connects us directly with top farmers.",
  },
]

export default function BuyersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-blue-600 text-white">For Buyers</Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-green-900 leading-tight">
                    Source Directly, <span className="text-green-600">Save More</span>
                  </h1>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Connect directly with verified Kenyan farmers to source the freshest produce at competitive prices.
                    Skip the middlemen and build lasting partnerships with quality suppliers.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/marketplace">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                      Browse Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup?type=buyer">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg"
                    >
                      Join as Buyer
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">15,000+</div>
                    <div className="text-sm text-gray-600">Products Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">2,000+</div>
                    <div className="text-sm text-gray-600">Verified Buyers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">25+</div>
                    <div className="text-sm text-gray-600">Export Countries</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/images/saving-money-jar.jpg"
                  alt="Person saving money in a jar, representing cost savings from direct sourcing"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-300 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Why Buyers Trust AgriBaba</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of buyers who have streamlined their sourcing and improved their supply chain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-green-100 hover:border-green-300 transition-colors duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Perfect for Every Type of Buyer</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you are a restaurant, retailer, exporter, or processor, we have the right solution for your
                needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {buyerTypes.map((type, index) => (
                <Card key={index} className="border-green-100 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={type.image || "/placeholder.svg"}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                    <div className="space-y-2">
                      {type.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start sourcing quality produce in four simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/marketplace">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                  Start Browsing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Buyer Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how businesses have improved their sourcing with AgriBaba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-green-100">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-green-900 text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-green-600">{testimonial.company}</p>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">{`"${testimonial.quote}"`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Everything You Need for Smart Sourcing
                </h2>
                <div className="space-y-4">
                  {[
                    "Advanced search and filtering options",
                    "Direct farmer communication tools",
                    "Quality verification and certifications",
                    "Secure payment and escrow services",
                    "Order tracking and delivery management",
                    "Volume discounts and bulk ordering",
                    "Market price insights and analytics",
                    "24/7 customer support and assistance",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-200 flex-shrink-0" />
                      <span className="text-green-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/images/⏱️%20Get%20more%20done%20with%20AI%20automation_%20See%20how%20AI%E2%80%A6.jpg"
                  alt="Get more done with AI automation"
                  className="rounded-2xl shadow-2xl max-w-full h-auto lg:max-w-md"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Ready to Source Smarter?</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of buyers who are already sourcing fresh produce directly from Kenyan farmers. Start your
                journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup?type=buyer">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                    Sign Up as a Buyer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4"
                  >
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
