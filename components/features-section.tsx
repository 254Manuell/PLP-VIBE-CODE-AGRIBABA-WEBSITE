import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Handshake, ShoppingCart, TrendingUp, Users, Shield, Globe } from "lucide-react"

const features = [
  {
    icon: Handshake,
    title: "Direct Trade",
    description: "Connect farmers directly with buyers, ensuring fair prices and eliminating unnecessary middlemen.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: ShoppingCart,
    title: "Fresh from Farm",
    description: "Purchase produce directly from farmers, guaranteeing quality and freshness for your business.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Get real-time market data and pricing trends to make informed decisions about your crops.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Users,
    title: "Thriving Community",
    description: "Join a network of passionate farmers and conscious buyers committed to sustainable agriculture.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure payment processing with buyer protection and farmer guarantees.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access international markets and connect with buyers from around the world.",
    color: "bg-indigo-100 text-indigo-600",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Farmer Image Section */}
        <div className="mb-12">
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/images/kenyan-farmer.jpg"
              alt="Kenyan farmer with fresh vegetables"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="bg-green-600 text-white mb-2">Empowering Farmers</Badge>
              <h3 className="text-2xl font-bold">Real Farmers, Real Success</h3>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Why Choose AgriBaba?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re revolutionizing agriculture in Kenya by creating direct connections between farmers and buyers,
            ensuring everyone benefits from fair trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
