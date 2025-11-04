import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cartItems: defineTable({
    userId: v.string(),
    productId: v.string(),
    name: v.string(),
    price: v.number(),
    quantity: v.number(),
    image: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_and_product", ["userId", "productId"]),
  
  orders: defineTable({
    userId: v.optional(v.string()),
    createdAt: v.number(), // timestamp
    status: v.string(), // e.g., "pending", "confirmed", "shipped", "delivered"
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      shippingAddress: v.object({
        address: v.string(),
        city: v.string(),
        zipCode: v.string(),
        country: v.string(),
      }),
    }),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash-on-delivery")),
    eMoneyDetails: v.optional(v.object({
      number: v.string(),
      pin: v.string(), // store hashed in real app — for now, plain string
    })),
    items: v.array(v.object({
      productId: v.string(), // e.g., "xx99-mark-ii"
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(), // URL or path
    })),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
  }),
});