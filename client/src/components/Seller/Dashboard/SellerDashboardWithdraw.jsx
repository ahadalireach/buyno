import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSeller } from "../../../redux/actions/user";
import { getSellerOrders } from "../../../redux/actions/order";
import axios from "axios";

const SellerDashboardWithdraw = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerOrders(seller._id));
  }, [dispatch, seller._id]);

  const availableBalance = Number(seller?.availableBalance || 0).toFixed(2);

  const handleAddMethod = async (e) => {
    e.preventDefault();
    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/update-withdraw-method`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      );
      toast.success("Withdraw method added!");
      dispatch(getSeller());
      setAdding(false);
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankAddress: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error adding method");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/delete-withdraw-method`,
        { withCredentials: true }
      );
      toast.success("Method removed successfully!");
      dispatch(getSeller());
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "Error removing method");
    }
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (amount < 50) {
      return toast.error("Minimum withdrawal amount is $50!");
    }
    if (amount > Number(availableBalance)) {
      return toast.error("Invalid amount!");
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/withdraws/seller/request-withdraw`,
        { amount },
        { withCredentials: true }
      );
      toast.success("Withdrawal requested!");
      setWithdrawAmount("");
      setOpen(false);
      dispatch(getSeller());
    } catch (error) {
      console.log(error?.response);
      toast.error(
        error?.response?.data?.message || "Error processing withdrawal"
      );
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="max-w-md w-full rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Available Balance
        </h2>
        <p className="text-3xl font-bold text-gray-900 text-center">
          ${availableBalance}
        </p>
        <button
          onClick={() => Number(availableBalance) > 0 && setOpen(true)}
          className="w-full py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-medium transition"
        >
          Withdraw Funds
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-sm shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Withdraw Money
              </h3>
              <RxCross1
                size={24}
                className="cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => {
                  setOpen(false);
                  setAdding(false);
                }}
              />
            </div>

            {adding ? (
              <form onSubmit={handleAddMethod} className="space-y-4">
                {[
                  "bankName",
                  "bankCountry",
                  "bankSwiftCode",
                  "bankAccountNumber",
                  "bankHolderName",
                  "bankAddress",
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo[field]}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, [field]: e.target.value })
                      }
                      className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm"
                >
                  Add Method
                </button>
              </form>
            ) : seller.withdrawMethod ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">
                      <strong>Account: </strong>
                      {"•".repeat(
                        seller?.withdrawMethod.bankAccountNumber.length - 3
                      ) + seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                    </p>
                    <p className="text-gray-700">
                      <strong>Bank:</strong> {seller.withdrawMethod.bankName}
                    </p>
                  </div>
                  <button
                    className="flex items-center justify-center bg-red-500 hover:bg-gray-800 rounded-sm p-2 transition-colors duration-200"
                    onClick={handleDelete}
                    title="Delete Method"
                    type="button"
                  >
                    <AiOutlineDelete size={20} className="text-white" />
                  </button>
                </div>

                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Amount ($)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  />
                  <button
                    onClick={handleWithdraw}
                    className="w-full mt-2 py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-600">No payment methods added.</p>
                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center justify-center gap-1 text-orange-500 hover:text-gray-800 font-medium"
                >
                  <AiOutlinePlusCircle /> Add Payment Method
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardWithdraw;
