import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Server action to create an order
export const createOrder = mutation({
  args: {
    userId: v.optional(v.string()),
    createdAt: v.number(),
    status: v.string(),
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      createdAt: args.createdAt,
      status: args.status,
      customer: args.customer,
      paymentMethod: args.paymentMethod,
      eMoneyDetails: args.eMoneyDetails,
      items: args.items,
      totals: args.totals,
    });

    return orderId;
  },
});