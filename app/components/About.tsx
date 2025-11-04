import Image from "next/image";

const About = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2 w-full md:pr-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            BRINGING YOU THE{" "}
            <span className="text-[hsla(22,65%,57%,1)]">BEST</span> AUDIO GEAR
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration
            rooms available for you to browse and experience a wide range of
            our products. Stop by our store to meet some of the fantastic
            people who make Audiophile the best place to buy your portable
            audio equipment.
          </p>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="best-gear-image w-full h-auto object-contain rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default About;