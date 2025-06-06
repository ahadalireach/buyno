/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getAllEvents } from "./redux/actions/event";
import { getAllProducts } from "./redux/actions/product";
import { getUser, getSeller } from "./redux/actions/user";
import { ProtectedRoute, SellerProtectedRoute } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  FaqPage,
  HomePage,
  EventsPage,
  NotFoundPage,
  CheckoutPage,
  UserLoginPage,
  CouponCodePage,
  AddProductPage,
  UserProfilePage,
  ProductListPage,
  CreateEventPage,
  SellerLoginPage,
  SellerEventsPage,
  UserRegisterPage,
  DashboardHomePage,
  SellerProfilePage,
  ProductDetailsPage,
  UserActivationPage,
  SellerRegisterPage,
  SellerProductsPage,
  SellerActivationPage,
  BestSellingProductsPage,
  SellerProfilePreviewPage,
  PaymentPage,
} from "./pages";
import "./App.css";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
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
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
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
          path="/seller/profile/preview/:id"
          element={<SellerProfilePreviewPage />}
        />
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
        <Route
          path="/seller/dashboard-coupon-codes"
          element={
            <SellerProtectedRoute>
              <CouponCodePage />
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
