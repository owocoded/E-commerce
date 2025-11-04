import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';
import About from "../../components/About";
import Shop from "../../components/Shop";

const ZX7SpeakerPage = () => {
  // Product details
  const product = {
    name: "ZX7 SPEAKER",
    description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represent a new standard in acoustic engineering.",
    price: 3500,
  };

  // Features
  const features = [
    "High-end bookshelf speaker for audiophiles",
    "Wireless streaming with minimal audio loss",
    "Premium audiophile-grade components throughout",
    "Precision-tuned acoustic design for accurate sound reproduction",
    "Sleek cabinet design with acoustic dampening technology"
  ];

  // In the box
  const inTheBox = [
    "2x ZX7 Speaker",
    "2x Speaker Grills", 
    "1x User Manual",
    "1x Optical Cable",
    "1x Audio Cable",
    "1x Power Cable"
  ];

  // Related products
  const relatedProducts = [
    { id: 1, name: "ZX9 SPEAKER", image: "/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg", link: "/products/zx9-speaker" },
    { id: 2, name: "XX99 MARK II", image: "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-ii" },
    { id: 3, name: "XX99 MARK I", image: "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg", link: "/products/xx99-mark-i" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/speakers" className="text-gray-500 text-sm tracking-widest hover:text-orange-500 transition-colors">
          Go back
        </Link>
      </div>

      {/* Product Hero */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Image 
              src="/assets/product-zx7-speaker/desktop/image-product.jpg" 
              alt="ZX7 Speaker" 
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <div>
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
                  The ZX7 Speaker is designed for audiophiles who demand the highest quality audio reproduction. This bookshelf speaker combines wireless streaming convenience with audiophile-grade components for exceptional sound quality.
                </p>
                <p className="text-gray-500">
                  Precision-tuned acoustic design ensures accurate sound reproduction across the entire frequency spectrum. The sleek cabinet design incorporates advanced acoustic dampening technology to minimize resonance and coloration. Wireless streaming capabilities allow you to enjoy high-quality sound with minimal loss, while maintaining the connection integrity needed for critical listening.
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
              src="/assets/product-zx7-speaker/desktop/image-gallery-1.jpg" 
              alt="ZX7 Speaker Gallery 1" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-zx7-speaker/desktop/image-gallery-2.jpg" 
              alt="ZX7 Speaker Gallery 2" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/product-zx7-speaker/desktop/image-gallery-3.jpg" 
              alt="ZX7 Speaker Gallery 3" 
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <Image 
              src="/assets/shared/desktop/image-best-gear.jpg" 
              alt="ZX7 Speaker Lifestyle" 
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

export default ZX7SpeakerPage;