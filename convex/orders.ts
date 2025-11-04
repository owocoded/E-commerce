import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create an order
export const createOrder = mutation({
  args: {
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
      pin: v.string(),
    })),
    items: v.array(v.object({
      productId: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    userId: v.optional(v.string()), // For MVP, use "guest" if not provided
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId || "guest", // For MVP, use guest if no userId
      createdAt: Date.now(), // Use current timestamp
      status: "pending", // Default status
      customer: args.customer,
      paymentMethod: args.paymentMethod,
      eMoneyDetails: args.eMoneyDetails,
      items: args.items,
      totals: args.totals,
    });

    return orderId;
  },
});

// Query to get order by ID
export const getOrderById = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    return order;
  },
});