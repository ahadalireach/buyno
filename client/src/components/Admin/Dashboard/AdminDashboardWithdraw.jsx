import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { BsGear } from "react-icons/bs";
import { toast } from "react-toastify";
import Loader from "../../General/Loader";

const AdminDashboardWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState(null);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = data ? Math.ceil(data.length / pageSize) : 1;
  const paginatedData = data
    ? data.slice((page - 1) * pageSize, page * pageSize)
    : [];

  useEffect(() => {
    getAllWithdrawRequestsByAdmin();
  }, []);

  const getAllWithdrawRequestsByAdmin = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/withdraws/admin/withdraw-requests`,
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data.withdraws);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error?.response?.data?.message || "Failed to fetch withdraw requests"
        );
      });
  };

  const handleUpdateStatus = async () => {
    if (!withdrawData) return;
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/withdraws/admin/update-withdraw-request/${withdrawData._id}`,
        { sellerId: withdrawData.seller?._id },
        { withCredentials: true }
      );
      toast.success("Withdraw request updated successfully!");
      setOpen(false);
      getAllWithdrawRequestsByAdmin();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!data || data.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No withdraw requests found.</p>
          </div>
        ) : (
          paginatedData.map((withdraw) => (
            <div
              key={withdraw._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Withdraw ID
                  </p>
                  <p className="text-sm text-gray-600 break-all">
                    {withdraw._id}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-800">Shop Name</p>
                  <p className="text-sm text-gray-900">
                    {withdraw.seller?.name || "-"}
                  </p>
                </div>
                <div classsName="space-y-3">
                  <p className="text-sm font-medium text-gray-800">Shop ID</p>
                  <p className="text-sm text-gray-600">
                    {withdraw.seller?._id || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Amount</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      US$ {withdraw.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status</p>
                    <p
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        withdraw.status === "succeed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {withdraw.status.charAt(0).toUpperCase() +
                        withdraw.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Request At
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {withdraw.createdAt?.slice(0, 10)}
                  </p>
                </div>
                <div className="flex justify-end items-center space-x-2">
                  {withdraw.status !== "Processing" && (
                    <span className="flex items-center text-green-600 font-semibold gap-1">
                      Done
                    </span>
                  )}
                  {withdraw.status === "Processing" && (
                    <button
                      className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                      title="Update Status"
                      onClick={() => {
                        setWithdrawData(withdraw);
                        setWithdrawStatus(withdraw.status);
                        setOpen(true);
                      }}
                    >
                      <BsGear size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              &lt;
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:block shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Withdraw ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Shop Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Shop ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Request At
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500 text-lg"
                >
                  No withdraw requests found.
                </td>
              </tr>
            ) : (
              paginatedData.map((withdraw) => (
                <tr
                  key={withdraw._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={withdraw._id}
                  >
                    {withdraw._id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {withdraw.seller?.name || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {withdraw.seller?._id || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    US$ {withdraw.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-center align-middle">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        withdraw.status === "succeed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {withdraw.status.charAt(0).toUpperCase() +
                        withdraw.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {withdraw.createdAt?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {withdraw.status !== "Processing" && (
                      <span className="flex items-center text-green-600 font-semibold gap-1">
                        Done
                      </span>
                    )}
                    {withdraw.status === "Processing" && (
                      <button
                        className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                        title="Update Status"
                        onClick={() => {
                          setWithdrawData(withdraw);
                          setWithdrawStatus(withdraw.status);
                          setOpen(true);
                        }}
                      >
                        <BsGear size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 my-4">
            <button
              className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              &lt;
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      {open && withdrawData && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow-[0_0_20px_rgba(0,0,0,0.05)] sm:rounded-sm sm:px-10 relative overflow-y-scroll max-h-[90vh]">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-800 p-1 rounded-full transition"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <RxCross1 size={24} />
              </button>
            </div>
            <h3 className="text-xl text-center py-4 font-semibold text-gray-800">
              Update Withdraw Status
            </h3>
            <div className="flex flex-col items-center gap-4 mt-2">
              <select
                value={withdrawStatus}
                onChange={(e) => setWithdrawStatus(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              >
                <option value="Processing">Processing</option>
                <option value="Succeed">Succeed</option>
              </select>
              <button
                type="button"
                className="px-6 py-2 rounded bg-orange-500 text-white font-medium hover:bg-gray-800 transition text-lg"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardWithdraw;
