import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../../redux/actions/order";
import { getAllSellerProducts } from "../../../redux/actions/product";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";

const SellerDashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSellerOrders(seller._id));
    dispatch(getAllSellerProducts(seller._id));
  }, [dispatch, seller._id]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full">
      <h3 className="text-[20px] sm:text-[22px] pb-2">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 w-full">
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={28} className="text-gray-700" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Account Balance
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                (with 10% service charge)
              </p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            ${availableBalance}
          </p>
          <Link to="/seller/dashboard-withdraw-money">
            <p className="text-orange-500 hover:text-gray-800 font-medium text-xs sm:text-sm pl-1">
              Withdraw Money
            </p>
          </Link>
        </div>
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <MdBorderClear size={28} className="text-gray-700" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              All Orders
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            {orders?.length ?? 0}
          </p>
          <Link to="/seller/dashboard-orders">
            <p className="text-orange-500 hover:text-gray-800 font-medium text-xs sm:text-sm pl-1">
              View Orders
            </p>
          </Link>
        </div>
        <div className="shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={28} className="text-gray-700" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              All Products
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 pl-1">
            {products?.length ?? 0}
          </p>
          <Link to="/seller/dashboard-products">
            <p className="text-orange-500 hover:text-gray-800 font-medium text-xs sm:text-sm pl-1">
              View Products
            </p>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[20px] sm:text-[22px] pb-2">Latest Orders</h3>
      <div className="block md:hidden space-y-4">
        {!orders || orders.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          orders.slice(0, 10).map((order) => (
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
      <div className="hidden md:block w-full min-h-[45vh] rounded-sm overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)]">
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
              </th>{" "}
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
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
              orders.slice(0, 10).map((order) => (
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
                  <td className="px-4 py-2">
                    <Link to={`/seller/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition">
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

export default SellerDashboardHero;
