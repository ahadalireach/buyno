import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../../redux/actions/order";
import Loader from "../../General/Loader";

const SellerDashboardRefundOrders = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSellerOrders(seller._id));
  }, [dispatch, seller._id]);

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!refundOrders || refundOrders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No refund order found.</p>
          </div>
        ) : (
          refundOrders.map((order) => (
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
                  <Link to={`/seller/order/${order._id}`}>
                    <button
                      className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition"
                      title="View"
                    >
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
            {!refundOrders || refundOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No refund order found.
                </td>
              </tr>
            ) : (
              refundOrders.map((order) => (
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
                  <td
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Delivered" ||
                      order.status === "Refund Success"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {order.cart.length}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    US$ {order.totalPrice}
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <Link to={`/seller/order/${order._id}`}>
                      <button
                        className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200"
                        title="View"
                      >
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

export default SellerDashboardRefundOrders;
