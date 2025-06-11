/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUser } from "./redux/actions/user";
import { getSeller } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import {
  UserProtectedRoute,
  AdminProtectedRoute,
  SellerProtectedRoute,
} from "./routes";
import {
  HomePage,
  FaqPage,
  NotFoundPage,
  ProductListPage,
  ProductDetailsPage,
  BestSellingProductsPage,
  EventsPage,

  // User
  UserLoginPage,
  UserRegisterPage,
  UserProfilePage,
  UserDashboardInboxPage,
  UserDashboardOrderDetailsPage,
  UserDashboardTrackOrderPage,
  UserCheckoutPage,
  UserOrderSuccessPage,
  UserActivationPage,
  UserPaymentPage,

  // Seller
  SellerLoginPage,
  SellerRegisterPage,
  SellerActivationPage,
  SellerProfilePreviewPage,
  SellerProfilePage,
  SellerDashboardPage,
  SellerDashboardOrdersPage,
  SellerDashboardOrderPage,
  SellerDashboardAddProductPage,
  SellerDashboardProductsPage,
  SellerDashboardCreateEventPage,
  SellerDashboardEventsPage,
  SellerDashboardCouponCodePage,
  SellerDashboardRefundOrdersPage,
  SellerDashboardWithdrawPage,
  SellerDashboardMessagesPage,
  SellerDashboardSettingsPage,

  // Admin
  AdminDashboardPage,
  AdminDashboardUsersPage,
  AdminDashboardSellersPage,
  AdminDashboardOrdersPage,
  AdminDashboardProductsPage,
  AdminDashboardEventsPage,
  AdminDashboardWithdrawPage,
} from "./pages";
import "./App.css";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");
  const setBackendError = () => {};

  async function getStripeApikey() {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/payments/key`
      );
      setStripeApiKey(data.stripeApikey);
    } catch (error) {}
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          store.dispatch(getUser()),
          store.dispatch(getSeller()),
          store.dispatch(getAllProducts()),
          store.dispatch(getAllEvents()),
          getStripeApikey(),
        ]);
      } catch (error) {
        setBackendError(true);
        toast.error("Backend is not running or unreachable.");
      }
    };
    fetchInitialData();
  }, []);

  const PaymentPageWithStripe = () => (
    <Elements stripe={loadStripe(stripeApikey)}>
      <UserProtectedRoute>
        <UserPaymentPage />
      </UserProtectedRoute>
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
            <UserProtectedRoute>
              <UserProfilePage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <UserProtectedRoute>
              <UserDashboardOrderDetailsPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <UserProtectedRoute>
              <UserDashboardTrackOrderPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/inbox"
          element={
            <UserProtectedRoute>
              <UserDashboardInboxPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <UserProtectedRoute>
              <UserCheckoutPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <UserProtectedRoute>
              <UserOrderSuccessPage />
            </UserProtectedRoute>
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
              <SellerDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <SellerDashboardOrdersPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/order/:id"
          element={
            <SellerProtectedRoute>
              <SellerDashboardOrderPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <SellerDashboardAddProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-products"
          element={
            <SellerProtectedRoute>
              <SellerDashboardProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <SellerDashboardCreateEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-events"
          element={
            <SellerProtectedRoute>
              <SellerDashboardEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-coupon-codes"
          element={
            <SellerProtectedRoute>
              <SellerDashboardCouponCodePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-refund-orders"
          element={
            <SellerProtectedRoute>
              <SellerDashboardRefundOrdersPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <SellerDashboardWithdrawPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <SellerDashboardMessagesPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard-settings"
          element={
            <SellerProtectedRoute>
              <SellerDashboardSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-users"
          element={
            <AdminProtectedRoute>
              <AdminDashboardUsersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-sellers"
          element={
            <AdminProtectedRoute>
              <AdminDashboardSellersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-orders"
          element={
            <AdminProtectedRoute>
              <AdminDashboardOrdersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-products"
          element={
            <AdminProtectedRoute>
              <AdminDashboardProductsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-events"
          element={
            <AdminProtectedRoute>
              <AdminDashboardEventsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-withdraw-requests"
          element={
            <AdminProtectedRoute>
              <AdminDashboardWithdrawPage />
            </AdminProtectedRoute>
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
