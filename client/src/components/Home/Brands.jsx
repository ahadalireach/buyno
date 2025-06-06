import { useRef } from "react";
import { afzal, dawlance, haier, imtiaz, pel, qmobile } from "../../assets";

const sponsoredBrands = [
  { src: haier, alt: "Haier Pakistan" },
  { src: dawlance, alt: "Dawlance" },
  { src: pel, alt: "PEL" },
  { src: qmobile, alt: "QMobile" },
  { src: imtiaz, alt: "Imtiaz Super Market" },
  { src: afzal, alt: "Afzal Electronics" },
];

const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M34.9982 1H11.8164V18H34.9982V1Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M11.8164 7.18164H34.9982"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
        ></path>
        <path
          d="M30.7 2L29.5 10.85L20.5 9.65"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
        ></path>
        <path
          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
        ></path>
        <path
          d="M16 28V22"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
        ></path>
        <path
          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
        <path
          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
          stroke="#FFBB38"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="square"
        ></path>
      </svg>
    ),
  },
];

const Brands = () => {
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

export default Brands;
