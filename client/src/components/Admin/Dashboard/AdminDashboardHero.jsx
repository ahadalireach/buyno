import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByAdmin } from "../../../redux/actions/order";
import { getAllSellersByAdmin } from "../../../redux/actions/seller";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import Loader from "../../General/Loader";

const AdminDashboardHero = () => {
  const dispatch = useDispatch();
  const { adminOrderLoading, adminOrders } = useSelector(
    (state) => state.order
  );
  const { adminSellersLoading, adminSellers } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
    dispatch(getAllSellersByAdmin());
  }, [dispatch]);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);
  const adminBalance = adminEarning?.toFixed(2);

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = adminOrders ? Math.ceil(adminOrders.length / pageSize) : 1;
  const paginatedOrders = adminOrders
    ? adminOrders.slice((page - 1) * pageSize, page * pageSize)
    : [];

  return adminOrderLoading || adminSellersLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <h3 className="text-[20px] sm:text-[22px] pb-2">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 w-full">
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={28} className="text-gray-700" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Total Earning
              </h3>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            ${adminBalance || "0.00"}
          </p>
        </div>
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <MdBorderClear size={28} className="text-gray-700" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              All Sellers
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            {adminSellers && adminSellers.length}
          </p>
          <Link to="/admin/dashboard-sellers">
            <p className="text-orange-500 hover:text-gray-800 font-medium text-xs sm:text-sm pl-1">
              View Sellers
            </p>
          </Link>
        </div>
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={28} className="text-gray-700" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              All Orders
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            {adminOrders && adminOrders.length}
          </p>
          <Link to="/admin/dashboard-orders">
            <p className="text-orange-500 hover:text-gray-800 font-medium text-xs sm:text-sm pl-1">
              View Orders
            </p>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[20px] sm:text-[22px] pb-2">Latest Orders</h3>
      <div className="block md:hidden space-y-4">
        {!adminOrders || adminOrders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No latest orders found.</p>
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
                    <p className="text-sm text-gray-600">
                      {order.cart.reduce((acc, item) => acc + item.qty, 0)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-800">
                    Order Date
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.createdAt.slice(0, 10)}
                  </p>
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
      <div className="hidden md:block w-full min-h-[45vh] rounded-sm overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)]">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Items Qty
              </th>
              <th className="px-4 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!adminOrders || adminOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 text-lg"
                >
                  No latest orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate">
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
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate">
                    {order.cart.reduce((acc, item) => acc + item.qty, 0)}
                  </td>
                  <td className="px-4 py-2 text-sm">US$ {order.totalPrice}</td>
                  <td className="px-4 py-2">{order.createdAt.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {adminOrders && adminOrders.length > pageSize && (
          <div className="flex justify-center items-center gap-1 my-4">
            <button
              className="px-2 py-1 rounded-sm bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 text-xs"
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

export default AdminDashboardHero;
