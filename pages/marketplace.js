import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '../context/CurrencyContext'
import { FaSearch, FaFilter, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa'

export default function Marketplace() {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  // Product data (in a real app, this would come from an API)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      image: "/images/products/tomatoes.jpg",
      price: 120,
      unit: "kg",
      category: "vegetables",
      rating: 4.8,
      seller: "Kimani Farms",
      location: "Nakuru",
      featured: true
    },
    {
      id: 2,
      name: "Fresh Spinach",
      image: "/images/products/spinach.jpg",
      price: 80,
      unit: "kg",
      category: "vegetables",
      rating: 4.5,
      seller: "Green Acres",
      location: "Kiambu",
      featured: false
    },
    {
      id: 3,
      name: "Arboro Lettuce",
      image: "/images/products/lettuce.jpg",
      price: 150,
      unit: "kg",
      category: "vegetables",
      rating: 4.7,
      seller: "Hydroponic Solutions",
      location: "Nairobi",
      featured: true
    },
    {
      id: 4,
      name: "Sweet Corn",
      image: "/images/products/corn.jpg",
      price: 100,
      unit: "kg",
      category: "vegetables",
      rating: 4.3,
      seller: "Meru Highlands",
      location: "Meru",
      featured: false
    },
    {
      id: 5,
      name: "Bananas",
      image: "/images/products/bananas.jpg",
      price: 90,
      unit: "kg",
      category: "fruits",
      rating: 4.6,
      seller: "Coastal Farms",
      location: "Mombasa",
      featured: false
    },
    {
      id: 6,
      name: "Sweet Corn",
      image: "/images/products/sweet-corn.jpg",
      price: 85,
      unit: "kg",
      category: "vegetables",
      rating: 4.4,
      seller: "Rift Valley Farms",
      location: "Eldoret",
      featured: false
    },
    {
      id: 7,
      name: "Onions",
      image: "/images/products/onions.jpg",
      price: 70,
      unit: "kg",
      category: "vegetables",
      rating: 4.2,
      seller: "Nyeri Farmers Co-op",
      location: "Nyeri",
      featured: false
    },
    {
      id: 8,
      name: "Fresh Lettuce",
      image: "/images/products/fresh-lettuce.jpg",
      price: 120,
      unit: "kg",
      category: "vegetables",
      rating: 4.7,
      seller: "Hydroponic Kenya",
      location: "Nairobi",
      featured: true
    },
    {
      id: 9,
      name: "Bulk Oats",
      image: "/images/products/oats.jpg",
      price: 250,
      unit: "kg",
      category: "grains",
      rating: 4.5,
      seller: "Highland Cereals",
      location: "Nakuru",
      featured: false
    },
    {
      id: 10,
      name: "Avocados",
      image: "/images/products/avocados.jpg",
      price: 180,
      unit: "kg",
      category: "fruits",
      rating: 4.8,
      seller: "Green Hills Farm",
      location: "Muranga",
      featured: true
    },
    {
      id: 11,
      name: "Organic Carrots",
      image: "/images/products/carrots.jpg",
      price: 95,
      unit: "kg",
      category: "vegetables",
      rating: 4.4,
      seller: "Nyandarua Farms",
      location: "Nyandarua",
      featured: false
    },
    {
      id: 12,
      name: "Green Beans",
      image: "/images/products/green-beans.jpg",
      price: 110,
      unit: "kg",
      category: "vegetables",
      rating: 4.3,
      seller: "Limuru Fresh",
      location: "Kiambu",
      featured: false
    },
    {
      id: 13,
      name: "Fresh Basil",
      image: "/images/products/basil.jpg",
      price: 200,
      unit: "bunch",
      category: "herbs",
      rating: 4.7,
      seller: "Herb Garden",
      location: "Nairobi",
      featured: false
    },
    {
      id: 14,
      name: "Strawberries",
      image: "/images/products/strawberries.jpg",
      price: 350,
      unit: "kg",
      category: "fruits",
      rating: 4.9,
      seller: "Tigoni Berries",
      location: "Limuru",
      featured: true
    },
    {
      id: 15,
      name: "Organic Tomatoes",
      image: "/images/products/organic-tomatoes.jpg",
      price: 140,
      unit: "kg",
      category: "vegetables",
      rating: 4.8,
      seller: "Organic Valley",
      location: "Naivasha",
      featured: true
    },
    {
      id: 16,
      name: "Blueberries",
      image: "/images/products/blueberries.jpg",
      price: 450,
      unit: "kg",
      category: "fruits",
      rating: 4.9,
      seller: "Highland Berries",
      location: "Nyeri",
      featured: false
    },
    {
      id: 17,
      name: "Potatoes",
      image: "/images/products/potatoes.jpg",
      price: 65,
      unit: "kg",
      category: "vegetables",
      rating: 4.3,
      seller: "Nyandarua Farmers",
      location: "Nyandarua",
      featured: false
    },
    {
      id: 18,
      name: "Farm Eggs",
      image: "/images/products/eggs.jpg",
      price: 360,
      unit: "tray",
      category: "dairy",
      rating: 4.7,
      seller: "Happy Hens Farm",
      location: "Nakuru",
      featured: true
    },
    {
      id: 19,
      name: "Cheddar Cheese",
      image: "/images/products/cheese.jpg",
      price: 650,
      unit: "kg",
      category: "dairy",
      rating: 4.6,
      seller: "Dairy Masters",
      location: "Naivasha",
      featured: false
    },
    {
      id: 20,
      name: "Grass-Fed Beef",
      image: "/images/products/beef.jpg",
      price: 750,
      unit: "kg",
      category: "meat",
      rating: 4.8,
      seller: "Laikipia Ranchers",
      location: "Laikipia",
      featured: false
    },
    {
      id: 21,
      name: "Local Honey",
      image: "/images/products/honey.jpg",
      price: 550,
      unit: "jar",
      category: "other",
      rating: 4.9,
      seller: "Bee Keepers Association",
      location: "Baringo",
      featured: true
    },
    {
      id: 22,
      name: "Artisan Bread",
      image: "/images/products/bread.jpg",
      price: 180,
      unit: "loaf",
      category: "grains",
      rating: 4.7,
      seller: "Urban Bakers",
      location: "Nairobi",
      featured: false
    },
    {
      id: 23,
      name: "Fresh Ginger",
      image: "/images/products/ginger.jpg",
      price: 220,
      unit: "kg",
      category: "herbs",
      rating: 4.5,
      seller: "Spice Garden",
      location: "Kisii",
      featured: false
    }
  ]);
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains & Seeds' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'meat', name: 'Meat & Poultry' },
    { id: 'herbs', name: 'Herbs & Spices' },
    { id: 'other', name: 'Other Products' }
  ];
  
  // Filter products based on search, category, and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'featured') {
      return b.featured - a.featured;
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>
        
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products, sellers, or locations..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="input-field"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              <button
                className="btn-secondary flex items-center"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FaFilter className="mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          {/* Expanded Filter Options */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range (KES)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
              <div className="relative h-48">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover"
                />
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500">
                  <FaHeart />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.seller}, {product.location}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">
                    {formatPrice(product.price)} / {product.unit}
                  </span>
                  
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                      <FaShoppingCart className="h-4 w-4" />
                    </button>
                    <Link 
                      href={`/product/${product.id}`} 
                      className="btn-primary py-1 px-3 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
