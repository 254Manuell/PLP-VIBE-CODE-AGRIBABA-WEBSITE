import { createClient } from "@supabase/supabase-js"

// Print all environment variables for troubleshooting
console.log("ALL ENV VARS:", process.env);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key
console.log("SUPABASE_URL:", process.env.SUPABASE_URL || "https://lzdxqddgizdhfoiimjnq.supabase.co");
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// Try using environment variables (default, recommended)
// export const supabaseAdmin = createClient(
//   process.env.SUPABASE_URL || "https://lzdxqddgizdhfoiimjnq.supabase.co",
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// Hardcoded fallback for debugging ONLY (remove after test)
export const supabaseAdmin = createClient(
  "https://lzdxqddgizdhfoiimjnq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZHhxZGRnaXpkaGZvaWltam5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0Mzg3NCwiZXhwIjoyMDU4MzE5ODc0fQ.maFweKckaZ-mLb9oGrxukZxkg1B4wsIVpDBkem3XFSU",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);


// Database types
export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  county?: string
  user_type: "farmer" | "buyer" | "exporter" | "processor"
  verified: boolean
  created_at: string
  updated_at: string
}

export interface FarmerProfile {
  id: string
  user_id: string
  farm_name?: string
  farm_size?: number
  farm_location?: string
  bio?: string
  specializations: string[]
  certifications: string[]
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  farmer_id: string
  name: string
  description?: string
  category: string
  price: number
  unit: string
  quantity_available: number
  quantity_sold: number
  images: string[]
  status: "active" | "inactive" | "sold_out"
  organic: boolean
  harvest_date?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  buyer_id: string
  farmer_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_amount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  delivery_address?: string
  delivery_date?: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  created_at: string
  updated_at: string
}
