// Sample events data (in a real app, this would come from a database)
const events = [
  {
    id: 1,
    title: "Agricultural Innovation Summit",
    image: "/images/events/event1.jpg",
    date: "2025-06-15T09:00:00Z",
    endDate: "2025-06-15T17:00:00Z",
    location: "KICC, Nairobi",
    description: "Join us for Kenya's largest agricultural innovation summit featuring the latest technologies and practices for sustainable farming.",
    organizer: {
      id: 1,
      name: "Kenya Agricultural Board",
      logo: "/images/partners/partner1.png"
    },
    attendees: 245,
    price: 1000, // KES
    tags: ["Innovation", "Technology", "Sustainable Farming"]
  },
  {
    id: 2,
    title: "Organic Farming Workshop",
    image: "/images/events/event2.jpg",
    date: "2025-06-22T10:00:00Z",
    endDate: "2025-06-22T15:00:00Z",
    location: "Nakuru Agricultural Center",
    description: "Learn practical techniques for transitioning to organic farming methods from industry experts and successful organic farmers.",
    organizer: {
      id: 2,
      name: "Organic Farmers Association of Kenya",
      logo: "/images/partners/partner2.png"
    },
    attendees: 120,
    price: 500, // KES
    tags: ["Organic", "Workshop", "Training"]
  },
  {
    id: 3,
    title: "Export Market Opportunities Seminar",
    image: "/images/events/event3.jpg",
    date: "2025-07-05T14:00:00Z",
    endDate: "2025-07-05T17:00:00Z",
    location: "Virtual Event",
    description: "Discover opportunities for exporting Kenyan produce to international markets and learn about compliance requirements.",
    organizer: {
      id: 3,
      name: "Kenya Export Promotion Council",
      logo: "/images/partners/partner3.png"
    },
    attendees: 310,
    price: 0, // Free
    tags: ["Export", "International Markets", "Compliance"]
  },
  {
    id: 4,
    title: "Agribaba Farmers Networking Meetup",
    image: "/images/events/event4.jpg",
    date: "2025-07-12T18:00:00Z",
    endDate: "2025-07-12T21:00:00Z",
    location: "Thika Road Mall, Nairobi",
    description: "Connect with fellow farmers and buyers in this casual networking event organized by the Agribaba community.",
    organizer: {
      id: 4,
      name: "Agribaba",
      logo: "/logo.png"
    },
    attendees: 85,
    price: 200, // KES
    tags: ["Networking", "Community", "Social"]
  },
  {
    id: 5,
    title: "Climate-Smart Agriculture Conference",
    image: "/images/events/event5.jpg",
    date: "2025-07-25T09:00:00Z",
    endDate: "2025-07-26T17:00:00Z",
    location: "University of Nairobi",
    description: "A two-day conference focused on climate-smart agricultural practices for small and medium-scale farmers in East Africa.",
    organizer: {
      id: 5,
      name: "Climate Action Kenya",
      logo: "/images/partners/partner4.png"
    },
    attendees: 175,
    price: 1500, // KES
    tags: ["Climate Change", "Sustainability", "Conference"]
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get query parameters for filtering
    const { search, tag, upcoming, free } = req.query;
    
    // Filter events based on query parameters
    let filteredEvents = [...events];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) || 
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.organizer.name.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (tag) {
      filteredEvents = filteredEvents.filter(event => 
        event.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    if (upcoming === 'true') {
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => new Date(event.date) > now);
    }
    
    if (free === 'true') {
      filteredEvents = filteredEvents.filter(event => event.price === 0);
    }
    
    // Sort events by date (soonest first)
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.status(200).json(filteredEvents);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
