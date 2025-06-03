/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, Breadcrumb, Header, Footer } from "../../../components";

const UserRegisterPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <Breadcrumb mainTitle="User Registration" page="Register" />
      <RegisterUser />
      <Footer />
    </>
  );
};

export default UserRegisterPage;
