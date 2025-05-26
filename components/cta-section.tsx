import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, ShoppingCart, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Join AgriBaba?</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Sign up today and start connecting with the agricultural community. Whether you're a farmer or buyer, we
            have the perfect solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* For Farmers */}
          <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20 hover:bg-white hover:bg-opacity-15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Farmers</h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                List your produce, connect with buyers, and get fair prices for your crops. Join thousands of farmers
                already growing their business with us.
              </p>

              <div className="space-y-2 mb-6">
                {["Direct buyer connections", "Fair pricing", "Market insights", "Secure payments"].map(
                  (feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-green-100 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span>{feature}</span>
                    </div>
                  ),
                )}
              </div>

              <Link href="/auth/signup?type=farmer">
                <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 w-full">
                  Start Selling
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* For Buyers */}
          <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20 hover:bg-white hover:bg-opacity-15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Buyers</h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                Access fresh, quality produce directly from verified farmers. Build relationships and ensure consistent
                supply for your business.
              </p>

              <div className="space-y-2 mb-6">
                {["Fresh from farm", "Quality guaranteed", "Competitive prices", "Direct communication"].map(
                  (feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-green-100 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-200" />
                      <span>{feature}</span>
                    </div>
                  ),
                )}
              </div>

              <Link href="/auth/signup?type=buyer">
                <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 w-full">
                  Start Buying
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/marketplace">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Browse Marketplace First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
