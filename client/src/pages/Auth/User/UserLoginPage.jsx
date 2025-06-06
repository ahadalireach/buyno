/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header, Breadcrumb, UserLogin, Footer } from "../../../components";

const UserLoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    window.scrollTo(0, 0);
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
