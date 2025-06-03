import {
  Breadcrumb,
  DashboardHeader,
  SellerProducts,
  DashboardSideBar,
  Footer,
} from "../../components";

const SellerProductsPage = () => {
  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Your Selling Products" page="Your Products" />

      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <SellerProducts />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProductsPage;
