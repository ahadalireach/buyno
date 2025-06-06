import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Loader from "../Layout/Loader";

const AllCoupons = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
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
          selectedProduct,
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
        setSelectedProduct("");
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
        <Loader />
      ) : (
        <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
          <div className="w-full flex justify-end mb-4">
            <button
              className="bg-orange-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg transition"
              onClick={() => setOpen(true)}
            >
              Create Coupon Code
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Value (%)
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Min Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Max Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {coupons.length > 0 ? (
                  coupons.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-2 text-sm">{item._id}</td>
                      <td className="px-4 py-2 text-sm">{item.name}</td>
                      <td className="px-4 py-2 text-sm">{item.value} %</td>
                      <td className="px-4 py-2 text-sm">
                        {item.minAmount || "-"}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {item.maxAmount || "-"}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {item.selectedProduct || "-"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition"
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
              <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-y-scroll max-h-[90vh]">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer text-gray-500 hover:text-orange-500"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                  Create Coupon Code
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon code name..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter discount value..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter min amount..."
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter max amount..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-md font-semibold transition"
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

export default AllCoupons;
