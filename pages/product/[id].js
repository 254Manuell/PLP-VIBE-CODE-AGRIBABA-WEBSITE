import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '../../context/CurrencyContext'
import { useAuth } from '../../context/AuthContext'
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaShare, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaChartLine } from 'react-icons/fa'

// Sample product data (in a real app, this would come from an API)
const products = [
  {
    id: "1",
    name: "Organic Tomatoes",
    images: [
      "/images/products/tomatoes.jpg",
      "/images/products/tomatoes-2.jpg",
      "/images/products/tomatoes-3.jpg"
    ],
    price: 120,
    unit: "kg",
    minOrder: 5,
    available: 500,
    category: "vegetables",
    description: "Fresh, organic tomatoes grown without pesticides. These juicy, ripe tomatoes are perfect for salads, cooking, and sauces. Harvested from our farm in Nakuru using sustainable farming practices.",
    rating: 4.8,
    reviews: 24,
    seller: {
      id: "s1",
      name: "Kimani Farms",
      location: "Nakuru, Kenya",
      rating: 4.9,
      reviews: 156,
      joined: "March 2022",
      image: "/images/avatars/seller1.jpg",
      phone: "+254 712 345 678",
      email: "contact@kimanifarms.co.ke"
    },
    specifications: [
      { name: "Type", value: "Roma Tomatoes" },
      { name: "Farming Method", value: "Organic" },
      { name: "Certification", value: "Kenya Organic Agriculture Network" },
      { name: "Harvest Date", value: "Within the last 2 days" },
      { name: "Packaging", value: "Eco-friendly crates" }
    ],
    priceHistory: [
      { date: "Jan", price: 130 },
      { date: "Feb", price: 125 },
      { date: "Mar", price: 120 },
      { date: "Apr", price: 115 },
      { date: "May", price: 120 }
    ],
    relatedProducts: [2, 3, 8]
  },
  {
    id: "2",
    name: "Fresh Spinach",
    images: [
      "/images/products/spinach.jpg",
      "/images/products/spinach-2.jpg"
    ],
    price: 80,
    unit: "kg",
    minOrder: 2,
    available: 200,
    category: "vegetables",
    description: "Nutritious, dark green spinach leaves grown using hydroponic methods. Rich in iron, vitamins, and antioxidants. Perfect for salads, smoothies, and cooking.",
    rating: 4.5,
    reviews: 18,
    seller: {
      id: "s2",
      name: "Green Acres",
      location: "Kiambu, Kenya",
      rating: 4.7,
      reviews: 89,
      joined: "June 2022",
      image: "/images/avatars/seller2.jpg",
      phone: "+254 723 456 789",
      email: "info@greenacres.co.ke"
    },
    specifications: [
      { name: "Type", value: "Baby Spinach" },
      { name: "Farming Method", value: "Hydroponic" },
      { name: "Harvest Date", value: "Within the last day" },
      { name: "Packaging", value: "Recyclable bags" }
    ],
    priceHistory: [
      { date: "Jan", price: 85 },
      { date: "Feb", price: 85 },
      { date: "Mar", price: 80 },
      { date: "Apr", price: 80 },
      { date: "May", price: 80 }
    ],
    relatedProducts: [1, 3, 8]
  },
  {
    id: "3",
    name: "Arboro Lettuce",
    images: [
      "/images/products/lettuce.jpg",
      "/images/products/lettuce-2.jpg"
    ],
    price: 150,
    unit: "kg",
    minOrder: 1,
    available: 100,
    category: "vegetables",
    description: "Crisp, fresh Arboro lettuce grown in controlled environments. Perfect for salads and sandwiches. Our lettuce is grown using sustainable farming practices and harvested at peak freshness.",
    rating: 4.7,
    reviews: 15,
    seller: {
      id: "s3",
      name: "Hydroponic Solutions",
      location: "Nairobi, Kenya",
      rating: 4.8,
      reviews: 67,
      joined: "January 2023",
      image: "/images/avatars/seller3.jpg",
      phone: "+254 734 567 890",
      email: "hello@hydroponicsolutions.co.ke"
    },
    specifications: [
      { name: "Type", value: "Arboro Lettuce" },
      { name: "Farming Method", value: "Hydroponic" },
      { name: "Certification", value: "Global GAP" },
      { name: "Harvest Date", value: "Within the last day" },
      { name: "Packaging", value: "Eco-friendly containers" }
    ],
    priceHistory: [
      { date: "Jan", price: 160 },
      { date: "Feb", price: 155 },
      { date: "Mar", price: 155 },
      { date: "Apr", price: 150 },
      { date: "May", price: 150 }
    ],
    relatedProducts: [1, 2, 8]
  }
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.minOrder > 1) {
          setQuantity(foundProduct.minOrder);
        }
      }
      
      setLoading(false);
    }
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= product.minOrder && value <= product.available) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.available) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity(quantity - 1);
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/marketplace" className="btn-primary">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/marketplace" className="hover:text-gray-700">
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/marketplace?category=${product.category}`} className="hover:text-gray-700">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-4">
                <Image 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative h-16 w-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="text-2xl font-bold text-primary-600 mb-4">
                {formatPrice(product.price)} / {product.unit}
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{product.seller.location}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image 
                      src={product.seller.image} 
                      alt={product.seller.name} 
                      width={32} 
                      height={32}
                    />
                  </div>
                  <Link href={`/seller/${product.seller.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                    {product.seller.name}
                  </Link>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Minimum Order:</span>
                  <span className="text-sm font-medium">{product.minOrder} {product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Available Quantity:</span>
                  <span className="text-sm font-medium">{product.available} {product.unit}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity ({product.unit})
                </label>
                <div className="flex">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="relative inline-flex items-center justify-center p-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">-</span>
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={product.minOrder}
                    max={product.available}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="block w-full border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-center"
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="relative inline-flex items-center justify-center p-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">+</span>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Total: {formatPrice(product.price * quantity)}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button className="btn-primary flex-1 flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="btn-secondary flex items-center justify-center px-4">
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
                <button className="btn-secondary flex items-center justify-center px-4">
                  <FaShare className="text-gray-400 hover:text-primary-500" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('seller')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'seller'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Seller Information
              </button>
              <button
                onClick={() => setActiveTab('priceHistory')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'priceHistory'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Price History
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
                  <div className="border rounded-md overflow-hidden">
                    {product.specifications.map((spec, index) => (
                      <div 
                        key={index}
                        className={`flex ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-gray-500">
                          {spec.name}
                        </div>
                        <div className="w-2/3 px-4 py-3 text-sm text-gray-900">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'seller' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Seller Information</h3>
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden">
                        <Image 
                          src={product.seller.image} 
                          alt={product.seller.name} 
                          width={64} 
                          height={64}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{product.seller.name}</h4>
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex mr-1">
                          {renderStars(product.seller.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {product.seller.rating} ({product.seller.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        <FaMapMarkerAlt className="inline mr-1" /> {product.seller.location}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        <FaUser className="inline mr-1" /> Member since {product.seller.joined}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        <FaPhone className="inline mr-1" /> {product.seller.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        <FaEnvelope className="inline mr-1" /> {product.seller.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href={`/seller/${product.seller.id}`} className="btn-primary inline-block">
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'priceHistory' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Price History</h3>
                  <div className="flex items-center mb-4">
                    <FaChartLine className="text-primary-500 mr-2" />
                    <span className="text-sm text-gray-500">
                      Price trend over the last 5 months
                    </span>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg p-4">
                    {/* In a real app, this would be a Chart.js or similar chart */}
                    <div className="h-full flex items-end justify-between">
                      {product.priceHistory.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="bg-primary-500 w-12 rounded-t-sm" 
                            style={{ 
                              height: `${(item.price / Math.max(...product.priceHistory.map(i => i.price))) * 80}%` 
                            }}
                          ></div>
                          <div className="text-xs font-medium mt-2">{item.date}</div>
                          <div className="text-xs text-gray-500">{formatPrice(item.price)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => product.relatedProducts.includes(parseInt(p.id)))
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{relatedProduct.seller.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-600 font-bold">
                        {formatPrice(relatedProduct.price)} / {relatedProduct.unit}
                      </span>
                      <Link 
                        href={`/product/${relatedProduct.id}`} 
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
