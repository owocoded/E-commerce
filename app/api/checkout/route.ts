import { NextRequest } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from '../../../convex/_generated/api';
import { sendOrderConfirmation } from '../../emails/sendOrderConfirmation';

export async function POST(request: NextRequest) {
  console.log('Checkout API endpoint hit');
  
  try {
    const orderData: OrderData = await request.json();
    console.log('Received order data:', {
      customer: orderData.customer?.name,
      itemsCount: orderData.items?.length,
      paymentMethod: orderData.paymentMethod,
    });

    // Validate required fields
    if (!orderData.customer || !orderData.items || !orderData.totals) {
      console.error('Missing required order data');
      return Response.json({ message: 'Missing required order data' }, { status: 400 });
    }

    // Validate customer data
    if (!orderData.customer.name || !orderData.customer.email || !orderData.customer.phone || 
        !orderData.customer.shippingAddress?.address || !orderData.customer.shippingAddress?.city || 
        !orderData.customer.shippingAddress?.zipCode || !orderData.customer.shippingAddress?.country) {
      console.error('Incomplete customer information');
      return Response.json({ message: 'Incomplete customer information' }, { status: 400 });
    }

    // Validate items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      console.error('Order must contain at least one item');
      return Response.json({ message: 'Order must contain at least one item' }, { status: 400 });
    }

    // Validate totals
    if (typeof orderData.totals.subtotal !== 'number' || 
        typeof orderData.totals.shipping !== 'number' || 
        typeof orderData.totals.vat !== 'number' || 
        typeof orderData.totals.grandTotal !== 'number') {
      console.error('Invalid totals in order data');
      return Response.json({ message: 'Invalid totals in order data' }, { status: 400 });
    }

    // Validate payment method
    const validPaymentMethods = ['e-money', 'cash-on-delivery'];
    if (!validPaymentMethods.includes(orderData.paymentMethod)) {
      console.error('Invalid payment method:', orderData.paymentMethod);
      return Response.json({ message: 'Invalid payment method' }, { status: 400 });
    }

    // Check if Convex URL is configured
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.error('NEXT_PUBLIC_CONVEX_URL is not configured');
      return Response.json({ message: 'Server configuration error' }, { status: 500 });
    }

    console.log('Initializing Convex client with URL:', convexUrl);
    
    // Initialize Convex client to create order
    const convex = new ConvexHttpClient(convexUrl);

    console.log('Creating order in Convex...');
    // Save order to Convex using the new createOrder function
    const orderId = await convex.mutation(api.orders.createOrder, {
      customer: orderData.customer,
      paymentMethod: orderData.paymentMethod,
      eMoneyDetails: orderData.eMoneyDetails,
      items: orderData.items,
      totals: orderData.totals,
      userId: orderData.userId || "guest", // For MVP, use guest if no userId
    });
    
    console.log('Order created successfully with ID:', orderId);

    // Send order confirmation email using Resend
    try {
      console.log('Attempting to send order confirmation email to:', orderData.customer.email);
      console.log('Order ID:', orderId.toString());
      
      const emailSent = await sendOrderConfirmation({
        email: orderData.customer.email,
        orderId: orderId.toString(), // Convert to string for consistent handling
        customer: orderData.customer,
        items: orderData.items.map((item: OrderItem) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          image: item.image
        })),
        grandTotal: orderData.totals.grandTotal,
        subtotal: orderData.totals.subtotal,
        shipping: orderData.totals.shipping,
        vat: orderData.totals.vat
      });

      if (!emailSent) {
        console.error('Failed to send order confirmation email');
        // Note: We still return success since the order was created,
        // but log the email failure for monitoring
      } else {
        console.log('Order confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError);
      // Still return success since the order was created
      // But log the email error for monitoring
    }

    // Return success response with order ID
    console.log('Checkout completed successfully, returning response');
    return Response.json({ 
      success: true, 
      orderId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Checkout error:', error);
    // Provide more context about the error
    if (error instanceof Error) {
      return Response.json({ 
        success: false, 
        message: `Checkout failed: ${error.message}` 
      }, { status: 500 });
    }
    
    return Response.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}