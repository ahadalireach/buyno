import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  {
    bg: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
    heading: (
      <>
        Your One-Stop Shop <br /> For Everything Online
      </>
    ),
    desc: (
      <>
        Discover unbeatable deals on electronics, fashion, and more.
        <br />
        Enjoy secure payments, fast delivery, and 24/7 support at Multivendor.
      </>
    ),
    btn: "Start Shopping",
    btnLink: "/products",
  },
  {
    bg: "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
    heading: (
      <>
        Latest Fashion Trends <br /> For Every Style
      </>
    ),
    desc: (
      <>
        Explore new arrivals in clothing, shoes, and accessories.
        <br />
        Shop top brands and enjoy easy returns on every order.
      </>
    ),
    btn: "Shop Fashion",
    btnLink: "/products?category=fashion",
  },
  {
    bg: "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg",
    heading: (
      <>
        Home & Living Essentials <br /> Make Life Comfortable
      </>
    ),
    desc: (
      <>
        Find quality furniture, kitchenware, and home décor.
        <br />
        Upgrade your space with exclusive offers and fast shipping.
      </>
    ),
    btn: "Shop Home",
    btnLink: "/products?category=home",
  },
];

const slideVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
};

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover flex items-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.7)), url(${heroSlides[active].bg})`,
      }}
    >
      <div className="w-11/12 mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1 className="text-[28px] sm:text-[35px] 800px:text-[60px] leading-[1.2] text-[#3d3a3a] font-bold capitalize drop-shadow">
              {heroSlides[active].heading}
            </h1>
            <p className="pt-5 text-[16px] sm:text-[17px] font-[400] text-[#000000ba]">
              {heroSlides[active].desc}
            </p>
            <Link to={heroSlides[active].btnLink} className="inline-block mt-7">
              <span className="px-8 py-3 rounded-full text-white text-[18px] font-semibold bg-orange-500 hover:bg-orange-600 shadow-lg transition">
                {heroSlides[active].btn}
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`w-4 h-4 rounded-full border-2 border-orange-500 transition-all duration-300 ${
              active === idx ? "bg-orange-500 scale-110 shadow-lg" : "bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
