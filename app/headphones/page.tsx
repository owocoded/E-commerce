import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import Shop from "../components/Shop";
import About from "../components/About";

const HeadphonesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white uppercase">
            HEADPHONES
          </h1>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* XX99 Mark II - New Product */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg"
                alt="XX99 Mark II Headphones"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <div className="bg-white p-6 md:p-8 shadow-sm">
                <p className="text-[hsla(22,65%,57%,1)] uppercase text-xs md:text-sm tracking-widest mb-2">
                  New Product
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 uppercase">
                  XX99 Mark II Headphones
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  The new XX99 Mark II headphones is the pinnacle of pristine
                  audio. It redefines your premium listening experience by
                  reproducing the balanced depth and precision of studio-quality
                  sound.
                </p>
                <Link
                  href="/products/xx99-mark-ii"
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>

          {/* XX99 Mark I */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:order-2">
              <Image
                src="/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
                alt="XX99 Mark I Headphones"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8 md:order-1">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 uppercase">
                  XX99 Mark I Headphones
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  As the gold standard for headphones, the classic XX99 Mark I
                  offers detailed and accurate audio reproduction for
                  audiophiles, mixing engineers, and music enthusiasts alike.
                </p>
                <Link
                  href="/products/xx99-mark-i"
                  className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                >
                  See Product
                </Link>
              </div>
              
            </div>
          </div>

          {/* XX59 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg"
                alt="XX59 Headphones"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 uppercase">
                  XX59 Headphones
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  Enjoy your audio almost anywhere and customize it to your
                  specific tastes with the XX59 headphones. The stylish,
                  lightweight, and compact design makes the XX59 perfect for
                  every situation.
                </p>
                <Link
                  href="/products/xx59"
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

export default HeadphonesPage;
