import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  DashboardSideBar,
  SellerEvents,
  Footer,
} from "../../components";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Your Listed Events" page="Dashboard" />
      <div className="w-11/12 mx-auto flex py-10">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <SellerEvents />
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
