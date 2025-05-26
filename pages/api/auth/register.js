import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, initializeDatabase } from '../../../lib/db';

// Initialize the database on first API call
let dbInitialized = false;

export default async function handler(req, res) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }
    
    if (req.method === 'POST') {
      const { name, email, password, role, location, phone } = req.body;
      
      // Basic validation
      if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: 'Name, email, password, and role are required' });
      }
      
      // Check if email already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        role,
        image: role === 'farmer' ? '/images/avatars/farmer-default.jpg' : '/images/avatars/buyer-default.jpg',
        location: location || '',
        phone: phone || '',
        joinedDate: new Date().toISOString().split('T')[0]
      });
      
      // Create JWT token
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );
      
      // Don't send password to client
      const { password: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json({ 
        success: true, 
        message: 'Registration successful',
        user: userWithoutPassword,
        token
      });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
