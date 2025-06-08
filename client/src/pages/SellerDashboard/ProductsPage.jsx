import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  DashboardSideBar,
  SellerProducts,
  Footer,
} from "../../components";

const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Your Listed Products" page="Dashboard" />

      <div className="w-11/12 mx-auto flex py-10">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <SellerProducts />
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
