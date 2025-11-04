'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import Footer from '../../components/Footer';
import About from "../../components/About";
import Shop from "../../components/Shop";

const XX99MarkIIPage = () => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Product details
  const product = {
    id: 2,
    name: "XX99 MARK II HEADPHONES",
    description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium listening experience by reproducing the balanced depth and precision of studio-quality sound.",
    price: 2950,
    image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"
  };

  // Features
  const features = [
    "New patent-pending driver design delivers enhanced sound quality",
    "Premium materials for maximum comfort and durability",
    "Advanced noise cancellation technology",
    "Wireless and wired connectivity options",
    "30-hour battery life with quick charge capability"
  ];

  // In the box
  const inTheBox = [
    "1x Headphone Unit",
    "2x Replacement Earcups", 
    "1x User Manual",
    "1x 3.5mm Audio Cable",
    "1x USB-C Charging Cable",
    "1x Carrying Case"
  ];

  // Related products
  const relatedProducts = [
    { id: 1, name: "XX99 MARK I", image: "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-i" },
    { id: 3, name: "XX59", image: "/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx59" },
    { id: 4, name: "ZX9 SPEAKER", image: "/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg", link: "/products/zx9-speaker" }
  ];

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity
      }
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/headphones"
          className="text-gray-500 text-sm uppercase tracking-widest hover:text-[hsla(22,65%,57%,1)] transition-colors"
        >
          Go back
        </Link>
      </div>

      {/* Product Hero */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <div>
              <p className="text-[hsla(22,65%,57%,1)] uppercase text-sm tracking-widest mb-2">
                New Product
              </p>
              <h1 className="text-3xl font-bold text-black mb-4 uppercase">
                {product.name}
              </h1>
              <p className="text-gray-500 mb-6">{product.description}</p>
              <p className="text-[hsla(22,65%,57%,1)] font-bold text-lg">
                ${product.price.toLocaleString()}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 py-3 px-4 w-40">
                  <button
                    onClick={decrementQuantity}
                    className="text-gray-500 text-xl"
                  >
                    -
                  </button>
                  <span className="mx-4">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="text-gray-500 text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors flex-1"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-8 uppercase">
                Features
              </h2>
              <div className="flex flex-col">
                <p className="text-gray-500 mb-4">
                  The XX99 Mark II headphones feature a closed-back, circumaural
                  design with enhanced comfort and acoustic performance. The
                  patent-pending driver design delivers exceptional accuracy and
                  soundstage.
                </p>
                <p className="text-gray-500">
                  Premium materials including forged aluminum and memory foam ear
                  cushions ensure maximum comfort and durability. Advanced noise
                  cancellation technology provides an immersive listening experience
                  free from external distractions.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-8 uppercase">
                In the Box
              </h2>
              <div>
                {inTheBox.map((item, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <span className="text-[hsla(22,65%,57%,1)] font-bold mr-4">
                      {index + 1}x
                    </span>
                    <span className="text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg"
              alt="XX99 Mark II Gallery 1"
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg"
              alt="XX99 Mark II Gallery 2"
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg"
              alt="XX99 Mark II Gallery 3"
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black mb-12 text-center uppercase">
          You may also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="text-center">
              <div className="mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-contain mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-4 uppercase">
                {product.name}
              </h3>
              <Link
                href={product.link}
                className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors inline-block"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Shop />

      <About />
      <Footer />
    </div>
  );
};

export default XX99MarkIIPage;