import { executeQuery } from '../../../lib/db-config';
import { initializeDatabase } from '../../../lib/db';

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
      const { category, tag, search, sort } = req.query;
      
      // Build query
      let query = `
        SELECT d.*, u.name as author_name, u.image as author_image, u.role as author_role,
        (SELECT COUNT(*) FROM discussion_comments WHERE discussion_id = d.id) as comments_count
        FROM discussions d
        LEFT JOIN users u ON d.author_id = u.id
        WHERE 1=1
      `;
      
      const queryParams = [];
      
      if (category) {
        query += " AND d.category = ?";
        queryParams.push(category);
      }
      
      if (tag) {
        // In a real implementation, tags would be in a separate table with a many-to-many relationship
        // For simplicity, we'll assume tags are stored as a comma-separated string
        query += " AND d.tags LIKE ?";
        queryParams.push(`%${tag}%`);
      }
      
      if (search) {
        query += " AND (d.title LIKE ? OR d.content LIKE ?)";
        queryParams.push(`%${search}%`);
        queryParams.push(`%${search}%`);
      }
      
      // Add sorting
      if (sort) {
        switch (sort) {
          case 'recent':
            query += " ORDER BY d.created_at DESC";
            break;
          case 'popular':
            query += " ORDER BY d.views DESC";
            break;
          case 'most_commented':
            query += " ORDER BY comments_count DESC";
            break;
          case 'most_liked':
            query += " ORDER BY d.likes DESC";
            break;
          default:
            query += " ORDER BY d.created_at DESC";
            break;
        }
      } else {
        // Default sort by most recent
        query += " ORDER BY d.created_at DESC";
      }
      
      // Execute query
      const discussions = await executeQuery({
        query,
        values: queryParams
      });
      
      // Format the response
      const formattedDiscussions = discussions.map(discussion => ({
        id: discussion.id,
        title: discussion.title,
        content: discussion.content,
        author: {
          id: discussion.author_id,
          name: discussion.author_name,
          image: discussion.author_image || '/images/avatars/default.jpg',
          role: discussion.author_role
        },
        category: discussion.category,
        tags: discussion.tags ? discussion.tags.split(',') : [],
        createdAt: discussion.created_at,
        updatedAt: discussion.updated_at,
        likes: discussion.likes,
        comments: discussion.comments_count,
        views: discussion.views
      }));
      
      res.status(200).json(formattedDiscussions);
    } else if (req.method === 'POST') {
      // Check if user is authenticated (would use middleware in a real app)
      // For demo purposes, we'll allow discussion creation without authentication
      
      const { title, content, author_id, category, tags } = req.body;
      
      // Validate required fields
      if (!title || !content || !author_id || !category) {
        return res.status(400).json({ 
          success: false, 
          message: 'Title, content, author_id, and category are required' 
        });
      }
      
      // Create discussion in database
      const result = await executeQuery({
        query: `
          INSERT INTO discussions 
          (title, content, author_id, category, tags, created_at, updated_at, likes, views) 
          VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0, 0)
        `,
        values: [title, content, author_id, category, tags ? tags.join(',') : '']
      });
      
      // Get the created discussion
      const newDiscussion = await executeQuery({
        query: `
          SELECT d.*, u.name as author_name, u.image as author_image, u.role as author_role
          FROM discussions d
          LEFT JOIN users u ON d.author_id = u.id
          WHERE d.id = ?
        `,
        values: [result.insertId]
      });
      
      // Format the response
      const formattedDiscussion = {
        id: newDiscussion[0].id,
        title: newDiscussion[0].title,
        content: newDiscussion[0].content,
        author: {
          id: newDiscussion[0].author_id,
          name: newDiscussion[0].author_name,
          image: newDiscussion[0].author_image || '/images/avatars/default.jpg',
          role: newDiscussion[0].author_role
        },
        category: newDiscussion[0].category,
        tags: newDiscussion[0].tags ? newDiscussion[0].tags.split(',') : [],
        createdAt: newDiscussion[0].created_at,
        updatedAt: newDiscussion[0].updated_at,
        likes: newDiscussion[0].likes,
        comments: 0,
        views: newDiscussion[0].views
      };
      
      res.status(201).json({ success: true, discussion: formattedDiscussion });
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
