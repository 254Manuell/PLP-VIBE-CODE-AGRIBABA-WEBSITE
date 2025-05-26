import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Agribaba Logo" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-primary-600">Agribaba</span>
            </div>
            <p className="text-gray-600 text-sm">
              Connecting farmers with buyers locally and internationally, providing a sustainable marketplace for agricultural produce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-base text-gray-600 hover:text-primary-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-base text-gray-600 hover:text-primary-500">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-base text-gray-600 hover:text-primary-500">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-gray-600 hover:text-primary-500">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-base text-gray-600 hover:text-primary-500">
                  Farming Tips
                </Link>
              </li>
              <li>
                <Link href="/market-insights" className="text-base text-gray-600 hover:text-primary-500">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-base text-gray-600 hover:text-primary-500">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-gray-600 hover:text-primary-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-base text-gray-600">
                Nairobi, Kenya
              </li>
              <li className="text-base text-gray-600">
                info@agribaba.com
              </li>
              <li className="text-base text-gray-600">
                +254 700 123 456
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-600 hover:text-primary-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-500">
              &copy; {new Date().getFullYear()} Agribaba. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-primary-500">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-primary-500">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-sm text-gray-500 hover:text-primary-500">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
