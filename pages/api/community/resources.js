// Sample learning resources data (in a real app, this would come from a database)
const resources = [
  {
    id: 1,
    title: "Improving Soil Health",
    image: "/images/resources/resource1.jpg",
    category: "Soil Management",
    description: "Learn effective techniques for improving soil fertility and health using natural methods.",
    content: "Healthy soil is the foundation of successful farming. This comprehensive guide covers soil testing, organic matter management, crop rotation, cover crops, and natural amendments to build soil health without synthetic chemicals.",
    author: "Dr. Jane Wambui",
    publishedDate: "2025-03-15T00:00:00Z",
    tags: ["Soil", "Organic", "Fertility"],
    link: "/resources/soil-health"
  },
  {
    id: 2,
    title: "Optimizing Irrigation",
    image: "/images/resources/resource2.jpg",
    category: "Water Management",
    description: "Discover water-saving irrigation techniques that can reduce costs and improve crop yields.",
    content: "Water is a precious resource that must be used efficiently. This guide explores drip irrigation, soil moisture sensors, rainwater harvesting, and scheduling strategies to maximize water efficiency while maintaining optimal crop growth.",
    author: "Michael Odhiambo",
    publishedDate: "2025-04-02T00:00:00Z",
    tags: ["Water", "Irrigation", "Efficiency"],
    link: "/resources/irrigation"
  },
  {
    id: 3,
    title: "Pest Control Strategies",
    image: "/images/resources/resource3.jpg",
    category: "Pest Management",
    description: "Explore integrated pest management approaches that minimize chemical use while protecting crops.",
    content: "Integrated Pest Management (IPM) combines multiple strategies to control pests while reducing reliance on pesticides. Learn about biological controls, trap crops, physical barriers, and targeted interventions that protect both your crops and the environment.",
    author: "Sarah Mutua",
    publishedDate: "2025-02-20T00:00:00Z",
    tags: ["Pests", "IPM", "Organic"],
    link: "/resources/pest-control"
  },
  {
    id: 4,
    title: "Accessing New Markets",
    image: "/images/resources/resource4.jpg",
    category: "Market Access",
    description: "Learn how to identify and access new markets for your agricultural products.",
    content: "Expanding your market reach can significantly increase your farm's profitability. This guide covers market research, value addition, certification options, digital marketing, and building relationships with buyers both locally and internationally.",
    author: "John Kimani",
    publishedDate: "2025-04-18T00:00:00Z",
    tags: ["Marketing", "Sales", "Export"],
    link: "/resources/market-access"
  },
  {
    id: 5,
    title: "Financial Planning for Farmers",
    image: "/images/resources/resource5.jpg",
    category: "Finance",
    description: "Essential financial planning strategies and tools specifically designed for farmers.",
    content: "Financial management is crucial for farm sustainability. This resource covers budgeting, record-keeping, cash flow management, accessing credit, risk management, and investment planning tailored to the unique needs of agricultural businesses.",
    author: "Elizabeth Njoroge",
    publishedDate: "2025-01-10T00:00:00Z",
    tags: ["Finance", "Planning", "Business"],
    link: "/resources/financial-planning"
  },
  {
    id: 6,
    title: "Weather Forecasting for Agriculture",
    image: "/images/resources/resource6.jpg",
    category: "Climate",
    description: "How to use weather forecasting tools to plan your farming activities and mitigate climate risks.",
    content: "Weather patterns significantly impact farming success. Learn how to access and interpret weather forecasts, use climate data for seasonal planning, implement early warning systems, and adapt farming practices to changing climate conditions.",
    author: "Dr. David Mwangi",
    publishedDate: "2025-03-05T00:00:00Z",
    tags: ["Weather", "Climate", "Planning"],
    link: "/resources/weather-forecasting"
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get query parameters for filtering
    const { search, category, tag } = req.query;
    
    // Filter resources based on query parameters
    let filteredResources = [...resources];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredResources = filteredResources.filter(resource => 
        resource.title.toLowerCase().includes(searchLower) || 
        resource.description.toLowerCase().includes(searchLower) ||
        resource.content.toLowerCase().includes(searchLower) ||
        resource.author.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (category) {
      filteredResources = filteredResources.filter(resource => 
        resource.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (tag) {
      filteredResources = filteredResources.filter(resource => 
        resource.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    // Sort resources by published date (newest first)
    filteredResources.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    
    res.status(200).json(filteredResources);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
