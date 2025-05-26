-- Agribaba MySQL Database Schema

-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS currency_conversions;
DROP TABLE IF EXISTS exchange_rates;
DROP TABLE IF EXISTS discussion_comments;
DROP TABLE IF EXISTS discussions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('farmer', 'buyer', 'admin') NOT NULL,
  image VARCHAR(255) DEFAULT '/images/avatars/default.jpg',
  location VARCHAR(100),
  phone VARCHAR(20),
  joined_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255) DEFAULT '/images/products/default.jpg',
  price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  rating DECIMAL(3, 1) DEFAULT 0,
  seller VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Discussions table
CREATE TABLE discussions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags VARCHAR(255),
  likes INT DEFAULT 0,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Discussion comments table
CREATE TABLE discussion_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discussion_id INT NOT NULL,
  author_id INT NOT NULL,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Exchange rates table
CREATE TABLE exchange_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_currency VARCHAR(3) NOT NULL,
  to_currency VARCHAR(3) NOT NULL,
  rate DECIMAL(10, 6) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY currency_pair (from_currency, to_currency)
);

-- Currency conversions log table
CREATE TABLE currency_conversions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  from_currency VARCHAR(3) NOT NULL,
  to_currency VARCHAR(3) NOT NULL,
  converted_amount DECIMAL(10, 2) NOT NULL,
  rate DECIMAL(10, 6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial exchange rates
INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at) VALUES
('KES', 'USD', 0.0072, NOW()),
('USD', 'KES', 139.0, NOW());

-- Insert sample users
INSERT INTO users (name, email, password, role, image, location, phone, joined_date) VALUES
('John Kimani', 'john@example.com', '$2a$10$XQxBGIz8a6Wd5.8J5p4kPO8KQB0jUcjPj7wYKOi/bKFBYOdQDwjhK', 'farmer', '/images/avatars/farmer1.jpg', 'Nakuru, Kenya', '+254 712 345 678', '2023-01-15'),
('Sarah Wanjiku', 'sarah@example.com', '$2a$10$XQxBGIz8a6Wd5.8J5p4kPO8KQB0jUcjPj7wYKOi/bKFBYOdQDwjhK', 'buyer', '/images/avatars/buyer1.jpg', 'Nairobi, Kenya', '+254 723 456 789', '2023-02-20'),
('David Mwangi', 'david@example.com', '$2a$10$XQxBGIz8a6Wd5.8J5p4kPO8KQB0jUcjPj7wYKOi/bKFBYOdQDwjhK', 'farmer', '/images/avatars/farmer2.jpg', 'Kiambu, Kenya', '+254 734 567 890', '2023-03-10');

-- Insert sample products
INSERT INTO products (name, image, price, unit, category, rating, seller, location, featured, description) VALUES
('Organic Tomatoes', '/images/products/tomatoes.jpg', 120, 'kg', 'vegetables', 4.8, 'Kimani Farms', 'Nakuru', TRUE, 'Fresh, organic tomatoes grown without pesticides. These juicy, ripe tomatoes are perfect for salads, cooking, and sauces.'),
('Fresh Spinach', '/images/products/spinach.jpg', 80, 'kg', 'vegetables', 4.5, 'Green Acres', 'Kiambu', FALSE, 'Nutritious, dark green spinach leaves grown using hydroponic methods. Rich in iron, vitamins, and antioxidants.'),
('Arboro Lettuce', '/images/products/lettuce.jpg', 150, 'kg', 'vegetables', 4.7, 'Hydroponic Solutions', 'Nairobi', TRUE, 'Crisp, fresh Arboro lettuce grown in controlled environments. Perfect for salads and sandwiches.'),
('Sweet Corn', '/images/products/corn.jpg', 100, 'kg', 'vegetables', 4.3, 'Meru Highlands', 'Meru', FALSE, 'Sweet and juicy corn, perfect for grilling or boiling. Grown using sustainable farming practices.'),
('Bananas', '/images/products/bananas.jpg', 90, 'kg', 'fruits', 4.6, 'Coastal Farms', 'Mombasa', FALSE, 'Sweet and nutritious bananas, perfect for snacking or adding to smoothies.'),
('Avocados', '/images/products/avocados.jpg', 180, 'kg', 'fruits', 4.8, 'Green Hills Farm', 'Muranga', TRUE, 'Creamy, delicious Hass avocados. High in healthy fats and perfect for salads, sandwiches, or making guacamole.');

-- Insert sample discussions
INSERT INTO discussions (title, content, author_id, category, tags, likes, views) VALUES
('Best practices for tomato farming in dry seasons', 'I\'ve been struggling with my tomato crops during the dry season. Any advice on irrigation methods that conserve water while ensuring good yields?', 1, 'crop_management', 'tomatoes,irrigation,dry_season', 24, 156),
('Market prices for maize in Western Kenya', 'Has anyone noticed the fluctuating maize prices in Western Kenya? What\'s causing this and when do you think prices will stabilize?', 3, 'market_insights', 'maize,prices,western_kenya', 18, 203),
('Organic pest control methods for vegetables', 'I\'m looking for effective organic pest control methods for my vegetable farm. Chemical pesticides are expensive and I\'m trying to maintain organic standards.', 1, 'pest_control', 'organic,pest_control,vegetables', 32, 278);

-- Insert sample discussion comments
INSERT INTO discussion_comments (discussion_id, author_id, content, likes) VALUES
(1, 2, 'I\'ve had success with drip irrigation systems. They deliver water directly to the plant roots, minimizing evaporation. Initial setup cost is high but it pays off in the long run.', 12),
(1, 3, 'Mulching has been very effective for me. It helps retain soil moisture and suppresses weeds. I use organic materials like straw or dried grass.', 8),
(2, 1, 'I\'ve noticed the same trend. I think it\'s due to increased imports from Tanzania. Prices should stabilize after the next harvest season.', 6),
(3, 2, 'I use neem oil spray for pest control. It\'s effective against a wide range of pests and is completely organic. You can make it yourself or buy it pre-made.', 15);
