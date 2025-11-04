'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Image from 'next/image';
import { Suspense } from "react";
import OrderFetcherErrorBoundary from "./OrderFetcherErrorBoundary";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: {
      address: string;
      city: string;
      zipCode: string;
      country: string;
    };
  };
  paymentMethod: string;
  items: OrderItem[];
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
  createdAt: number;
  status: string;
}

interface OrderFetcherProps {
  orderId: string;
}

function OrderFetcherContent({ orderId }: OrderFetcherProps) {
  // Using useQuery hook to fetch order data
  const order = useQuery(api.orders.getOrderById, { 
    orderId: orderId as any // Temporary fix - in a real app, we'd ensure orderId is properly typed as Id<"orders">
  });

  // Check if the order exists
  if (!order) {
    return <p className="text-red-500 mb-2">Order not found</p>;
  }

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 mb-8">
      {order.items.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
                <Image 
                  src={order.items[0].image} 
                  alt={order.items[0].name} 
                  className="w-full h-full object-contain"
                  width={64}
                  height={64}
                />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-black">{order.items[0].name}</h3>
                <p className="text-gray-500">${order.items[0].price.toLocaleString()} x {order.items[0].quantity}</p>
              </div>
            </div>
            <div className="bg-black text-white py-2 px-4 rounded">
              <p className="font-bold">${(order.items[0].price * order.items[0].quantity).toLocaleString()}</p>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm text-left">and {order.items.length - 1} other item(s)</p>
        </>
      )}
    </div>
  );
}

export default function OrderFetcher({ orderId }: OrderFetcherProps) {
  if (!orderId) {
    return <p className="text-red-500 mb-2">No order ID provided</p>;
  }
  
  return (
    <OrderFetcherErrorBoundary fallback={<p className="text-red-500 mb-2">Failed to load order details. Invalid order ID.</p>}>
      <Suspense fallback={<p className="text-gray-500 mb-2">Loading order details...</p>}>
        <OrderFetcherContent orderId={orderId} />
      </Suspense>
    </OrderFetcherErrorBoundary>
  );
}