import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/agribaba-logo.png" alt="AgriBaba Logo" className="h-12 w-auto" />
            </div>
            <p className="text-gray-600">
              Connecting Kenyan farmers directly with buyers worldwide, eliminating middlemen and ensuring fair prices
              for quality produce.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/marketplace" className="block text-gray-600 hover:text-green-600">
                Marketplace
              </Link>
              <Link href="/farmers" className="block text-gray-600 hover:text-green-600">
                For Farmers
              </Link>
              <Link href="/buyers" className="block text-gray-600 hover:text-green-600">
                For Buyers
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-green-600">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-green-600">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-600 hover:text-green-600">
                Help Center
              </Link>
              <Link href="/shipping" className="block text-gray-600 hover:text-green-600">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-600 hover:text-green-600">
                Returns
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-green-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-600 hover:text-green-600">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>hello@agribaba.co.ke</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 AgriBaba. All rights reserved. Made with ❤️ in Kenya</p>
        </div>
      </div>
    </footer>
  )
}
