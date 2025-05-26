import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '../context/CurrencyContext'
import { FaLeaf, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa'

export default function Home() {
  const { formatPrice } = useCurrency();
  const [testimonials] = useState([
    {
      id: 1,
      content: "Agribaba has transformed how I sell my produce. I now reach buyers from all over Kenya and even export to neighboring countries!",
      author: "James Kimani",
      role: "Farmer",
      avatar: "/images/avatars/farmer1.jpg"
    },
    {
      id: 2,
      content: "Finding fresh, organic produce from local farmers has never been easier. The quality and pricing on Agribaba is unmatched!",
      author: "Sarah Wanjiku",
      role: "Buyer",
      avatar: "/images/avatars/buyer1.jpg"
    },
    {
      id: 3,
      content: "The community features have helped me learn new farming techniques and connect with other farmers facing similar challenges.",
      author: "David Mwangi",
      role: "Farmer",
      avatar: "/images/avatars/farmer2.jpg"
    },
    {
      id: 4,
      content: "Managing my farm's logistics is so much easier with Agribaba. I can track orders, payments, and deliveries all in one place.",
      author: "Mary Njeri",
      role: "Farmer",
      avatar: "/images/avatars/farmer3.jpg"
    }
  ]);
  
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      image: "/images/products/tomatoes.jpg",
      price: 120,
      unit: "kg",
      seller: "Kimani Farms",
      location: "Nakuru"
    },
    {
      id: 2,
      name: "Fresh Spinach",
      image: "/images/products/spinach.jpg",
      price: 80,
      unit: "kg",
      seller: "Green Acres",
      location: "Kiambu"
    },
    {
      id: 3,
      name: "Arboro Lettuce",
      image: "/images/products/lettuce.jpg",
      price: 150,
      unit: "kg",
      seller: "Hydroponic Solutions",
      location: "Nairobi"
    },
    {
      id: 4,
      name: "Sweet Corn",
      image: "/images/products/corn.jpg",
      price: 100,
      unit: "kg",
      seller: "Meru Highlands",
      location: "Meru"
    }
  ]);
  
  const partners = [
    { id: 1, logo: "/images/partners/partner1.png" },
    { id: 2, logo: "/images/partners/partner2.png" },
    { id: 3, logo: "/images/partners/partner3.png" },
    { id: 4, logo: "/images/partners/partner4.png" },
    { id: 5, logo: "/images/partners/partner5.png" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connect Directly, Grow Sustainably
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Agribaba bridges farmers with buyers across Kenya and beyond, creating a fair trade ecosystem that benefits all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/marketplace" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-center py-3 px-6">
                  Shop Now
                </Link>
                <Link href="/register" className="btn-secondary bg-transparent border-white hover:bg-primary-500 text-white text-center py-3 px-6">
                  Join Agribaba
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image 
                src="/images/hero-image.jpg" 
                alt="Kenyan farmer with produce" 
                width={600} 
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Agribaba */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Agribaba?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <FaLeaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                We promote environmentally-friendly farming practices.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <FaHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct From Farms</h3>
              <p className="text-gray-600">
                Connect directly with farmers, eliminating middlemen.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <FaChartLine className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-600">
                Access real-time market data and trends that matter.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <FaUsers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thriving Community</h3>
              <p className="text-gray-600">
                Join a network of farmers and buyers sharing knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Fresh Produce Spotlight</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.seller}, {product.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-bold">
                      {formatPrice(product.price)} / {product.unit}
                    </span>
                    <Link href={`/product/${product.id}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/marketplace" className="btn-primary inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      width={40} 
                      height={40}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Agribaba?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our thriving community and start connecting with the agricultural ecosystem.
          </p>
          <Link href="/register" className="btn-primary inline-block py-3 px-8 text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
      
      {/* Partners */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Our Trusted Partners</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map(partner => (
              <div key={partner.id} className="grayscale hover:grayscale-0 transition-all">
                <Image 
                  src={partner.logo} 
                  alt="Partner logo" 
                  width={120} 
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
