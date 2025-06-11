import { useEffect } from "react";
import { Header, Breadcrumb, UserPayment, Footer } from "../../../components";

const UserPaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Payment"} page={"Order"} />
      <UserPayment />
      <Footer />
    </>
  );
};

export default UserPaymentPage;
