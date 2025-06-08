import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  DashboardSideBar,
  CouponCode,
  Footer,
} from "../../components";

const CouponCodePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Manage Coupon Codes" page="Dashboard" />

      <div className="w-11/12 mx-auto flex py-10">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <CouponCode />
      </div>
      <Footer />
    </>
  );
};

export default CouponCodePage;
