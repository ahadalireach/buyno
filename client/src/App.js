import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import {
  ActivationPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductsPage,
  SignupPage,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import "./App.css";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
