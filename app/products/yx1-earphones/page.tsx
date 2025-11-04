import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';
import About from "../../components/About";
import Shop from "../../components/Shop";

const YX1EarphonesPage = () => {
  // Product details
  const product = {
    name: "YX1 WIRELESS EARPHONES",
    description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Experience premium sound with our advanced acoustic technology.",
    price: 599,
  };

  // Features
  const features = [
    "Bespoke dynamic drivers for personalized audio experience",
    "Advanced acoustic technology for premium sound quality",
    "Wireless connectivity with Bluetooth 5.2",
    "Up to 20 hours of battery life with charging case",
    "Ergonomic design with multiple ear tip sizes for comfort"
  ];

  // In the box
  const inTheBox = [
    "1x YX1 Wireless Earphones",
    "2x Silicone Ear Tips (Size S, M, L)",
    "1x Charging Case",
    "1x USB-C Charging Cable",
    "1x User Manual"
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
        <Link href="/earphones" className="text-gray-500 text-sm uppercase tracking-widest hover:text-[hsla(22,65%,57%,1)] transition-colors">
          Go back
        </Link>
      </div>

      {/* Product Hero */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Image 
              src="/assets/product-yx1-earphones/desktop/image-product.jpg" 
              alt="YX1 Wireless Earphones" 
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <div>
              <p className="text-[hsla(22,65%,57%,1)] uppercase text-sm tracking-widest mb-2">New Product</p>
              <h1 className="text-3xl font-bold text-black mb-4 uppercase">{product.name}</h1>
              <p className="text-gray-500 mb-6">{product.description}</p>
              <p className="text-orange-500 font-bold text-lg">${product.price.toLocaleString()}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 py-3 px-4 w-40">
                  <button className="text-orange-500 text-xl">-</button>
                  <span className="mx-4">1</span>
                  <button className="text-orange-500 text-xl">+</button>
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
                  The YX1 Wireless Earphones feature bespoke dynamic drivers that allow you to tailor your listening experience. Advanced acoustic technology ensures premium sound quality in a compact, wireless package.
                </p>
                <p className="text-gray-500">
                  With Bluetooth 5.2 connectivity, you will enjoy a stable wireless connection with minimal latency. The ergonomic design and multiple ear tip sizes ensure a comfortable fit for extended listening sessions. The charging case provides up to 20 hours of total battery life, making these earphones perfect for travel or daily use.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-8 uppercase">In the Box</h2>
              <div>
                {inTheBox.map((item, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <span className="text-orange-500 font-bold mr-4">{index + 1}x</span>
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
              src="/assets/product-yx1-earphones/desktop/image-gallery-1.jpg" 
              alt="YX1 Wireless Earphones Gallery 1" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-yx1-earphones/desktop/image-gallery-2.jpg" 
              alt="YX1 Wireless Earphones Gallery 2" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-yx1-earphones/desktop/image-gallery-3.jpg" 
              alt="YX1 Wireless Earphones Gallery 3" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/shared/desktop/image-best-gear.jpg" 
              alt="YX1 Wireless Earphones Lifestyle" 
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

export default YX1EarphonesPage;