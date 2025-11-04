import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import About from "./components/About";
import Shop from "./components/Shop";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black py-12 md:py-20 relative overflow-hidden">
        {/* Mobile and Tablet Background Image */}
        <div
          className="lg:hidden absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/home/mobile/image-header.jpg')",
          }}
        ></div>

        {/* Tablet Background Image */}
        <div
          className="hidden md:block lg:hidden absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/home/tablet/image-header.jpg')",
          }}
        ></div>

        {/* Desktop Background Image */}
        <div
          className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/home/desktop/image-hero.jpg')",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="min-h-[500px] flex items-center py-20">
            <div className="w-full">
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-8 lg:gap-12">
                <div className="w-full lg:w-auto">
                  <p className="text-gray-500 uppercase text-xs md:text-sm tracking-widest mb-3 md:mb-4">
                    New Product
                  </p>
                  <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0 md:mb-6 max-w-md md:max-w-lg text-center lg:text-left">
                    XX99 MARK II Heaphones
                  </h1>
                  <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg max-w-xs md:max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                    Experience natural, lifelike audio and exceptional build
                    quality made for the passionate music enthusiast.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link
                      href="/products/xx99-mark-ii"
                      className="bg-[hsla(22,65%,57%,1)] text-white px-6 py-3 md:px-8 md:py-3 uppercase text-xs md:text-sm tracking-wider hover:bg-[hsla(22,93%,75%,1)] transition-colors"
                    >
                      See Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Shop />

      {/* Product Highlight - ZX9 Speaker */}
      <section 
        className="py-12 md:py-20 container product mx-auto px-4 relative overflow-hidden"
        style={{ 
          backgroundImage: "url('/assets/home/desktop/pattern-circles.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 50% top 10%",
          backgroundSize: "80%"
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 w-full md:order-1 overflow-hidden">
            <Image
              src="/assets/home/desktop/image-removebg-preview.png"
              alt="ZX9 Speaker"
              width={500}
              height={500}
              className="w-full h-auto translate-y-36
              "
            />
          </div>
          <div className="md:w-1/2 w-full md:pl-8 md:order-2">
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-4 uppercase">
              ZX9 SPEAKER
            </h2>
            <p className="text-white mb-6 text-base">
              Upgrade your sound system with the all new ZX9 active speaker. It
              is a bookshelf speaker system that offers incredible sound.
            </p>
            <Link
              href="/products/zx9-speaker"
              className="bg-black text-white px-6 py-3 uppercase text-xs md:text-sm tracking-wider hover:bg-[hsla(0,0%,30%,1)] transition-colors"
            >
              See Product
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 container mt-3 bg-gray-300 mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 w-full md:order-1">
            <Image
              src="/assets/home/desktop/image-speaker-zx7.png"
              alt="ZX7 Speaker"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full md:pl-8 md:order-2">
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-4 uppercase">
              ZX7 SPEAKER
            </h2>

            <Link
              href="/products/zx7-speaker"
              className="bg-black text-white px-6 py-3 uppercase text-xs md:text-sm tracking-wider hover:bg-[hsla(0,0%,30%,1)] transition-colors"
            >
              See Product
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 container bg-white mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 w-full md:order-1">
            <Image
              src="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full md:pl-8 md:order-2">
            <h2 className="text-3xl md:text-3xl font-bold text-black mb-4 uppercase">
              yx1 earphones
            </h2>
            <Link
              href="/products/yx1-earphones"
              className="bg-transparent border text-black px-6 py-3 uppercase text-xs md:text-sm tracking-wider hover:bg-[hsla(0,0%,30%,1)] transition-colors"
            >
              See Product
            </Link>
          </div>
        </div>
      </section>

      <About />
      <Footer />
    </div>
  );
};

export default HomePage;
