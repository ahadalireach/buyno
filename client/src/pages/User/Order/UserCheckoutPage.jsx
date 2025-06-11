import { useEffect } from "react";
import { Header, Breadcrumb, UserCheckout, Footer } from "../../../components";

const UserCheckoutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Checkout"} page={"Order"} />
      <UserCheckout />
      <Footer />
    </>
  );
};

export default UserCheckoutPage;
