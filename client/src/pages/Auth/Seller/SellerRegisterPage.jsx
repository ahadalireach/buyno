/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Footer,
  Header,
  RegisterSeller,
} from "../../../components";

const SellerRegisterPage = () => {
  const { isSeller, seller } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/seller/${seller}`);
    }
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Seller Registration" page="Register" />
      <RegisterSeller />
      <Footer />
    </>
  );
};

export default SellerRegisterPage;
