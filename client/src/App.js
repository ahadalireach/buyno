/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { getAllEvents } from "./redux/actions/event";
import { getAllProducts } from "./redux/actions/product";
import { getUser, getSeller } from "./redux/actions/user";
import { ProtectedRoute, SellerProtectedRoute } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  FaqPage,
  HomePage,
  MainPage,
  OrderPage,
  OrdersPage,
  EventsPage,
  PaymentPage,
  ProductsPage,
  NotFoundPage,
  CheckoutPage,
  UserLoginPage,
  CouponCodePage,
  AddProductPage,
  UserProfilePage,
  ProductListPage,
  CreateEventPage,
  SellerLoginPage,
  OrderDetailsPage,
  OrderSuccessPage,
  SellerEventsPage,
  UserRegisterPage,
  SellerProfilePage,
  ProductDetailsPage,
  UserActivationPage,
  SellerRegisterPage,
  SellerActivationPage,
  BestSellingProductsPage,
  SellerProfilePreviewPage,
} from "./pages";
import "./App.css";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/payments/key`
    );
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  const PaymentPageWithStripe = () => (
    <Elements stripe={loadStripe(stripeApikey)}>
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    </Elements>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/order/payment"
          element={stripeApikey ? <PaymentPageWithStripe /> : null}
        />
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
          path="/cart/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
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
              <MainPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <OrdersPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/order/:id"
          element={
            <SellerProtectedRoute>
              <OrderPage />
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
              <ProductsPage />
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
