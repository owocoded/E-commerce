import Image from "next/image";
import Link from "next/link";

const Shop = () => {
  return (
    <section className="py-16 bg-white mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Headphones Card */}
          <div className="relative group">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
                alt="Headphones"
                width={400}
                height={200}
                className="w-full h-48 object-contain -translate-y-24"
              />
              <h3 className="text-2xl font-bold text-center text-black uppercase">
                Headphones
              </h3>
              <div className="mt-6 text-center">
                <Link
                  href="/headphones"
                  className="text-gray-500 uppercase text-sm tracking-widest hover:text-[hsla(22,65%,57%,1)]"
                >
                  Shop{" "}
                  <span className="ml-2 text-[hsla(22,65%,57%,1)]">&gt;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Speakers Card */}
          <div className="relative group">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
                alt="Speakers"
                width={400}
                height={200}
                className="w-full h-48 object-contain -translate-y-20 mb-0"
              />
              <h3 className="text-2xl font-bold text-center text-black uppercase">
                Speakers
              </h3>
              <div className="mt-6 text-center">
                <Link
                  href="/speakers"
                  className="text-gray-500 uppercase text-sm tracking-widest hover:text-[hsla(22,65%,57%,1)]"
                >
                  Shop{" "}
                  <span className="ml-2 text-[hsla(22,65%,57%,1)]">&gt;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Earphones Card */}
          <div className="relative group">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
                alt="Earphones"
                width={400}
                height={200}
                className="w-full h-48 object-contain -translate-y-20"
              />
              <h3 className="text-2xl font-bold text-center text-black uppercase">
                Earphones
              </h3>
              <div className="mt-6 text-center">
                <Link
                  href="/earphones"
                  className="text-gray-500 uppercase text-sm tracking-widest hover:text-[hsla(22,65%,57%,1)]"
                >
                  Shop{" "}
                  <span className="ml-2 text-[hsla(22,65%,57%,1)]">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
