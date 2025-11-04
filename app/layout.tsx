import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "./components/Navbar";
import { ConvexClientProvider } from "./components/ConvexClientProvider";
import { CartProvider } from "@/app/context/CartContext";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "Audiophile",
  description: "Premium audio equipment for the discerning listener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <ConvexClientProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
