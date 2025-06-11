import { useEffect } from "react";
import {
  Header,
  Breadcrumb,
  UserDashboardTrackOrder,
  Footer,
} from "../../../components";

const UserDashboardTrackOrderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Track Order"} page={"Dashboard"} />
      <UserDashboardTrackOrder />
      <Footer />
    </>
  );
};

export default UserDashboardTrackOrderPage;
