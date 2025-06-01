/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Signup, Breadcrumb } from "../components";

const SignUpPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Breadcrumb mainTitle="Create An Account" page="Sign Up" />
      <Signup />
    </>
  );
};

export default SignUpPage;
