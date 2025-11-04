'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Define TypeScript types
type LocalCartItem = {
  _id?: string; // For Convex
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
};

type CartState = {
  items: LocalCartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: LocalCartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'SET_CART'; payload: LocalCartItem[] };

// Cart Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: LocalCartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items: updatedItems, total };
      } else {
        const updatedItems = [...state.items, action.payload];
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items: updatedItems, total };
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items: updatedItems, total };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const newQuantity = item.quantity + action.payload.quantity;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with 0 or negative quantity
      
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items: updatedItems, total };
    }

    case 'SET_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items: updatedItems, total };
    }

    case 'SET_CART': {
      const total = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items: action.payload, total };
    }

    case 'CLEAR_CART': {
      return { items: [], total: 0 };
    }

    default:
      return state;
  }
};

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Cart Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // For MVP, using "guest" as userId
  const userId = "guest";
  
  // Convex functions
  const addToCartItem = useMutation(api.cart.addToCart);
  const updateCartItem = useMutation(api.cart.updateCartItem);
  const clearCartItems = useMutation(api.cart.clearCart);
  const cartItems = useQuery(api.cart.getCart, { userId }) ?? [];

  // Sync local state with Convex (initial load)
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const localCartItems = cartItems.map(item => ({
        id: parseInt(item.productId) || 0, // Using a fallback for id
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        _id: item._id
      }));
      dispatch({ type: 'SET_CART', payload: localCartItems });
    }
  }, [cartItems]);

  // Wrapper functions to handle both local state and Convex
  const addToCart = async (item: LocalCartItem) => {
    // Update local state
    dispatch({ type: 'ADD_ITEM', payload: item });
    
    // Update Convex
    await addToCartItem({
      userId,
      item: {
        productId: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }
    });
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const item = state.items.find(i => i.id === id);
    if (item) {
      // Calculate the difference for the mutation
      const difference = quantity - item.quantity;
      
      // Update local state
      dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } });
      
      // Update Convex
      await updateCartItem({
        userId,
        productId: id.toString(),
        quantity
      });
    }
  };

  const removeFromCart = async (id: number) => {
    // Update local state
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    
    // Update Convex - set quantity to 0 to remove
    await updateCartItem({
      userId,
      productId: id.toString(),
      quantity: 0
    });
  };

  const clearCart = async () => {
    // Update local state
    dispatch({ type: 'CLEAR_CART' });
    
    // Update Convex
    await clearCartItems({ userId });
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};