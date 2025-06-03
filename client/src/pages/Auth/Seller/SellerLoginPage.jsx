/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header, Breadcrumb, SellerLogin, Footer } from "../../../components";

const SellerLoginPage = () => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isSeller) {
        navigate(`/dashboard`);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Seller Login" page="Sign In" />
      <SellerLogin />
      <Footer />
    </>
  );
};

export default SellerLoginPage;
