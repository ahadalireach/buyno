import {
  Breadcrumb,
  Footer,
  Header,
  UserDashboardOrderDetails,
} from "../../../components";

const UserDashboardOrderDetailsPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Order Details"} page={"Order"} />
      <UserDashboardOrderDetails />
      <Footer />
    </>
  );
};

export default UserDashboardOrderDetailsPage;
