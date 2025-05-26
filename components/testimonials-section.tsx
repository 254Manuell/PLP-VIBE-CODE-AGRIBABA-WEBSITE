import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Sarah W.",
    role: "Tomato Farmer",
    location: "Kiambu County",
    content:
      "AgriBaba helped me reach new customers locally and get fair prices for my produce. It's revolutionized my farm business!",
    rating: 5,
    verified: true,
  },
  {
    name: "David O.",
    role: "Restaurant Owner",
    location: "Nairobi",
    content:
      "Finding fresh, organic produce directly from farmers has never been easier. AgriBaba is my go-to for quality ingredients.",
    rating: 5,
    verified: true,
  },
  {
    name: "Emily M.",
    role: "Export Manager",
    location: "Mombasa",
    content:
      "The platform is intuitive and connecting with farmers is simple. I love supporting local agriculture through AgriBaba.",
    rating: 5,
    verified: true,
  },
  {
    name: "Mark K.",
    role: "Avocado Farmer",
    location: "Nakuru County",
    content:
      "Managing my listings is straightforward, and the market insights are incredibly valuable. Highly recommend AgriBaba to other farmers.",
    rating: 5,
    verified: true,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from farmers and buyers who have transformed their businesses through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-300"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Quote className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 italic leading-relaxed text-lg">&quot;{testimonial.content}&quot;</p>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold text-green-900">{testimonial.name}</div>
                        {testimonial.verified && (
                          <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
