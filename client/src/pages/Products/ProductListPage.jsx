import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Header,
  Footer,
  Breadcrumb,
  ProductCard,
  Loader,
} from "../../components";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!categoryData) {
      setData(allProducts);
    } else {
      const filtered = allProducts?.filter(
        (i) => i.category.trim() === categoryData.trim()
      );
      setData(filtered);
    }
    window.scrollTo(0, 0);
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <Header />
          <Breadcrumb mainTitle="All Products" page="Products" />
          <div className={`w-11/12 mx-auto mt-10`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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
                      d="M3 3h18v13H3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 21h8m-4-4v4"
                    />
                  </svg>
                  <p className="text-lg font-medium">
                    No products found{categoryData ? " in this category!" : "!"}
                  </p>
                  <p className="text-sm mt-1 text-gray-400">
                    Please check back later or try a different category.
                  </p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductListPage;
