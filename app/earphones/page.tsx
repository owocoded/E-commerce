import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import About from "../components/About";
import Shop from "../components/Shop";

const EarphonesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white uppercase">EARPHONES</h1>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:gap-16 gap-16">
          {/* YX1 Earphones - New Product */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 ">
              <Image
                src="/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg"
                alt="YX1 Earphones"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-1/2 md:pr-8">
              <div className="bg-white p-8 md:p-8 rounded-lg shadow-sm">
                <p className="text-[hsla(22,65%,57%,1)] uppercase text-sm tracking-widest mb-2">
                  New Product
                </p>
                <h2 className="text-3xl font-bold text-black mb-4">
                  YX1 Wireless Earphones
                </h2>
                <p className="text-gray-500 mb-6">
                  Tailor your listening experience with bespoke dynamic drivers
                  from the new YX1 Wireless Earphones. Experience premium sound
                  with our advanced acoustic technology.
                </p>
                <Link
                  href="/products/yx1-earphones"
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>

          {/* Placeholder for additional earphone model if needed */}
          {/* Additional earphone models can be added here following the same pattern */}
        </div>
      </section>

      <Shop />
      <About />
      <Footer />
    </div>
  );
};

export default EarphonesPage;