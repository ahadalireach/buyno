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
  EventsPage,
  NotFoundPage,
  UserLoginPage,
  UserProfilePage,
  ProductListPage,
  CreateEventPage,
  SellerProfilePage,
  SellerLoginPage,
  UserRegisterPage,
  AddProductPage,
  ProductDetailsPage,
  UserActivationPage,
  SellerRegisterPage,
  DashboardHomePage,
  SellerActivationPage,
  SellerEventsPage,
  SellerProductsPage,
  BestSellingProductsPage,
} from "./pages";
import "./App.css";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components";

const App = () => {
  const { isLoading } = useSelector((state) => state.seller);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
  }, []);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingProductsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route
          path="/user/activation/:activation_token"
          element={<UserActivationPage />}
        />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/seller/register" element={<SellerRegisterPage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/seller/login" element={<SellerLoginPage />} />
        <Route
          path="/seller/:id"
          element={
            <SellerProtectedRoute>
              <SellerProfilePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard"
          element={
            <SellerProtectedRoute>
              <DashboardHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <AddProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-products"
          element={
            <SellerProtectedRoute>
              <SellerProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <CreateEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-events"
          element={
            <SellerProtectedRoute>
              <SellerEventsPage />
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
