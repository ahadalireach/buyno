import { productData } from "../../static/data";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            <span className="text-orange-500">⭐ Featured Products</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Handpicked for you
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {productData && productData.length !== 0 ? (
            productData.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              No featured products.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
