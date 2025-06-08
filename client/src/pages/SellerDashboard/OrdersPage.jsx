import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  DashboardSideBar,
  Footer,
  DashboardOrders,
} from "../../components";

const OrdersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Orders" page="Dashboard" />

      <div className="w-11/12 mx-auto flex py-10">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <DashboardOrders />
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
