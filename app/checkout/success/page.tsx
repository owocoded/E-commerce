'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import OrderFetcher from './OrderFetcher';
import { Suspense } from 'react';

const CheckoutSuccessContent = () => {
  const { dispatch } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  // Clear cart when the user lands on success page
  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            {/* Checkmark Icon */}
            <div className="bg-[hsla(22,65%,57%,1)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-white text-3xl">✓</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
              THANK YOU FOR YOUR ORDER
            </h1>
            
            {/* Order ID display */}
            {orderId && (
              <p className="text-gray-500 mb-2">Order ID: <span className="font-bold">#{orderId}</span></p>
            )}
            
            {/* Subtext */}
            <p className="text-gray-500 mb-8">
              You will receive an email confirmation shortly.
            </p>
            
            {/* Order Summary */}
            <OrderFetcher orderId={orderId || ""} />
            
            {/* Button */}
            <Link href="/" className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 rounded-full uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors w-full">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutSuccessPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black/50 flex items-center justify-center p-4"><div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"><p className="text-gray-500">Loading...</p></div></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccessPage;