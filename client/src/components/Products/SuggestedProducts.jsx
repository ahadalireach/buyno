import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "./ProductCard";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const d =
      productData && productData.filter((i) => i.category === data.category);
    setProducts(d);
  }, [data.category]);

  return (
    <div>
      {data ? (
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-orange-100 w-11/12 mx-auto mt-8 mb-10">
          <h2 className="text-[25px] font-[600] text-orange-500 border-b-2 border-orange-100 pb-2 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products && products.length > 0 ? (
              products.map((i, index) => <ProductCard data={i} key={index} />)
            ) : (
              <div className="col-span-full text-gray-400 text-center py-8">
                No related products found.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
