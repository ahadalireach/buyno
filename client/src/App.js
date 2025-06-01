/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getUser, getSeller } from "./redux/actions/user";
import { ProtectedRoute, SellerProtectedRoute } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  FaqPage,
  HomePage,
  ShopPage,
  LoginPage,
  EventsPage,
  SignUpPage,
  ProfilePage,
  NotFoundPage,
  ProductsPage,
  ShopLoginPage,
  ActivationPage,
  CreateShopPage,
  BestSellingPage,
  ProductDetailsPage,
  SellerActivationPage,
} from "./pages";
import "./App.css";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // Fetch user and seller info on mount
  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
  }, []);

  if (loading || isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public/Common Routes ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* ---------- User (Buyer) Routes ---------- */}
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* ---------- Seller Shop Routes ---------- */}
        <Route path="/shop/create" element={<CreateShopPage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/shop/login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute isSeller={isSeller}>
              <ShopPage />
            </SellerProtectedRoute>
          }
        />
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
  );
};

export default App;
