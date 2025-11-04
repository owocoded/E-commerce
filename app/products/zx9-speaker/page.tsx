import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';
import About from "../../components/About";
import Shop from "../../components/Shop";

const ZX9SpeakerPage = () => {
  // Product details
  const product = {
    name: "ZX9 SPEAKER",
    description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers incredible sound.",
    price: 4500,
  };

  // Features
  const features = [
    "High-end active speaker with premium sound quality",
    "Bookshelf design perfect for any room setup",
    "Advanced acoustic technology for deep bass and clear highs",
    "Multiple connectivity options including Bluetooth, optical, and aux",
    "Premium materials: machined aluminum and high-grade plastics"
  ];

  // In the box
  const inTheBox = [
    "2x ZX9 Speaker",
    "2x Speaker Grills", 
    "1x User Manual",
    "1x Optical Cable",
    "1x Audio Cable",
    "1x Power Cable"
  ];

  // Related products
  const relatedProducts = [
    { id: 1, name: "ZX7 SPEAKER", image: "/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg", link: "/products/zx7-speaker" },
    { id: 2, name: "XX99 MARK II", image: "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-ii" },
    { id: 3, name: "YX1 WIRELESS", image: "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg", link: "/products/yx1-earphones" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/speakers" className="text-gray-500 text-sm uppercase tracking-widest hover:text-[hsla(22,65%,57%,1)] transition-colors">
          Go back
        </Link>
      </div>

      {/* Product Hero */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Image 
              src="/assets/product-zx9-speaker/desktop/image-product.jpg" 
              alt="ZX9 Speaker" 
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
                  The ZX9 Speaker features a high-end active design that delivers exceptional sound quality. With its compact bookshelf form factor, it fits perfectly in any room setup while providing an immersive audio experience.
                </p>
                <p className="text-gray-500">
                  Advanced acoustic technology ensures deep bass response and crystal-clear highs. Multiple connectivity options including Bluetooth, optical, and aux inputs allow you to connect virtually any device. Premium materials like machined aluminum and high-grade plastics reflect the speaker's premium build quality and attention to detail.
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
              src="/assets/product-zx9-speaker/desktop/image-gallery-1.jpg" 
              alt="ZX9 Speaker Gallery 1" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-zx9-speaker/desktop/image-gallery-2.jpg" 
              alt="ZX9 Speaker Gallery 2" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-zx9-speaker/desktop/image-gallery-3.jpg" 
              alt="ZX9 Speaker Gallery 3" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <div className="best-gear-image w-full h-auto object-contain rounded-lg" />
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

export default ZX9SpeakerPage;