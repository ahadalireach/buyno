import { Breadcrumb, Footer, Header, OrderDetails } from "../../components";

const OrderDetailsPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb mainTitle={"Order Details"} page={"Order"} />
      <OrderDetails />
      <Footer />
    </>
  );
};

export default OrderDetailsPage;
