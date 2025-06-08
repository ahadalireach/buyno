import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData.sort((a, b) => b.soldOut - a.soldOut);
    const firstFive = sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <section className="w-full py-12">
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            <span className="text-gray-800">Best Deals</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Top selling products just for you
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {data && data.length > 0 ? (
            data.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.1 0-2 .9-2 2m0 0c0 1.1.9 2 2 2m0 0c1.1 0 2-.9 2-2m-2 2v4m8-4a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
              <p className="text-lg font-medium">No deals available</p>
              <p className="text-sm mt-1 text-gray-400">
                Check back soon for discounts and offers.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
