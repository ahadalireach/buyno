/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, Breadcrumb, Header, Footer } from "../../../components";

const UserRegisterPage = () => {
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
      <Breadcrumb mainTitle="User Registration" page="Register" />
      <RegisterUser />
      <Footer />
    </>
  );
};

export default UserRegisterPage;
