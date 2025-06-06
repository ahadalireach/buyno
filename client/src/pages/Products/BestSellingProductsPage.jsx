import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Loader,
  Header,
  Footer,
  Breadcrumb,
  ProductCard,
} from "../../components";

const BestSellingProductsPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.soldOut - a.soldOut);
    setData(sortedData);

    window.scrollTo(0, 0);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <Breadcrumb mainTitle="Best Selling Products" page="Best Selling" />
          <div className={`w-11/12 mx-auto mt-10`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingProductsPage;
