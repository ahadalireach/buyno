import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Header,
  Footer,
  Breadcrumb,
  ProductCard,
  Loader,
} from "../../components";
import { useSelector } from "react-redux";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

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
        <Loader />
      ) : (
        <div>
          <Header />
          <Breadcrumb mainTitle="All Products" page="Products" />
          <div className={`w-11/12 mx-auto mt-10`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductListPage;
