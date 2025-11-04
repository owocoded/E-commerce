import { Resend } from 'resend';

interface SendOrderConfirmationParams {
  email: string;
  orderId: string;
  customer: CustomerInfo;
  items: OrderItem[];
  grandTotal: number;
  subtotal: number;
  shipping: number;
  vat: number;
}

export async function sendOrderConfirmation({ 
  email, 
  orderId, 
  customer, 
  items, 
  grandTotal, 
  subtotal, 
  shipping, 
  vat 
}: SendOrderConfirmationParams): Promise<boolean> {
  // Check if RESEND_API_KEY is available
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return false;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formattedGrandTotal = `$${grandTotal.toLocaleString()}`;
    
    // Generate HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Your Audiophile Order #${orderId} is Confirmed!</title>
          <style>
            body {
              font-family: 'Manrope', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 30px 0;
            }
            .greeting {
              font-size: 20px;
              color: #000000;
              text-align: center;
              margin: 0 0 20px 0;
            }
            .thank-you {
              font-size: 24px;
              font-weight: bold;
              color: #000000;
              text-align: center;
              margin: 0 0 10px 0;
            }
            .subtext {
              color: #7d7d7d;
              text-align: center;
              margin: 0 0 30px 0;
            }
            .order-summary {
              padding: 20px;
              border: 1px solid #eaeaea;
              border-radius: 4px;
              margin: 20px 0;
            }
            .order-details {
              padding: 20px;
              border: 1px solid #eaeaea;
              border-radius: 4px;
              margin: 20px 0;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #000000;
              margin-bottom: 15px;
            }
            .shipping-info {
              margin: 10px 0;
            }
            .shipping-info p {
              margin: 5px 0;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .table th {
              text-align: left;
              padding: 12px 8px;
              border-bottom: 1px solid #eaeaea;
              color: #7d7d7d;
            }
            .table td {
              padding: 12px 8px;
              border-bottom: 1px solid #eaeaea;
            }
            .table .product-cell {
              color: #000000;
            }
            .table .quantity-cell {
              color: #000000;
            }
            .table .price-cell {
              color: #000000;
            }
            .total-row {
              font-weight: bold;
              border-top: 2px solid #000000;
            }
            .grand-total {
              color: #D87D4A !important;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              background-color: #D87D4A;
              color: #ffffff !important;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 4px;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              text-align: center;
              padding: 20px 0;
              color: #7d7d7d;
              font-size: 14px;
              border-top: 1px solid #eaeaea;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="greeting">Hi ${customer.name},</p>
              <h1 class="thank-you">THANK YOU FOR YOUR ORDER</h1>
              <p class="subtext">We've received your order and will send a shipping confirmation once it's on its way.</p>
            </div>
            
            <div class="order-details">
              <h3 class="section-title">ORDER #${orderId}</h3>
              <div class="shipping-info">
                <p><strong>Shipping Address:</strong></p>
                <p>${customer.shippingAddress.address}</p>
                <p>${customer.shippingAddress.city}, ${customer.shippingAddress.zipCode}</p>
                <p>${customer.shippingAddress.country}</p>
              </div>
              <div class="shipping-info">
                <p><strong>Contact:</strong></p>
                <p>${customer.phone}</p>
                <p>${customer.email}</p>
              </div>
            </div>
            
            <div class="order-summary">
              <h3 class="section-title">ORDER SUMMARY</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td class="product-cell">${item.name}</td>
                      <td class="quantity-cell">${item.quantity}</td>
                      <td class="price-cell">$${item.price.toLocaleString()}</td>
                    </tr>
                  `).join('')}
                  <tr>
                    <td colspan="2">Subtotal</td>
                    <td>$${subtotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="2">Shipping</td>
                    <td>$${shipping.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="2">VAT (Included)</td>
                    <td>$${vat.toLocaleString()}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="2">GRAND TOTAL</td>
                    <td class="grand-total">${formattedGrandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?orderId=${orderId}" class="cta-button">View Your Order</a>
            </div>
            
            <div class="footer">
              <p>Questions? Contact us at support@audiophile.com</p>
              <p>&copy; ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Sending email with Resend API...');
    const response = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>', // Should be replaced with verified domain
      to: email,
      subject: `Your Audiophile Order #${orderId} is Confirmed!`,
      html: htmlContent,
      text: `Thanks for your purchase. Your order is being processed. Order ID: ${orderId}. Greeting: Hi ${customer.name}.`
    });

    console.log('Email sent successfully:', response);

    if (response.error) {
      console.error('Error sending email:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendOrderConfirmation:', error);
    return false;
  }
}