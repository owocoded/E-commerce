declare module "*.css";

// Define types for our e-commerce platform
// Convex Id type needs to be imported separately
type Id<TableName extends string> = import("./convex/_generated/dataModel").Id<TableName>;

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItem {
  id: number | Id<"cartItems">;
  _id?: Id<"cartItems">;
  userId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

interface OrderTotals {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

interface EMoneyDetails {
  number: string;
  pin: string;
}

interface OrderData {
  customer: CustomerInfo;
  items: OrderItem[];
  totals: OrderTotals;
  paymentMethod: 'e-money' | 'cash-on-delivery';
  eMoneyDetails?: EMoneyDetails;
  userId?: string;
}
