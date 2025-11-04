'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantities less than 1
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const removeAll = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white uppercase">CART ({state.items.length})</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {state.items.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold text-black uppercase">CART ({state.items.length})</h2>
                <button 
                  onClick={removeAll}
                  className="text-gray-500 uppercase text-sm hover:text-[hsla(22,65%,57%,1)] transition-colors"
                >
                  Remove all
                </button>
              </div>

              <div className="space-y-6 mb-12">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 px-6 bg-gray-100 rounded-lg">
                    <div className="w-20 h-20 bg-gray-200 rounded-md mr-6 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-black">{item.name}</h3>
                      <p className="text-orange-500">${item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-100 w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-100 w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-6 text-gray-500 hover:text-[hsla(22,65%,57%,1)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-500">TOTAL</span>
                <span className="font-bold text-2xl">${state.total.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-4 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors block text-center">
                Checkout
              </Link>
            </>
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-black mb-6">YOUR CART IS EMPTY</h2>
              <p className="text-gray-700 mb-6">Looks like you haven't added anything to your cart yet. Go ahead and explore our categories to find items you like.</p>
              <Link href="/" className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 rounded-full uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors inline-block">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;