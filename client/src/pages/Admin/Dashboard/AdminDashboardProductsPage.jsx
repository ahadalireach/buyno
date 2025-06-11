import {
  AdminDashboardHeader,
  Breadcrumb,
  AdminDashboardSideBar,
  Footer,
  AdminDashboardProducts,
} from "../../../components";

const AdminDashboardProductsPage = () => {
  return (
    <div>
      <AdminDashboardHeader />
      <Breadcrumb mainTitle="Products" page="Dashboard" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-6 lg:py-10">
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <AdminDashboardSideBar active={5} />
          </div>

          <div className="flex-1 min-w-0">
            <AdminDashboardProducts />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardProductsPage;
