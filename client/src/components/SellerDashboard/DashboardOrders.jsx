import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../redux/actions/order";
import Loader from "../Layout/Loader";

const DashboardOrders = () => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerOrders(seller._id));
  }, [dispatch, seller._id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <div className="overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Items Qty
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!orders || orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 text-sm">{order._id}</td>
                  <td className="px-4 py-2 text-sm">{order.status}</td>
                  <td className="px-4 py-2 text-sm">{order.cart.length}</td>
                  <td className="px-4 py-2 text-sm">US$ {order.totalPrice}</td>
                  <td className="px-4 py-2">
                    <Link to={`/seller/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-full p-2 transition">
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

export default DashboardOrders;
