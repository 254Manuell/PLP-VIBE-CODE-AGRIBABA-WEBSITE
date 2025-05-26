# Agribaba

A full-stack web application connecting farmers with buyers locally and internationally.

## Features

- Direct farmer-to-buyer marketplace
- Community forum for farmers and buyers
- Real-time price updates
- Currency toggle between Kenyan Shillings (KES) and US Dollars (USD)
- Responsive design for all devices
- User profiles for farmers and buyers
- Product listings with images and descriptions
- Market insights and trends

## Tech Stack

- Frontend: React.js with Next.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS
- Deployment: Vercel (Frontend) and Heroku (Backend)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/agribaba.git
cd agribaba
```

2. Install dependencies
```
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory and add the following:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server
```
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
agribaba/
├── components/       # React components
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS styles
├── lib/              # Utility functions
├── models/           # Database models
├── api/              # API routes
└── context/          # React context providers
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
