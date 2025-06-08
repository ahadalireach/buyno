import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../static/data";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
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
      className="relative min-h-[80vh] w-full bg-no-repeat bg-cover flex items-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.85)), url(${heroSlides[active].bg})`,
      }}
    >
      <div className="w-11/12 mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center 800px:text-left"
          >
            <h1 className="text-[32px] sm:text-[42px] 800px:text-[64px] font-bold leading-tight text-gray-primary">
              {heroSlides[active].heading}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 max-w-2xl">
              {heroSlides[active].desc}
            </p>
            <Link to={heroSlides[active].btnLink} className="inline-block mt-8">
              <span className="px-8 py-3 rounded-sm text-white text-[18px] font-semibold bg-orange-500 hover:bg-[#212121] shadow-lg transition">
                {heroSlides[active].btn}
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`w-3.5 h-3.5 rounded-full border-2 border-orange-500 transition-all duration-300 ${
              active === idx ? "bg-orange-500 scale-110 shadow-md" : "bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
