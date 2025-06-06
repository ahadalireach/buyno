import { useEffect } from "react";
import { Header, Breadcrumb, Payment, Footer } from "../../components";

const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Choose Payment Method"} page={"Payment"} />
      <Payment />
      <Footer />
    </>
  );
};

export default PaymentPage;
