import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import About from "../components/About";
import Shop from "../components/Shop";

const SpeakersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white uppercase">SPEAKERS</h1>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* ZX9 Speaker - New Product */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 ">
              <Image
                src="/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg"
                alt="ZX9 Speaker"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8 ">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-[hsla(22,65%,57%,1)] uppercase text-sm tracking-widest mb-2">
                  New Product
                </p>
                <h2 className="text-xl font-bold text-black mb-4 uppercase">
                  ZX9 Speaker
                </h2>
                <p className="text-gray-500 mb-6">
                  Upgrade your sound system with the all new ZX9 active speaker.
                  It is a bookshelf speaker system that offers incredible sound.
                </p>
                <Link
                  href="/products/zx9-speaker"
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:order-2">
              <Image
                src="/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg"
                alt="ZX7 Speaker"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-3xl font-bold text-black mb-4">
                  ZX7 Speaker
                </h2>
                <p className="text-gray-500 mb-6">
                  Stream high quality sound wirelessly with minimal loss. The
                  ZX7 bookshelf speaker uses high-end audiophile components that
                  represent a new standard in acoustic engineering.
                </p>
                <Link
                  href="/products/zx7-speaker"
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Shop />

      <About />

      <Footer />
    </div>
  );
};

export default SpeakersPage;