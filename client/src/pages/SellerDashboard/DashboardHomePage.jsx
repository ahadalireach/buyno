import {
  Breadcrumb,
  DashboardHeader,
  DashboardSideBar,
  Footer,
} from "../../components";

const DashboardHomePage = () => {
  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Seller Dashboard" page="Dashboard" />

      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardHomePage;
