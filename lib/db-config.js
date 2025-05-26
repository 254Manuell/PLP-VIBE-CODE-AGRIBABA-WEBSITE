import mysql from 'serverless-mysql';

// Configure MySQL connection
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'agribaba',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
  }
});

// Helper function to execute SQL queries
export async function executeQuery({ query, values = [] }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default db;
