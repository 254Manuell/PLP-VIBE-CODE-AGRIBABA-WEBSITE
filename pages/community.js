import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { FaComment, FaHeart, FaShare, FaBookmark, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch } from 'react-icons/fa'

export default function Community() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for discussions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best practices for tomato farming in Nakuru region",
      content: "I've been struggling with tomato blight in my farm near Lake Nakuru. Has anyone found effective organic solutions that work well in our climate?",
      author: {
        name: "James Kimani",
        avatar: "/images/avatars/farmer1.jpg",
        role: "Farmer"
      },
      date: "2 days ago",
      likes: 24,
      comments: 8,
      tags: ["Tomatoes", "Pest Control", "Organic Farming"]
    },
    {
      id: 2,
      title: "Market prices for avocados dropping - what's happening?",
      content: "I've noticed avocado prices dropping significantly in the last month. Is anyone else experiencing this? What are the market projections for the next quarter?",
      author: {
        name: "Mary Njeri",
        avatar: "/images/avatars/farmer3.jpg",
        role: "Farmer"
      },
      date: "1 week ago",
      likes: 56,
      comments: 32,
      tags: ["Avocados", "Market Prices", "Export"]
    },
    {
      id: 3,
      title: "Looking for suppliers of organic vegetables in Nairobi",
      content: "Our restaurant chain is expanding and we need reliable suppliers of organic vegetables in Nairobi. We're particularly interested in leafy greens and herbs. Please share contacts or recommendations.",
      author: {
        name: "David Ochieng",
        avatar: "/images/avatars/buyer2.jpg",
        role: "Buyer"
      },
      date: "3 days ago",
      likes: 18,
      comments: 15,
      tags: ["Organic", "Supply Chain", "Nairobi"]
    },
    {
      id: 4,
      title: "Water conservation techniques for small-scale farmers",
      content: "With the changing rainfall patterns, I'm looking to implement better water conservation on my 2-acre farm. What techniques are working for other small-scale farmers in Kenya?",
      author: {
        name: "Peter Mwangi",
        avatar: "/images/avatars/farmer4.jpg",
        role: "Farmer"
      },
      date: "5 days ago",
      likes: 42,
      comments: 23,
      tags: ["Water Conservation", "Climate Change", "Small Farms"]
    },
    {
      id: 5,
      title: "Success with drip irrigation systems",
      content: "I've recently installed a solar-powered drip irrigation system on my farm in Machakos, and the results have been amazing. Happy to share my experience and supplier details with anyone interested.",
      author: {
        name: "Sarah Mutua",
        avatar: "/images/avatars/farmer5.jpg",
        role: "Farmer"
      },
      date: "1 day ago",
      likes: 37,
      comments: 19,
      tags: ["Irrigation", "Solar Power", "Technology"]
    }
  ]);
  
  // Sample data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Agricultural Innovation Summit",
      image: "/images/events/event1.jpg",
      date: "June 15, 2025",
      location: "KICC, Nairobi",
      description: "Join us for Kenya's largest agricultural innovation summit featuring the latest technologies and practices for sustainable farming.",
      attendees: 245
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      image: "/images/events/event2.jpg",
      date: "June 22, 2025",
      location: "Nakuru Agricultural Center",
      description: "Learn practical techniques for transitioning to organic farming methods from industry experts and successful organic farmers.",
      attendees: 120
    },
    {
      id: 3,
      title: "Export Market Opportunities Seminar",
      image: "/images/events/event3.jpg",
      date: "July 5, 2025",
      location: "Virtual Event",
      description: "Discover opportunities for exporting Kenyan produce to international markets and learn about compliance requirements.",
      attendees: 310
    },
    {
      id: 4,
      title: "Agribaba Farmers Networking Meetup",
      image: "/images/events/event4.jpg",
      date: "July 12, 2025",
      location: "Thika Road Mall, Nairobi",
      description: "Connect with fellow farmers and buyers in this casual networking event organized by the Agribaba community.",
      attendees: 85
    }
  ]);
  
  // Sample data for learning resources
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Improving Soil Health",
      image: "/images/resources/resource1.jpg",
      category: "Soil Management",
      description: "Learn effective techniques for improving soil fertility and health using natural methods.",
      link: "/resources/soil-health"
    },
    {
      id: 2,
      title: "Optimizing Irrigation",
      image: "/images/resources/resource2.jpg",
      category: "Water Management",
      description: "Discover water-saving irrigation techniques that can reduce costs and improve crop yields.",
      link: "/resources/irrigation"
    },
    {
      id: 3,
      title: "Pest Control Strategies",
      image: "/images/resources/resource3.jpg",
      category: "Pest Management",
      description: "Explore integrated pest management approaches that minimize chemical use while protecting crops.",
      link: "/resources/pest-control"
    },
    {
      id: 4,
      title: "Accessing New Markets",
      image: "/images/resources/resource4.jpg",
      category: "Market Access",
      description: "Learn how to identify and access new markets for your agricultural products.",
      link: "/resources/market-access"
    },
    {
      id: 5,
      title: "Financial Planning for Farmers",
      image: "/images/resources/resource5.jpg",
      category: "Finance",
      description: "Essential financial planning strategies and tools specifically designed for farmers.",
      link: "/resources/financial-planning"
    },
    {
      id: 6,
      title: "Weather Forecasting for Agriculture",
      image: "/images/resources/resource6.jpg",
      category: "Climate",
      description: "How to use weather forecasting tools to plan your farming activities and mitigate climate risks.",
      link: "/resources/weather-forecasting"
    }
  ]);
  
  // Filter content based on search term
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600 mt-1">Connect, learn, and grow with fellow farmers and buyers</p>
          </div>
          
          {user ? (
            <Link href="/community/new-post" className="btn-primary">
              Start a Discussion
            </Link>
          ) : (
            <Link href="/login" className="btn-primary">
              Login to Participate
            </Link>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search discussions, events, and resources..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('discussions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'discussions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Discussions
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Learning Resources
              </button>
            </nav>
          </div>
        </div>
        
        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map(discussion => (
                <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <Image 
                        src={discussion.author.avatar} 
                        alt={discussion.author.name} 
                        width={48} 
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/community/discussion/${discussion.id}`} className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                        {discussion.title}
                      </Link>
                      <div className="flex items-center mt-1 mb-3">
                        <span className="text-sm font-medium text-gray-700">{discussion.author.name}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{discussion.date}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{discussion.author.role}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{discussion.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <button className="flex items-center mr-4 hover:text-primary-500">
                          <FaHeart className="mr-1" />
                          <span>{discussion.likes}</span>
                        </button>
                        <button className="flex items-center mr-4 hover:text-primary-500">
                          <FaComment className="mr-1" />
                          <span>{discussion.comments}</span>
                        </button>
                        <button className="flex items-center mr-4 hover:text-primary-500">
                          <FaShare className="mr-1" />
                          <span>Share</span>
                        </button>
                        <button className="flex items-center hover:text-primary-500">
                          <FaBookmark className="mr-1" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or start a new discussion
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={event.image} 
                      alt={event.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <FaUsers className="mr-2" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <Link href={`/community/event/${event.id}`} className="btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Learning Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-40">
                    <Image 
                      src={resource.image} 
                      alt={resource.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">
                      {resource.category}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Link href={resource.link} className="text-primary-600 font-medium hover:text-primary-700">
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
