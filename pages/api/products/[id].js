import { getProductById, initializeDatabase } from '../../../lib/db';
import { executeQuery } from '../../../lib/db-config';

// Initialize the database on first API call
let dbInitialized = false;

export default async function handler(req, res) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }
    
    const { id } = req.query;
    
    if (req.method === 'GET') {
      // Get product from database
      const product = await getProductById(id);
      
      if (product) {
        // Get additional product details (in a real app, these would be in separate tables with proper relationships)
        // For demo purposes, we'll simulate this with hardcoded data
        
        // Get seller information
        const seller = {
          id: `s${product.id}`,
          name: product.seller,
          location: product.location,
          rating: 4.8,
          reviews: 120,
          joined: "March 2022",
          image: "/images/avatars/seller1.jpg",
          phone: "+254 712 345 678",
          email: `contact@${product.seller.toLowerCase().replace(' ', '')}.co.ke`
        };
        
        // Get product images
        const images = [
          product.image,
          `/images/products/${product.category}-2.jpg`,
          `/images/products/${product.category}-3.jpg`
        ];
        
        // Get specifications
        const specifications = [
          { name: "Type", value: product.name },
          { name: "Farming Method", value: product.category === "vegetables" ? "Organic" : "Conventional" },
          { name: "Certification", value: "Kenya Organic Agriculture Network" },
          { name: "Harvest Date", value: "Within the last 2 days" },
          { name: "Packaging", value: "Eco-friendly crates" }
        ];
        
        // Get price history
        const priceHistory = [
          { date: "Jan", price: product.price * 1.1 },
          { date: "Feb", price: product.price * 1.05 },
          { date: "Mar", price: product.price },
          { date: "Apr", price: product.price * 0.95 },
          { date: "May", price: product.price }
        ];
        
        // Get related products
        const relatedProductsQuery = await executeQuery({
          query: `SELECT id FROM products WHERE category = ? AND id != ? LIMIT 3`,
          values: [product.category, product.id]
        });
        
        const relatedProducts = relatedProductsQuery.map(p => parseInt(p.id));
        
        // Combine all data
        const enrichedProduct = {
          ...product,
          images,
          minOrder: 1,
          available: 500,
          reviews: 24,
          seller,
          specifications,
          priceHistory,
          relatedProducts
        };
        
        res.status(200).json(enrichedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else if (req.method === 'PUT') {
      // Update product (would require authentication in a real app)
      // For demo purposes, we'll allow product updates without authentication
      
      const { name, image, price, unit, category, seller, location, featured, description } = req.body;
      
      // Validate required fields
      if (!name && !price && !unit && !category && !seller) {
        return res.status(400).json({ 
          success: false, 
          message: 'At least one field must be provided for update' 
        });
      }
      
      // Check if product exists
      const existingProduct = await getProductById(id);
      
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Build update query
      let updateQuery = 'UPDATE products SET ';
      const updateValues = [];
      const updateFields = [];
      
      if (name) {
        updateFields.push('name = ?');
        updateValues.push(name);
      }
      
      if (image) {
        updateFields.push('image = ?');
        updateValues.push(image);
      }
      
      if (price) {
        updateFields.push('price = ?');
        updateValues.push(price);
      }
      
      if (unit) {
        updateFields.push('unit = ?');
        updateValues.push(unit);
      }
      
      if (category) {
        updateFields.push('category = ?');
        updateValues.push(category);
      }
      
      if (seller) {
        updateFields.push('seller = ?');
        updateValues.push(seller);
      }
      
      if (location) {
        updateFields.push('location = ?');
        updateValues.push(location);
      }
      
      if (featured !== undefined) {
        updateFields.push('featured = ?');
        updateValues.push(featured);
      }
      
      if (description) {
        updateFields.push('description = ?');
        updateValues.push(description);
      }
      
      updateQuery += updateFields.join(', ');
      updateQuery += ' WHERE id = ?';
      updateValues.push(id);
      
      // Execute update query
      await executeQuery({
        query: updateQuery,
        values: updateValues
      });
      
      // Get updated product
      const updatedProduct = await getProductById(id);
      
      res.status(200).json({ success: true, product: updatedProduct });
    } else if (req.method === 'DELETE') {
      // Delete product (would require authentication in a real app)
      // For demo purposes, we'll allow product deletion without authentication
      
      // Check if product exists
      const existingProduct = await getProductById(id);
      
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Delete product
      await executeQuery({
        query: 'DELETE FROM products WHERE id = ?',
        values: [id]
      });
      
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
