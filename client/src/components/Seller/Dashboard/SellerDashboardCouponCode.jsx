import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Loader from "../../General/Loader";

const SellerDashboardCouponCode = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/couponCodes/seller/${seller._id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch(() => setIsLoading(false));
  }, [seller._id]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/couponCodes/seller/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Coupon code deleted successfully!");
        setCoupons((prev) => prev.filter((c) => c._id !== id));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/couponCodes/create`,
        {
          name,
          minAmount,
          maxAmount,
          value,
          sellerId: seller._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        setName("");
        setMinAmount("");
        setMaxAmount("");
        setValue("");
        setIsLoading(true);
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/couponCodes/seller/${seller._id}`,
            { withCredentials: true }
          )
          .then((res) => {
            setIsLoading(false);
            setCoupons(res.data.couponCodes);
          })
          .catch(() => setIsLoading(false));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error creating coupon");
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full space-y-6">
          <button
            className="bg-gray-300 hover:bg-gray-800 hover:text-white font-semibold px-5 py-2 rounded-sm transition-shadow duration-300 focus:outline-none"
            onClick={() => setOpen(true)}
          >
            Create Coupon Code
          </button>
          <div className="block md:hidden space-y-4">
            {coupons.length === 0 ? (
              <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
                <p className="text-gray-500 text-lg">No coupons found.</p>
              </div>
            ) : (
              coupons.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Coupon ID
                        </p>
                        <p className="text-sm text-gray-600 break-all">
                          {item._id}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Name
                        </p>
                        <p className="text-sm text-gray-600 break-all">
                          {item.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Value (%)
                        </p>
                        <p className="text-sm text-gray-600">{item.value} %</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Min Amount
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.minAmount || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Max Amount
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.maxAmount || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-red-500 hover:bg-gray-800 text-white rounded-sm p-2 shadow-md transition-shadow duration-300 focus:outline-none"
                        title="Delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        <AiOutlineDelete size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden md:block overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white rounded-sm">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Value (%)
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Min Amount
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Max Amount
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {coupons.length > 0 ? (
                  coupons.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td
                        className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate"
                        title={item._id}
                      >
                        {item._id}
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                        {item.value} %
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                        {item.minAmount || "-"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                        {item.maxAmount || "-"}
                      </td>
                      <td className="px-4 lg:px-6 py-3">
                        <button
                          className="bg-red-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-shadow duration-300 focus:outline-none"
                          title="Delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-gray-400">
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {open && (
            <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
              <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 relative overflow-y-scroll max-h-[90vh]">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Create Coupon Code
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-base font-semibold text-gray-800 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon code name..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-800 mb-1">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      max={100}
                      min={1}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter discount value..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-800 mb-1">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      min={1}
                      max={1000000}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter min amount..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-800 mb-1">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      min={1}
                      max={1000000}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter max amount..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SellerDashboardCouponCode;
