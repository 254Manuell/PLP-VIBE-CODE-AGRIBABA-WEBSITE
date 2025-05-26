import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Smartphone, BarChart3, Users, DollarSign, Globe, Leaf } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description: "Get competitive prices for your produce by connecting directly with buyers, eliminating middlemen.",
  },
  {
    icon: Globe,
    title: "Market Access",
    description: "Reach local and international buyers through our extensive network of verified purchasers.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description: "Access real-time pricing data and market trends to make informed farming decisions.",
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description: "List your products in minutes with our user-friendly mobile and web platform.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a community of farmers sharing knowledge, tips, and best practices.",
  },
  {
    icon: Leaf,
    title: "Sustainable Farming",
    description: "Promote and get premium prices for organic and sustainably grown produce.",
  },
]

const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and complete your farmer profile with farm details and location.",
  },
  {
    step: "02",
    title: "List Your Produce",
    description: "Upload photos and details of your fresh produce with competitive pricing.",
  },
  {
    step: "03",
    title: "Connect with Buyers",
    description: "Receive inquiries from verified buyers and negotiate deals directly.",
  },
  {
    step: "04",
    title: "Secure Payment",
    description: "Complete transactions safely with our secure payment processing system.",
  },
]

const testimonials = [
  {
    name: "John Mwangi",
    location: "Murang&apos;a County",
    crop: "Avocado Farmer",
    quote: "AgriBaba helped me increase my income by 40%. I now sell directly to exporters in Nairobi!",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Grace Akinyi",
    location: "Nakuru County",
    crop: "Vegetable Farmer",
    quote: "The platform is so easy to use. I list my vegetables and get buyers within hours.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Peter Kimani",
    location: "Meru County",
    crop: "Coffee Farmer",
    quote: "Market insights feature helps me time my harvest perfectly. My profits have doubled!",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function FarmersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-green-600 text-white">For Farmers</Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-green-900 leading-tight">
                    Grow Your Farm, <span className="text-green-600">Grow Your Income</span>
                  </h1>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Connect directly with buyers, get fair prices for your produce, and take control of your farming
                    business. Join thousands of Kenyan farmers already growing their success with AgriBaba.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/signup?type=farmer">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                      Start Selling Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg"
                    >
                      View Marketplace
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">5,000+</div>
                    <div className="text-sm text-gray-600">Active Farmers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">KES 2.5B+</div>
                    <div className="text-sm text-gray-600">Farmer Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">47</div>
                    <div className="text-sm text-gray-600">Counties Served</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/images/farmers-working.jpg"
                  alt="Happy Kenyan farmers working together in green fields, cultivating fresh produce"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-300 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Why Farmers Choose AgriBaba</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of farmers who have transformed their agricultural business through our platform.
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

        {/* How It Works */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Getting started is simple. Follow these four easy steps to begin selling your produce.
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
              <Link href="/auth/signup?type=farmer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from farmers who have transformed their businesses through AgriBaba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-green-100">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-green-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.crop}</p>
                        <p className="text-sm text-green-600">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="py-20 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Everything You Need to Succeed as a Farmer
                </h2>
                <div className="space-y-4">
                  {[
                    "Mobile-friendly platform accessible anywhere",
                    "Real-time market pricing and demand data",
                    "Direct communication with verified buyers",
                    "Secure payment processing and protection",
                    "Weather alerts and farming tips",
                    "Community forum and farmer support",
                    "Quality certification and grading tools",
                    "Export assistance and international markets",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-200 flex-shrink-0" />
                      <span className="text-green-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/successful-farmer-carrots.jpg"
                  alt="Successful farmer proudly displaying fresh carrots from her harvest"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Ready to Transform Your Farm?</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of Kenyan farmers who are already earning more through direct sales. Start your journey
                today - it&apos;s completely free!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup?type=farmer">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                    Sign Up as a Farmer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4"
                  >
                    View Demo Dashboard
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
