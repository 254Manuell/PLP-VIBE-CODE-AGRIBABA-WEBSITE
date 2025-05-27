import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Heart, Leaf, Globe, TrendingUp, Shield } from "lucide-react"

// NOTE: Place the following images in the public/images directory:
// - public/images/emmanuel.jpg
// - public/images/eugene.jpg
// - public/images/brilliant.jpg

const teamMembers = [
  {
    name: "Emmanuel Ngunnzi",
    role: "CEO",
    image: "/images/manuel.jpg",
    bio: "Visionary founder and CEO leading AgriBaba's mission to transform agriculture in Kenya.",
  },
  {
    name: "Eugene Ambagwa",
    role: "Full Stack Software Developer",
    image: "/images/WhatsApp Image 2025-05-26 at 09.54.23.jpeg",
    bio: "Builder of robust digital solutions powering the AgriBaba platform.",
  },
  {
    name: "Brilliant Mwendwa",
    role: "CFO",
    image: "/images/WhatsApp Image 2025-05-26 at 08.43.34.jpeg",
    bio: "Financial strategist ensuring sustainable growth and impact for AgriBaba.",
  },
]


const values = [
  {
    icon: Heart,
    title: "Farmer First",
    description: "We prioritize the needs and success of our farming community above all else.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Building trust through transparent practices and secure transactions.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connecting Kenyan farmers to local and international markets.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Promoting sustainable farming practices and environmental stewardship.",
  },
]

const milestones = [
  { year: "April 2025", event: "AgriBaba launches a new AI-powered marketplace platform" },
  { year: "May 2025", event: "Onboarded 10,000+ farmers and 25,000+ products available" },
  { year: "June 2025", event: "First successful international shipment to Europe" },
  { year: "July 2025", event: "Launched AgriBaba mobile app for Android and iOS" },
  { year: "August 2025", event: "Introduced digital payment and instant settlement for farmers" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="bg-green-600 text-white mb-4">About AgriBaba</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-green-900 mb-6">
                Transforming Agriculture, <span className="text-green-600">One Connection at a Time</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                AgriBaba is Kenya&apos;s premier agricultural marketplace, connecting farmers directly with buyers to
                create a more equitable and sustainable food system. We&apos;re eliminating middlemen and empowering
                farmers to get fair prices for their produce.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/images/download (5).jpg"
                  alt="Farmers working in the field"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                    <h2 className="text-3xl font-bold text-green-900">Our Mission</h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To create a direct connection between Kenyan farmers and buyers, ensuring fair prices, quality
                    produce, and sustainable livelihoods. We believe that by eliminating unnecessary middlemen, we can
                    create a more equitable agricultural ecosystem.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                    <h2 className="text-3xl font-bold text-green-900">Our Vision</h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To become Africa&apos;s leading agricultural marketplace, where every farmer has access to fair
                    markets and every buyer can source quality produce directly from verified farmers. We envision a
                    future where technology bridges the gap between farm and table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These values guide everything we do and shape how we serve our farming and buying communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team combines agricultural expertise, technology innovation, and deep understanding of
                Kenya&apos;s farming landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-green-100 overflow-hidden">
                  <div className="aspect-square overflow-hidden flex justify-center items-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Since our founding, we&apos;ve made significant strides in transforming Kenya&apos;s agricultural
                landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">5,000+</div>
                <div className="text-xl font-semibold text-green-100 mb-2">Farmers Empowered</div>
                <div className="text-green-200 text-sm">Across all 47 counties</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">KES 2.5B+</div>
                <div className="text-xl font-semibold text-green-100 mb-2">Trade Volume</div>
                <div className="text-green-200 text-sm">Direct farmer-to-buyer sales</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">25+</div>
                <div className="text-xl font-semibold text-green-100 mb-2">Export Countries</div>
                <div className="text-green-200 text-sm">International market reach</div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">15,000+</div>
                <div className="text-xl font-semibold text-green-100 mb-2">Products Listed</div>
                <div className="text-green-200 text-sm">Fresh produce daily</div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small idea to Kenya&apos;s leading agricultural marketplace - here&apos;s how we&apos;ve grown.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-3">
                      <p className="text-gray-700 text-lg leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
