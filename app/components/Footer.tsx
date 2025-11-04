import Link from 'next/link';
import Image from 'next/image';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Brand Info */}
          <div>
            <div className="mb-6">
              <Image
                src="/assets/shared/desktop/logo.svg"
                alt="Audiophile Logo"
                width={150}
                height={40}
              />
            </div>
            <p className="text-[hsla(0,0%,100%,1)] text-base leading-relaxed max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs. We
              are a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we are open 7 days a week.
            </p>
          </div>

          {/* Right Column - Navigation & Social Icons */}
          <div className="">
            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row md:justify-end space-x-8 md:mb-0 md:text-left mb-6">
              <Link
                href="/"
                className="text-[hsla(0,0%,100%,1)] hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300 mb-2 md:mb-0"
              >
                Home
              </Link>
              <Link
                href="/headphones"
                className="text-[hsla(0,0%,100%,1)] hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300 mb-2 md:mb-0"
              >
                Headphones
              </Link>
              <Link
                href="/speakers"
                className="text-[hsla(0,0%,100%,1)] hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300 mb-2 md:mb-0"
              >
                Speakers
              </Link>
              <Link
                href="/earphones"
                className="text-[hsla(0,0%,100%,1)] hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300"
              >
                Earphones
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end space-x-6 mt-6 md:mt-32">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300"
              >
                <Image
                  src="/assets/shared/desktop/icon-facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="hover:text-[hsla(22,65%,57%,1)] transition-colors duration-300"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:bg-[hsla(22,65%,57%,1)] transition-colors duration-300"
              >
                <Image
                  src="/assets/shared/desktop/icon-twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:bg-[hsla(22,65%,57%,1)] transition-colors duration-300"
              >
                <Image
                  src="/assets/shared/desktop/icon-instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>

        <div className=" mt-12 pt-8 flex justify-center md:justify-start text-[hsla(0,0%,100%,1)]
        ">
          <p>Copyright {currentYear}. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;