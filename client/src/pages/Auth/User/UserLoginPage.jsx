/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header, Breadcrumb, UserLogin, Footer } from "../../../components";

const UserLoginPage = () => {
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
      <Breadcrumb mainTitle="User Login" page="Sign In" />
      <UserLogin />
      <Footer />
    </>
  );
};

export default UserLoginPage;
