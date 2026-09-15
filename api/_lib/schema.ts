import {
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  price: real("price").notNull(),
  oldPrice: real("old_price"),
  rating: real("rating").notNull(),
  reviews: integer("reviews").notNull(),
  tag: text("tag"),
  image: text("image").notNull(),
  blurb: text("blurb").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  subtotal: real("subtotal").notNull(),
  tax: real("tax").notNull(),
  shipping: real("shipping").notNull(),
  total: real("total").notNull(),
  status: text("status").notNull().default("placed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id),
  name: text("name").notNull(),
  price: real("price").notNull(),
  qty: integer("qty").notNull(),
});
