import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-900 leading-tight">
                Connect Directly, <span className="text-green-600">Grow Sustainably</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                AgriBaba bridges the gap between Kenyan farmers and buyers worldwide, fostering fair trade and access to
                fresh, local produce while eliminating middlemen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup?type=farmer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg"
                >
                  Become a Farmer
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">5,000+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">15,000+</div>
                <div className="text-sm text-gray-600">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">47</div>
                <div className="text-sm text-gray-600">Counties Served</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/kenyan-farmers-hero.jpg"
                alt="Kenyan farmers working in green fields, harvesting fresh produce"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 from-opacity-20 to-transparent rounded-2xl"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
