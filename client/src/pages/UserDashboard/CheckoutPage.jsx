import { useEffect } from "react";
import { Header, Breadcrumb, Checkout, Footer } from "../../components";

const CheckoutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Place Your Order"} page={"Checkout"} />
      <Checkout />
      <Footer />
    </>
  );
};

export default CheckoutPage;
