import {
  AdminDashboardHeader,
  Breadcrumb,
  AdminDashboardSideBar,
  Footer,
  AdminDashboardEvents,
} from "../../../components";
const AdminDashboardEventsPage = () => {
  return (
    <div>
      <AdminDashboardHeader />
      <Breadcrumb mainTitle="Events" page="Dashboard" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-6 lg:py-10">
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <AdminDashboardSideBar active={6} />
          </div>

          <div className="flex-1 min-w-0">
            <AdminDashboardEvents />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardEventsPage;
