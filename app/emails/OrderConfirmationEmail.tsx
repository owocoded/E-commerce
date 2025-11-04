export const generateOrderConfirmationEmail = (order: any) => {
  const { customer, items, totals, orderId } = order;
  
  // Calculate total items
  const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  
  // Calculate total amount
  const totalAmount = totals.grandTotal;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    }
    .header { 
      text-align: center; 
      border-bottom: 2px solid #e0e0e0; 
      padding-bottom: 20px; 
      margin-bottom: 20px; 
    }
    .order-summary { 
      background-color: #f9f9f9; 
      padding: 15px; 
      border-radius: 5px; 
      margin: 20px 0; 
    }
    .items { 
      width: 100%; 
      border-collapse: collapse; 
    }
    .items th, .items td { 
      text-align: left; 
      padding: 10px; 
      border-bottom: 1px solid #ddd; 
    }
    .items th { 
      background-color: #f2f2f2; 
    }
    .totals { 
      margin-top: 20px; 
      text-align: right; 
    }
    .total-row { 
      padding: 5px 0; 
    }
    .grand-total { 
      font-weight: bold; 
      font-size: 1.2em; 
      border-top: 2px solid #333; 
      padding-top: 10px; 
    }
    .footer { 
      margin-top: 30px; 
      padding-top: 20px; 
      border-top: 1px solid #e0e0e0; 
      text-align: center; 
      color: #666; 
    }
    .cta-button { 
      display: inline-block; 
      background-color: #d87c4b; 
      color: white; 
      padding: 12px 24px; 
      text-decoration: none; 
      border-radius: 4px; 
      margin: 15px 0; 
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Thank You for Your Order!</h1>
    <p>Order ID: #${orderId}</p>
  </div>
  
  <p>Dear ${customer.name},</p>
  
  <p>Your order has been successfully placed. Here are the details:</p>
  
  <div class="order-summary">
    <h2>Order Summary</h2>
    <table class="items">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item: any) => `
          <tr>
            <td>${item.name}</td>
            <td>$${item.price.toLocaleString()}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div class="totals">
      <div class="total-row">
        <strong>Subtotal:</strong> $${totals.subtotal.toFixed(2)}
      </div>
      <div class="total-row">
        <strong>Shipping:</strong> $${totals.shipping.toFixed(2)}
      </div>
      <div class="total-row">
        <strong>VAT:</strong> $${totals.vat.toFixed(2)}
      </div>
      <div class="total-row grand-total">
        <strong>Grand Total:</strong> $${totals.grandTotal.toFixed(2)}
      </div>
    </div>
  </div>
  
  <h3>Shipping Information</h3>
  <p>
    ${customer.shippingAddress.address}<br>
    ${customer.shippingAddress.city}, ${customer.shippingAddress.zipCode}<br>
    ${customer.shippingAddress.country}
  </p>
  
  <h3>Payment Method</h3>
  <p>${order.paymentMethod === 'e-money' ? 'E-Money' : 'Cash on Delivery'}</p>
  
  <p>Thank you for shopping with us! Your order will be processed shortly.</p>
  
  <div style="text-align: center; margin: 20px 0;">
    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/orders/${orderId}" class="cta-button">View Your Order</a>
  </div>
  
  <div class="footer">
    <p><strong>Need help?</strong></p>
    <p>Our customer service team is here for you.</p>
    <p>Email: support@audiophile.com</p>
    <p>Phone: +1 (234) 567-8900</p>
    <p>${new Date().getFullYear()} Audiophile. All rights reserved.</p>
  </div>
</body>
</html>
  `;
};

export default generateOrderConfirmationEmail;