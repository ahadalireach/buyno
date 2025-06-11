import {
  AdminDashboardHeader,
  Breadcrumb,
  AdminDashboardSideBar,
  AdminDashboardHero,
  Footer,
} from "../../../components";

const AdminDashboardPage = () => {
  return (
    <>
      <AdminDashboardHeader />
      <Breadcrumb mainTitle="Admin" page="Dashboard" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-6 lg:py-10">
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <AdminDashboardSideBar active={1} />
          </div>

          <div className="flex-1 min-w-0">
            <AdminDashboardHero />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
