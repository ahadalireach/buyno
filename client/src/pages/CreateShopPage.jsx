/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Footer, Header, CreateShop } from "../components";

const CreateShopPage = () => {
  const { isSeller, seller } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller}`);
    }
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        mainTitle="Register Your Business (Shop)"
        page="Create Shop"
      />
      <CreateShop />
      <Footer />
    </>
  );
};

export default CreateShopPage;
