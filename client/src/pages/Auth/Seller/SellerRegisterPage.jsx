/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Footer,
  Header,
  SellerRegister,
} from "../../../components";

const SellerRegisterPage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSeller) {
      navigate(`/seller/${seller}`);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Seller Registration" page="Register" />
      <SellerRegister />
      <Footer />
    </>
  );
};

export default SellerRegisterPage;
