/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, LoginShop } from "../components";

const ShopLoginPage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller?._id}`);
    }
  }, []);

  return (
    <>
      <Breadcrumb mainTitle="Login to Your Shop" page="Shop Login" />
      <LoginShop />
    </>
  );
};

export default ShopLoginPage;
