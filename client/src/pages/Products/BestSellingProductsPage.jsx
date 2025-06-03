import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import { Footer, Header, Breadcrumb, ProductCard } from "../../components";

const BestSellingProductsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allProductsData = productData ? [...productData] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, []);

  return (
    <>
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
    </>
  );
};

export default BestSellingProductsPage;
