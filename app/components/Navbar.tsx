'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { state } = useCart();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'HEADPHONES', href: '/headphones' },
    { name: 'SPEAKERS', href: '/speakers' },
    { name: 'EARPHONES', href: '/earphones' },
  ];

  return (
    <nav className="bg-black py-4 px-6 md:py-5 md:px-10">
      <div className="flex items-center border-b border-gray-800 pb-5">
        {/* Mobile: Hamburger on the left, Desktop: Hidden */}
        <div className="md:hidden flex items-center mr-4">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              src="/assets/shared/tablet/icon-hamburger.svg"
              alt="Menu"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Logo - Centered on mobile/tablet, left on desktop */}
        <div className="flex-1 md:w-1/3 flex justify-center md:justify-start">
          <Link href="/" className="mx-auto md:mx-0">
            <Image
              src="/assets/logo.svg"
              alt="Audiophile Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links - Hidden on Mobile, Centered on Desktop */}
        <div className="hidden md:flex md:w-1/3 items-center justify-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white uppercase font-medium text-sm tracking-wider hover:text-[hsla(22,93%,75%,1)] transition-colors duration-300 ${
                pathname === link.href
                  ? "border-b-2 border-[hsla(22,65%,57%,1)]"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Cart icon - On the right for both mobile and desktop */}
        <div className="flex items-center md:w-1/3 justify-end">
          <Link
            href="/cart"
            className="text-white hover:text-[hsla(22,93%,75%,1)] transition-colors relative"
          >
            <Image
              src="/assets/shared/desktop/icon-cart.svg"
              alt="Cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[hsla(22,65%,57%,1)]  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white uppercase font-medium text-base tracking-wider hover:text-[hsla(22,93%,75%,1)] transition-colors duration-300 ${
                  pathname === link.href
                    ? "border-l-4 border-[hsla(22,65%,57%,1)] pl-4"
                    : "pl-4"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;