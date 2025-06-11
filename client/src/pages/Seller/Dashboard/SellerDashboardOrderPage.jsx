import { useEffect } from "react";
import {
  SellerDashboardHeader,
  Breadcrumb,
  Footer,
  SellerDashboardOrder,
} from "../../../components";

const SellerDashboardOrderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SellerDashboardHeader />
      <Breadcrumb mainTitle="Order Detail" page="Dashboard" />
      <SellerDashboardOrder />
      <Footer />
    </>
  );
};

export default SellerDashboardOrderPage;
