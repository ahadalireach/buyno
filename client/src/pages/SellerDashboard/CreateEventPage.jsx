import { useEffect } from "react";
import {
  DashboardHeader,
  Breadcrumb,
  DashboardSideBar,
  CreateEvent,
  Footer,
} from "../../components";

const CreateEventPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Create New Event" page="Dashboard" />

      <div className="w-11/12 mx-auto flex py-10">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <CreateEvent />
      </div>
      <Footer />
    </>
  );
};

export default CreateEventPage;
