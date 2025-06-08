import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../redux/actions/order";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Layout/Loader";

const DashboardOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { isLoading, orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerOrders(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/orders/seller/update-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status updated.");
      navigate("/seller/dashboard-orders");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const refundOrderUpdateHandler = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/orders/seller/order-refund/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order updated!");
      dispatch(getSellerOrders(seller._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-11/12 mx-auto flex flex-col py-10 min-h-screen px-4 md:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-orange-500">
          <div className="flex items-center space-x-2">
            <BsFillBagFill size={30} />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Order Details
            </h1>
          </div>
          <Link to="/seller/dashboard-orders">
            <div className="bg-orange-500 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md transition">
              Order List
            </div>
          </Link>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b pb-4">
          <h5 className="text-gray-600 text-base md:text-lg">
            Order ID:{" "}
            <span className="font-semibold text-gray-800">
              #{data?._id?.slice(0, 8)}
            </span>
          </h5>
          <h5 className="text-gray-600 text-base md:text-lg">
            Placed on:{" "}
            <span className="font-semibold text-gray-800">
              {data?.createdAt?.slice(0, 10)}
            </span>
          </h5>
        </div>

        <div className="mt-8 space-y-6">
          {data?.cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-4 last:border-b-0 bg-gray-50 rounded-lg px-4 py-3"
            >
              <img
                src={
                  item.images && item.images[0]?.url
                    ? item.images[0].url
                    : item.images && typeof item.images[0] === "string"
                    ? `${process.env.REACT_APP_BACKEND_NON_API_URL}${
                        item.images[0].startsWith("/")
                          ? item.images[0]
                          : "/" + item.images[0]
                      }`
                    : "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(item.name || "Product")
                }
                alt=""
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <h5 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h5>
                <p className="text-gray-600">
                  US${item.discountPrice} × {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right pt-4 mt-4 border-t">
          <h5 className="text-lg md:text-xl font-semibold text-gray-800">
            Total Price:{" "}
            <span className="text-orange-600">US${data?.totalPrice}</span>
          </h5>
        </div>

        {/* Shipping + Payment Info */}
        <div className="w-full flex flex-col md:flex-row gap-8 mt-8">
          <div className="w-full md:w-3/5">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Shipping Address:
            </h4>
            <p className="text-gray-700 mb-1">
              {data?.shippingAddress.address1 +
                " " +
                data?.shippingAddress.address2}
            </p>
            <p className="text-gray-700 mb-1">
              {data?.shippingAddress.country}
            </p>
            <p className="text-gray-700 mb-1">{data?.shippingAddress.city}</p>
            <p className="text-gray-700">{data?.user?.phoneNumber}</p>
          </div>
          <div className="w-full md:w-2/5">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Payment Info:
            </h4>
            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold text-orange-600">
                {data?.paymentInfo?.status
                  ? data.paymentInfo.status.charAt(0).toUpperCase() +
                    data.paymentInfo.status.slice(1)
                  : "Not Paid"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Order Status:
          </h4>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {data?.status !== "Processing refund" &&
            data?.status !== "Refund Success" ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              >
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(data?.status)
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              >
                {["Processing refund", "Refund Success"]
                  .slice(
                    ["Processing refund", "Refund Success"].indexOf(
                      data?.status
                    )
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            <button
              className="w-full md:w-auto bg-orange-500 hover:bg-gray-800 text-white rounded-md font-semibold h-11 text-lg px-8 transition shadow-sm"
              onClick={
                data?.status !== "Processing refund"
                  ? orderUpdateHandler
                  : refundOrderUpdateHandler
              }
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;
