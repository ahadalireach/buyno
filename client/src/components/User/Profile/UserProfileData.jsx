import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { MdTrackChanges } from "react-icons/md";
import { Country, State } from "country-state-city";
import { getUser } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../redux/actions/order";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInfo,
} from "../../../redux/actions/user";
import axios from "axios";
import Loader from "../../General/Loader";

const UserProfileData = ({ active }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(name, email, phoneNumber, password));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(getUser());
      toast.success("Avatar updated successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update avatar.");
    }
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full mb-8">
            <div className="relative">
              <img
                src={
                  avatar ||
                  `${process.env.REACT_APP_BACKEND_NON_API_URL}/${user?.avatar}`
                }
                className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full object-cover border-4 border-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.05)]"
                alt="User Profile"
              />
              <div className="w-8 h-8 md:w-[34px] md:h-[34px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] border-2 border-gray-400">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera className="text-gray-500 text-sm md:text-base" />
                </label>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white py-6 md:py-8 px-4 md:px-6 lg:px-10 shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
              <form
                onSubmit={handleSubmit}
                aria-required={true}
                className="space-y-4 md:space-y-6"
              >
                <div className="w-full flex flex-col lg:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Enter your password
                    </label>
                    <input
                      type="password"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className="w-full py-2 md:py-3 bg-orange-500 hover:bg-gray-800 text-white cursor-pointer rounded-sm font-semibold tracking-wide transition mt-4"
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user._id]);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!orders || orders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Order ID
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      {order._id}
                    </p>
                  </div>
                  <Link to={`/user/order/${order._id}`}>
                    <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition">
                      <AiOutlineArrowRight size={16} />
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status</p>
                    <p
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Items Qty
                    </p>
                    <p className="text-sm text-gray-600">{order.cart.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Total</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    US$ {order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Items Qty
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!orders || orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={order._id}
                  >
                    {order._id}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {order.cart.length}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    US$ {order.totalPrice}
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <Link to={`/user/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200">
                        <AiOutlineArrowRight size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AllRefundOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user._id]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!eligibleOrders || eligibleOrders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No refund orders found.</p>
          </div>
        ) : (
          eligibleOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Order ID
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      {order._id}
                    </p>
                  </div>
                  <Link to={`/user/order/${order._id}`}>
                    <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition">
                      <AiOutlineArrowRight size={16} />
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status</p>
                    <p
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Items Qty
                    </p>
                    <p className="text-sm text-gray-600">{order.cart.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Total</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    US$ {order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Items Qty
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!eligibleOrders || eligibleOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No refund orders found.
                </td>
              </tr>
            ) : (
              eligibleOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={order._id}
                  >
                    {order._id}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {order.cart.length}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    US$ {order.totalPrice}
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <Link to={`/user/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200">
                        <AiOutlineArrowRight size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user._id]);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!orders || orders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Order ID
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      {order._id}
                    </p>
                  </div>
                  <Link to={`/user/track/order/${order._id}`}>
                    <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition">
                      <MdTrackChanges size={16} />
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status</p>
                    <p
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Items Qty
                    </p>
                    <p className="text-sm text-gray-600">{order.cart.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Total</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    US$ {order.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Items Qty
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Track
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!orders || orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={order._id}
                  >
                    {order._id}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {order.cart.length}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    US$ {order.totalPrice}
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <Link to={`/user/track/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200">
                        <MdTrackChanges size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow-[0_0_20px_rgba(0,0,0,0.05)] sm:rounded-sm sm:px-10 mt-8">
        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Change Password
        </h1>
        <form onSubmit={passwordChangeHandler} className="space-y-6">
          <div>
            <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
              Enter your old password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
              Enter your new password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
              Confirm your new password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-sm font-semibold tracking-wide transition mt-4"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow-[0_0_20px_rgba(0,0,0,0.05)] sm:rounded-sm sm:px-10 relative overflow-y-scroll max-h-[90vh]">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer text-gray-500 hover:text-orange-500"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                      Address Type
                    </label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className="w-full py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-semibold tracking-wide transition mt-4 cursor-pointer"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3 sm:gap-0 mb-5">
        <h1 className="text-[20px] font-[600] text-gray-800 pb-2">
          My Addresses
        </h1>
        <div
          className="bg-orange-500 hover:bg-gray-800 text-white font-semibold w-full sm:w-auto text-center p-2 sm:px-4 sm:py-2 rounded-sm transition cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Add New Address
        </div>
      </div>
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white min-h-[70px] rounded-sm flex flex-col md:flex-row items-start md:items-center px-3 shadow-[0_0_20px_rgba(0,0,0,0.05)] justify-between md:pr-10 mb-5 border border-gray-100 gap-2 md:gap-0"
            key={index}
          >
            <div className="flex items-center w-full md:w-auto">
              <h5 className="pl-0 md:pl-5 font-semibold text-gray-800">
                {item.addressType}
              </h5>
            </div>
            <div className="pl-0 md:pl-8 flex items-center w-full md:w-auto">
              <h6 className="text-[13px] text-gray-700 break-words">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-0 md:pl-8 flex items-center w-full md:w-auto">
              <h6 className="text-[13px] text-gray-700">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-end md:justify-between pl-0 md:pl-8 w-full md:w-auto">
              <AiOutlineDelete
                size={22}
                className="cursor-pointer text-gray-400 hover:text-orange-500 transition"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px] text-gray-400">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default UserProfileData;
