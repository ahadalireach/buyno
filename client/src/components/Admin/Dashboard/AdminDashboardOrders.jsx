import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByAdmin } from "../../../redux/actions/order";
import Loader from "../../General/Loader";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const { adminOrderLoading, adminOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPages = adminOrders ? Math.ceil(adminOrders.length / pageSize) : 1;
  const paginatedOrders = adminOrders
    ? adminOrders.slice((page - 1) * pageSize, page * pageSize)
    : [];

  return adminOrderLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!adminOrders || adminOrders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          paginatedOrders.map((order) => (
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Total</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      US$ {order.totalPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Created At
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      {order.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {adminOrders && adminOrders.length > pageSize && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
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
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!adminOrders || adminOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
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
                    {order.createdAt.substring(0, 10)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {adminOrders && adminOrders.length > pageSize && (
          <div className="hidden md:flex justify-center items-center gap-1 my-4">
            <button
              className="px-2 py-1 rounded-sm border text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 mx-0.5 transition disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-2 py-1 rounded-sm border text-xs mx-0.5 ${
                  page === i + 1
                    ? "bg-orange-500 text-white hover:bg-gray-800"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 rounded-sm border text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 mx-0.5 transition disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
