import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';
import About from "../../components/About";
import Shop from "../../components/Shop";

const XX59Page = () => {
  // Product details
  const product = {
    name: "XX59 HEADPHONES",
    description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish, lightweight, and compact design makes the XX59 perfect for every situation.",
    price: 899,
  };

  // Features
  const features = [
    "Lightweight, durable aluminum and synthetic polymer construction",
    "Folding design for easy storage and portability",
    "Advanced wireless technology with Bluetooth 5.0",
    "Built-in microphones for clear communication",
    "30-hour battery life with quick charge capability"
  ];

  // In the box
  const inTheBox = [
    "1x Headphone Unit",
    "2x Replacement Earcups", 
    "1x User Manual",
    "1x 3.5mm 5m Audio Cable"
  ];

  // Related products
  const relatedProducts = [
    { id: 1, name: "XX99 MARK II", image: "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-ii" },
    { id: 2, name: "XX99 MARK I", image: "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-i" },
    { id: 3, name: "ZX9 SPEAKER", image: "/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg", link: "/products/zx9-speaker" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/headphones" className="text-gray-500 text-sm uppercase tracking-widest hover:text-[hsla(22,65%,57%,1)] transition-colors">
          Go back
        </Link>
      </div>

      {/* Product Hero */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Image 
              src="/assets/product-xx59-headphones/desktop/image-product.jpg" 
              alt="XX59 Headphones" 
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <div>
              <h1 className="text-3xl font-bold text-black mb-4 uppercase">{product.name}</h1>
              <p className="text-gray-500 mb-6">{product.description}</p>
              <p className="text-[hsla(22,65%,57%,1)] font-bold text-lg">${product.price.toLocaleString()}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 py-3 px-4 w-40">
                  <button className="text-[hsla(22,65%,57%,1)] text-xl">-</button>
                  <span className="mx-4">1</span>
                  <button className="text-[hsla(22,65%,57%,1)] text-xl">+</button>
                </div>
                <button className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors flex-1">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-8 uppercase">Features</h2>
              <div className="prose max-w-none">
                <p className="text-gray-500 mb-4">
                  The XX59 headphones feature a lightweight and durable construction with a combination of aluminum and high-quality synthetic polymers. This ensures both portability and long-lasting performance.
                </p>
                <p className="text-gray-500">
                  With the folding design, the XX59 headphones are easy to pack and store. Advanced wireless technology with Bluetooth 5.0 provides a stable connection with minimal latency. The built-in microphones ensure clear communication for calls, while the 30-hour battery life means you can enjoy your music all day long.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-8 uppercase">In the Box</h2>
              <div>
                {inTheBox.map((item, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <span className="text-[hsla(22,65%,57%,1)] font-bold mr-4">{index + 1}x</span>
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
              src="/assets/product-xx59-headphones/desktop/image-gallery-1.jpg" 
              alt="XX59 Gallery 1" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-xx59-headphones/desktop/image-gallery-2.jpg" 
              alt="XX59 Gallery 2" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-xx59-headphones/desktop/image-gallery-3.jpg" 
              alt="XX59 Gallery 3" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/shared/desktop/image-best-gear.jpg" 
              alt="XX59 Lifestyle" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black mb-12 text-center uppercase">You may also like</h2>
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
              <h3 className="text-xl font-bold text-black mb-4 uppercase">{product.name}</h3>
              <Link href={product.link} className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors inline-block">
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

export default XX59Page;