import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  Footer,
  DashboardOrder,
} from "../../components";

const OrderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Order Detail" page="Dashboard" />
      <DashboardOrder />
      <Footer />
    </>
  );
};

export default OrderPage;
