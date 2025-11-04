import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get cart items for a user
export const getCart = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
    
    return cartItems;
  },
});

// Mutation to add item to cart or update quantity if exists
export const addToCart = mutation({
  args: {
    userId: v.string(),
    item: v.object({
      productId: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    // Validate quantity
    if (args.item.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    // Check if item already exists in cart
    const existingCartItem = await ctx.db
      .query("cartItems")
      .withIndex("by_user_and_product", (q) => 
        q.eq("userId", args.userId).eq("productId", args.item.productId)
      )
      .first();

    if (existingCartItem) {
      // Update existing item quantity
      const newQuantity = existingCartItem.quantity + args.item.quantity;
      await ctx.db.patch(existingCartItem._id, {
        quantity: newQuantity,
      });
    } else {
      // Create new cart item
      await ctx.db.insert("cartItems", {
        userId: args.userId,
        productId: args.item.productId,
        name: args.item.name,
        price: args.item.price,
        quantity: args.item.quantity,
        image: args.item.image,
      });
    }
  },
});

// Mutation to update cart item quantity
export const updateCartItem = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate quantity
    if (args.quantity <= 0) {
      // Delete item if quantity is 0 or less
      const cartItem = await ctx.db
        .query("cartItems")
        .withIndex("by_user_and_product", (q) => 
          q.eq("userId", args.userId).eq("productId", args.productId)
        )
        .first();
        
      if (cartItem) {
        await ctx.db.delete(cartItem._id);
      }
      return;
    }

    // Update existing item quantity
    const cartItem = await ctx.db
      .query("cartItems")
      .withIndex("by_user_and_product", (q) => 
        q.eq("userId", args.userId).eq("productId", args.productId)
      )
      .first();
      
    if (!cartItem) {
      throw new Error("Cart item not found");
    }
    
    await ctx.db.patch(cartItem._id, {
      quantity: args.quantity,
    });
  },
});

// Mutation to clear all cart items for a user
export const clearCart = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Delete all cart items for the user
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
  },
});

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