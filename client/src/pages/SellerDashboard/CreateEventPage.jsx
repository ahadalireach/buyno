import {
  Breadcrumb,
  CreateEvent,
  DashboardHeader,
  DashboardSideBar,
  Footer,
} from "../../components";

const CreateEventPage = () => {
  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Create New Event" page="Add Event" />

      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEventPage;
