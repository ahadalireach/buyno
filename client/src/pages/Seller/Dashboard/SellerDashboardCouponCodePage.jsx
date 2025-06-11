import { useEffect } from "react";
import {
  SellerDashboardHeader,
  Breadcrumb,
  SellerDashboardSideBar,
  SellerDashboardCouponCode,
  Footer,
} from "../../../components";

const SellerDashboardCouponCodePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SellerDashboardHeader />
      <Breadcrumb mainTitle="Coupon Codes" page="Dashboard" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-6 lg:py-10">
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <SellerDashboardSideBar active={9} />
          </div>

          <div className="flex-1 min-w-0">
            <SellerDashboardCouponCode />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerDashboardCouponCodePage;
