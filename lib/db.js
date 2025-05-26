// MySQL database utility functions for the Agribaba application
import { executeQuery } from './db-config';
import bcrypt from 'bcryptjs';

// Database schema initialization (would typically be in a migration file)
export async function initializeDatabase() {
  // Create products table if it doesn't exist
  await executeQuery({
    query: `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      price DECIMAL(10, 2) NOT NULL,
      unit VARCHAR(50) NOT NULL,
      category VARCHAR(100) NOT NULL,
      rating DECIMAL(3, 1),
      seller VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      featured BOOLEAN DEFAULT false,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  });

  // Create users table if it doesn't exist
  await executeQuery({
    query: `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('farmer', 'buyer', 'both') NOT NULL,
      profile_image VARCHAR(255),
      location VARCHAR(255),
      phone VARCHAR(50),
      joined_date DATE DEFAULT (CURRENT_DATE),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  });

  // Check if products table is empty and seed with initial data if needed
  const products = await executeQuery({ query: 'SELECT COUNT(*) as count FROM products' });
  
  if (products[0].count === 0) {
    // Seed products table with sample data
    await executeQuery({
      query: `INSERT INTO products (name, image, price, unit, category, rating, seller, location, featured, description) VALUES
        ('Organic Tomatoes', '/images/products/tomatoes.jpg', 120, 'kg', 'vegetables', 4.8, 'Kimani Farms', 'Nakuru', true, 'Fresh, organic tomatoes grown without pesticides.'),
        ('Fresh Spinach', '/images/products/spinach.jpg', 80, 'kg', 'vegetables', 4.5, 'Green Acres', 'Kiambu', false, 'Nutritious, dark green spinach leaves grown using hydroponic methods.'),
        ('Arboro Lettuce', '/images/products/lettuce.jpg', 150, 'kg', 'vegetables', 4.7, 'Hydroponic Solutions', 'Nairobi', true, 'Crisp, fresh Arboro lettuce grown in controlled environments.')`
    });
  }

  // Check if users table is empty and seed with initial data if needed
  const users = await executeQuery({ query: 'SELECT COUNT(*) as count FROM users' });
  
  if (users[0].count === 0) {
    // Hash passwords for sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Seed users table with sample data
    await executeQuery({
      query: `INSERT INTO users (name, email, password, role, profile_image, location, phone) VALUES
        ('John Kimani', 'john@example.com', ?, 'farmer', '/images/avatars/farmer1.jpg', 'Nakuru, Kenya', '+254 712 345 678'),
        ('Sarah Wanjiku', 'sarah@example.com', ?, 'buyer', '/images/avatars/buyer1.jpg', 'Nairobi, Kenya', '+254 723 456 789')`,
      values: [hashedPassword, hashedPassword]
    });
  }
}

// Product database functions
export async function getProducts(filters = {}) {
  let query = 'SELECT * FROM products';
  const values = [];
  const whereClauses = [];
  
  // Apply filters
  if (filters.category && filters.category !== 'all') {
    whereClauses.push('category = ?');
    values.push(filters.category);
  }
  
  if (filters.search) {
    whereClauses.push('(name LIKE ? OR seller LIKE ? OR location LIKE ?)');
    const searchTerm = `%${filters.search}%`;
    values.push(searchTerm, searchTerm, searchTerm);
  }
  
  if (filters.featured) {
    whereClauses.push('featured = true');
  }
  
  // Add WHERE clauses to query if any exist
  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }
  
  // Add sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-low':
        query += ' ORDER BY price ASC';
        break;
      case 'price-high':
        query += ' ORDER BY price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC';
        break;
      case 'featured':
      default:
        query += ' ORDER BY featured DESC, id ASC';
        break;
    }
  } else {
    query += ' ORDER BY id ASC';
  }
  
  return await executeQuery({ query, values });
}

export async function getProductById(id) {
  const results = await executeQuery({
    query: 'SELECT * FROM products WHERE id = ?',
    values: [id]
  });
  
  return results[0];
}

export async function createProduct(productData) {
  const { name, image, price, unit, category, seller, location, featured, description } = productData;
  
  const result = await executeQuery({
    query: `INSERT INTO products (name, image, price, unit, category, seller, location, featured, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    values: [name, image, price, unit, category, seller, location, featured || false, description || '']
  });
  
  return getProductById(result.insertId);
}

// User database functions
export async function getUserByEmail(email) {
  const results = await executeQuery({
    query: 'SELECT * FROM users WHERE email = ?',
    values: [email]
  });
  
  return results[0];
}

export async function getUserById(id) {
  const results = await executeQuery({
    query: 'SELECT id, name, email, role, profile_image, location, phone, joined_date FROM users WHERE id = ?',
    values: [id]
  });
  
  return results[0];
}

export async function createUser(userData) {
  const { name, email, password, role, profileImage, location, phone } = userData;
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await executeQuery({
    query: `INSERT INTO users (name, email, password, role, profile_image, location, phone) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
    values: [name, email, hashedPassword, role, profileImage || '/images/avatars/default.jpg', location || '', phone || '']
  });
  
  return getUserById(result.insertId);
}

// Currency conversion
export const currencyRates = {
  KES_TO_USD: 0.0078, // 1 KES = 0.0078 USD (approximately)
  USD_TO_KES: 128.0   // 1 USD = 128 KES (approximately)
};
