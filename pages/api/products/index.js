import { getProducts, createProduct, initializeDatabase } from '../../../lib/db';

// Initialize the database on first API call
let dbInitialized = false;

export default async function handler(req, res) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }
    
    if (req.method === 'GET') {
      // Get query parameters for filtering
      const { category, search, featured, sort } = req.query;
      
      // Prepare filters object
      const filters = {};
      
      if (category && category !== 'all') {
        filters.category = category;
      }
      
      if (search) {
        filters.search = search;
      }
      
      if (featured === 'true') {
        filters.featured = true;
      }
      
      if (sort) {
        filters.sort = sort;
      }
      
      // Get products from database
      const products = await getProducts(filters);
      
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      // Check if user is authenticated (would use middleware in a real app)
      // For demo purposes, we'll allow product creation without authentication
      
      const { name, image, price, unit, category, seller, location, featured, description } = req.body;
      
      // Validate required fields
      if (!name || !price || !unit || !category || !seller) {
        return res.status(400).json({ 
          success: false, 
          message: 'Name, price, unit, category, and seller are required' 
        });
      }
      
      // Create product in database
      const newProduct = await createProduct({
        name,
        image: image || '/images/products/default.jpg',
        price,
        unit,
        category,
        seller,
        location: location || '',
        featured: featured || false,
        description: description || ''
      });
      
      res.status(201).json({ success: true, product: newProduct });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
