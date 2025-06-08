import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <section className="w-full py-12 bg-white">
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            <span className="text-gray-800">Featured Products</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Handpicked for you
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((i, index) => <ProductCard data={i} key={index} />)
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
                  d="M20 13V5H4v8M4 13v6h16v-6"
                />
              </svg>
              <p className="text-lg font-medium">
                No featured products available
              </p>
              <p className="text-sm mt-1 text-gray-400">
                Our top picks will appear here once added.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
