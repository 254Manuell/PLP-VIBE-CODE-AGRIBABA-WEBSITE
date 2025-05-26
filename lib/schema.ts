import { sql } from "drizzle-orm"
import { text, integer, real, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  county: text("county"),
  userType: text("user_type").notNull(),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const farmerProfiles = sqliteTable("farmer_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  farmName: text("farm_name"),
  farmSize: real("farm_size"),
  farmLocation: text("farm_location"),
  bio: text("bio"),
  specializations: text("specializations"), // JSON
  certifications: text("certifications"), // JSON
  rating: real("rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  farmerId: text("farmer_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price: real("price").notNull(),
  unit: text("unit").notNull(),
  quantityAvailable: integer("quantity_available").notNull(),
  quantitySold: integer("quantity_sold").default(0),
  images: text("images"), // JSON
  status: text("status").default("active"),
  organic: integer("organic", { mode: "boolean" }).default(false),
  harvestDate: text("harvest_date"),
  expiryDate: text("expiry_date"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  buyerId: text("buyer_id").notNull(),
  farmerId: text("farmer_id").notNull(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  totalAmount: real("total_amount").notNull(),
  status: text("status").default("pending"),
  deliveryAddress: text("delivery_address"),
  deliveryDate: text("delivery_date"),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
