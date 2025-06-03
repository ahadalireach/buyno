import { useRef } from "react";
import { brandingData } from "../../static/data";
import { afzal, dawlance, haier, imtiaz, pel, qmobile } from "../../assets";

const sponsoredBrands = [
  { src: haier, alt: "Haier Pakistan" },
  { src: dawlance, alt: "Dawlance" },
  { src: pel, alt: "PEL" },
  { src: qmobile, alt: "QMobile" },
  { src: imtiaz, alt: "Imtiaz Super Market" },
  { src: afzal, alt: "Afzal Electronics" },
];

const Sponsored = () => {
  const scrollRef = useRef(null);

  return (
    <section className="w-full py-10 sm:py-12 md:py-16 bg-white">
      <div className="w-[95%] sm:w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            <span className="text-orange-500">🌟 Sponsored Brands</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Trusted brands, handpicked for you
          </p>
        </div>

        <div className="mb-12">
          <div
            ref={scrollRef}
            className="sm:hidden flex overflow-x-auto gap-4 px-2 py-4 rounded-2xl bg-orange-50 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
            aria-label="Sponsored Brands Carousel"
          >
            {sponsoredBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-20 h-20 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="w-14 h-14 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 bg-orange-50 rounded-2xl py-6 px-4">
            {sponsoredBrands.map((brand, idx) => (
              <div
                key={idx}
                className="bg-white w-full aspect-square rounded-full shadow flex flex-col items-center justify-center transition-transform hover:scale-105"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="w-16 h-16 object-contain mb-2"
                />
                <span className="text-xs font-semibold text-gray-700 text-center px-2">
                  {brand.alt}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {brandingData?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-col lg:flex-row items-center bg-orange-50 hover:bg-orange-100 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm transition"
            >
              <div className="flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center text-2xl sm:text-4xl text-black mb-3 sm:mb-4 lg:mb-0 lg:mr-6">
                {item.icon}
              </div>
              <div className="text-center sm:text-center lg:text-left">
                <h3 className="font-extrabold text-base sm:text-xl md:text-2xl text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {item.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsored;
