import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaExchangeAlt } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { currency, toggleCurrency } = useCurrency()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo.png" 
                alt="Agribaba Logo" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-primary-600">Agribaba</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Home
              </Link>
              <Link href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Marketplace
              </Link>
              <Link href="/community" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Community
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                About Us
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <button 
              onClick={toggleCurrency}
              className="flex items-center mr-4 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
            >
              <FaExchangeAlt className="mr-1" />
              {currency}
            </button>
            
            {user ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <Link href="/cart" className="text-gray-500 hover:text-gray-700">
                  <FaShoppingCart className="h-6 w-6" />
                </Link>
                <div className="relative">
                  <Link href="/profile" className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary-500">
                      <Image 
                        src={user.profileImage || "/images/avatars/default.jpg"} 
                        alt="User profile" 
                        width={32} 
                        height={32}
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-500 hover:text-gray-700 font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleCurrency}
              className="flex items-center mr-4 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
            >
              <FaExchangeAlt className="mr-1" />
              {currency}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {mobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Home
          </Link>
          <Link href="/marketplace" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Marketplace
          </Link>
          <Link href="/community" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Community
          </Link>
          <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            About Us
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image 
                    src={user.profileImage || "/images/avatars/default.jpg"} 
                    alt="User profile" 
                    width={40} 
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Your Profile
                </Link>
                <Link href="/cart" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Cart
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Login
              </Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-white hover:bg-primary-600">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
