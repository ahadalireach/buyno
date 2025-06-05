/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";

const marqueeData = [
  "Hot Deal Products",
  "New Arrivals",
  "Best Sellers",
  "Winter Specials",
  "Trending Now",
  "Limited Edition",
  "Exclusive Offers",
  "Summer Collection",
];

const Categories = () => {
  const navigate = useNavigate();
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);

  const speed = 1.5;

  const animate = useCallback(() => {
    const marqueeWidth = marqueeRef.current?.scrollWidth || 0;
    setOffsetX((prev) => {
      const next = prev - speed;
      const resetAt = marqueeWidth / 2;
      if (Math.abs(next) >= resetAt) return 0;
      return next;
    });
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
  const handleMouseLeave = () =>
    (animationRef.current = requestAnimationFrame(animate));

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  return (
    <>
      <section
        className="w-[95%] sm:w-11/12 mx-auto mt-20 mb-16"
        id="categories"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {categoriesData.map((category) => {
            const handleClick = () => {
              const encodedCategory = encodeURIComponent(category.title);
              navigate(`/products?category=${encodedCategory}`);
            };
            return (
              <div
                key={category.id}
                onClick={handleClick}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-[3px] border-gray-900 hover:border-orange-500 transition bg-white shadow-lg flex items-center justify-center">
                  <img
                    src={category.image_Url}
                    alt={category.title}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                </div>
                <span className="mt-4 text-center text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition">
                  {category.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="w-full mt-8">
        <div
          className="relative overflow-hidden bg-gray-900 py-6 px-0"
          style={{ minHeight: 80 }}
        >
          <div
            className="category-marquee flex items-center gap-6 whitespace-nowrap will-change-transform"
            ref={marqueeRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translateX(${offsetX}px)`,
            }}
          >
            {[...marqueeData, ...marqueeData].map((title, idx) => (
              <span
                key={idx}
                className="text-white text-xl px-4"
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
