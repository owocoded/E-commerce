'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<'e-money' | 'cash-on-delivery'>('e-money');
  const [showSummary, setShowSummary] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useCart();

  // Form state with initial values
  const [formData, setFormData] = useState({
    // Billing details
    name: '',
    email: '',
    phone: '',
    // Shipping info
    address: '',
    zipCode: '',
    city: '',
    country: '',
    // Payment details
    eMoneyNumber: '',
    eMoneyPin: ''
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const vat = subtotal * 0.2; // 20% VAT
  const grandTotal = subtotal + shipping + vat;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Billing details validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Shipping info validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Payment details validation (only if e-money is selected)
    if (paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber.trim()) {
        newErrors.eMoneyNumber = 'e-Money number is required';
      }

      if (!formData.eMoneyPin.trim()) {
        newErrors.eMoneyPin = 'e-Money PIN is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Mark as submitting to prevent duplicate submissions
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        createdAt: Date.now(),
        status: 'pending',
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            country: formData.country,
          }
        },
        paymentMethod,
        eMoneyDetails: paymentMethod === 'e-money' ? {
          number: formData.eMoneyNumber,
          pin: formData.eMoneyPin
        } : undefined,
        items: state.items.map(item => ({
          productId: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totals: {
          subtotal,
          shipping,
          vat,
          grandTotal
        }
      };

      // Send order to backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed to process order. Please try again.';
        
        // Provide more specific error messages based on response status
        if (response.status === 400) {
          setErrors({ submit: 'Invalid order data. Please check your information.' });
        } else if (response.status === 500) {
          setErrors({ submit: 'Server error occurred. Please try again later.' });
        } else {
          setErrors({ submit: errorMessage });
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Clear cart after successful order
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to success page with order ID
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch (error: any) {
      console.error('Checkout error:', error);
      // Only set the error if it's not already set by the response handler
      if (!errors.submit) {
        setErrors({ 
          submit: error.message || 'An unexpected error occurred. Please try again.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white uppercase">Checkout</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Form */}
          <div className="lg:w-7/12">
            <form onSubmit={handlePayment}>
              <div className="mb-12">
                <h2 className="text-[hsla(22,65%,57%,1)] uppercase font-bold text-lg mb-6">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-500 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alexei Ward" 
                      className={`w-full border rounded py-3 px-4 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alexei@gmail.com" 
                      className={`w-full border rounded py-3 px-4 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-gray-500 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 202-555-0136" 
                      className={`w-full border rounded py-3 px-4 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-[hsla(22,65%,57%,1)] uppercase font-bold text-lg mb-6">Shipping Info</h2>
                <div>
                  <label htmlFor="address" className="block text-gray-500 mb-2">Address</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="1137 Williams Avenue" 
                    className={`w-full border rounded py-3 px-4 mb-6 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "address-error" : undefined}
                  />
                  {errors.address && (
                    <p id="address-error" className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-500 mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001" 
                        className={`w-full border rounded py-3 px-4 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.zipCode}
                        aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                      />
                      {errors.zipCode && (
                        <p id="zipCode-error" className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-500 mb-2">City</label>
                      <input 
                        type="text" 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York" 
                        className={`w-full border rounded py-3 px-4 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "city-error" : undefined}
                      />
                      {errors.city && (
                        <p id="city-error" className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-500 mb-2">Country</label>
                      <input 
                        type="text" 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="United States" 
                        className={`w-full border rounded py-3 px-4 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? "country-error" : undefined}
                      />
                      {errors.country && (
                        <p id="country-error" className="text-red-500 text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[hsla(22,65%,57%,1)] uppercase font-bold text-lg mb-6">Payment Details</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input 
                      type="radio" 
                      id="e-money" 
                      name="payment" 
                      checked={paymentMethod === 'e-money'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPaymentMethod('e-money');
                        }
                      }}
                      className="h-5 w-5 text-[hsla(22,65%,57%,1)]"
                    />
                    <label htmlFor="e-money" className="ml-3 text-gray-500">e-Money</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="cash" 
                      name="payment" 
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPaymentMethod('cash-on-delivery');
                        }
                      }}
                      className="h-5 w-5 text-[hsla(22,65%,57%,1)]"
                    />
                    <label htmlFor="cash" className="ml-3 text-gray-500">Cash on Delivery</label>
                  </div>
                </div>

                {paymentMethod === 'e-money' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="eMoneyNumber" className="block text-gray-500 mb-2">e-Money Number</label>
                      <input 
                        type="text" 
                        id="eMoneyNumber"
                        name="eMoneyNumber"
                        value={formData.eMoneyNumber}
                        onChange={handleChange}
                        placeholder="238521993" 
                        className={`w-full border rounded py-3 px-4 ${errors.eMoneyNumber ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.eMoneyNumber}
                        aria-describedby={errors.eMoneyNumber ? "eMoneyNumber-error" : undefined}
                      />
                      {errors.eMoneyNumber && (
                        <p id="eMoneyNumber-error" className="text-red-500 text-sm mt-1">{errors.eMoneyNumber}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="eMoneyPin" className="block text-gray-500 mb-2">e-Money PIN</label>
                      <input 
                        type="text" 
                        id="eMoneyPin"
                        name="eMoneyPin"
                        value={formData.eMoneyPin}
                        onChange={handleChange}
                        placeholder="6891" 
                        className={`w-full border rounded py-3 px-4 ${errors.eMoneyPin ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.eMoneyPin}
                        aria-describedby={errors.eMoneyPin ? "eMoneyPin-error" : undefined}
                      />
                      {errors.eMoneyPin && (
                        <p id="eMoneyPin-error" className="text-red-500 text-sm mt-1">{errors.eMoneyPin}</p>
                      )}
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded">
                    {errors.submit}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[hsla(22,65%,57%,1)] text-white px-6 py-4 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Processing...' : 'Continue & Pay'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary - Hidden on Mobile */}
          <div className="lg:w-5/12 hidden lg:block">
            <div className="bg-gray-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-6">Summary</h2>
              
              <div className="space-y-6 mb-8">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-black">{item.name}</h3>
                      <p className="text-gray-500">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-gray-500">x{item.quantity}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">TOTAL</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SHIPPING</span>
                  <span className="font-bold">${shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">VAT (INCLUDED)</span>
                  <span className="font-bold">${vat.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">GRAND TOTAL</span>
                    <span className="font-bold text-[hsla(22,65%,57%,1)] text-lg">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Summary Section */}
        <div className="lg:hidden mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Summary</h2>
            <button 
              onClick={() => setShowSummary(!showSummary)}
              className="text-[hsla(22,65%,57%,1)]"
            >
              {showSummary ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          {showSummary && (
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="space-y-6 mb-8">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-black">{item.name}</h3>
                      <p className="text-gray-500">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-gray-500">x{item.quantity}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">TOTAL</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SHIPPING</span>
                  <span className="font-bold">${shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">VAT (INCLUDED)</span>
                  <span className="font-bold">${vat.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">GRAND TOTAL</span>
                    <span className="font-bold text-[hsla(22,65%,57%,1)] text-lg">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;