import { TrendingUp, Users, Package, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Registered Farmers",
    description: "Active farmers across all 47 counties in Kenya",
    color: "bg-white/20",
  },
  {
    icon: Package,
    value: "15,000+",
    label: "Products Listed",
    description: "Fresh produce available daily on our platform",
    color: "bg-white/20",
  },
  {
    icon: TrendingUp,
    value: "KES 2.5B+",
    label: "Trade Volume",
    description: "Total value of transactions facilitated",
    color: "bg-white/20",
  },
  {
    icon: Globe,
    value: "25+",
    label: "Export Countries",
    description: "International markets reached by our farmers",
    color: "bg-white/20",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-green-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Transforming Agriculture in Kenya</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our platform has created significant impact across Kenya's agricultural sector, empowering farmers and
            connecting them with global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20 hover:bg-white hover:bg-opacity-15 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-green-100 mb-2">{stat.label}</div>
                <div className="text-green-200 text-sm leading-relaxed">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
