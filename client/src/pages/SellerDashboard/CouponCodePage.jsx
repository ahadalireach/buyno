import {
  Breadcrumb,
  CouponCode,
  DashboardHeader,
  DashboardSideBar,
  Footer,
} from "../../components";

const CouponCodePage = () => {
  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Manage Coupon Codes" page="Coupon Codes" />

      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <CouponCode />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CouponCodePage;
