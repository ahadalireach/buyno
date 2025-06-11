import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersByAdmin } from "../../../redux/actions/seller";
import Loader from "../../General/Loader";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboardSellers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setSellerId] = useState("");
  const { adminSellersLoading, adminSellers } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getAllSellersByAdmin());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = adminSellers
    ? Math.ceil(adminSellers.length / pageSize)
    : 1;
  const paginatedUsers = adminSellers
    ? adminSellers.slice((page - 1) * pageSize, page * pageSize)
    : [];

  const handleDelete = async (id) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/admin/delete-seller/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellersByAdmin());
  };

  return adminSellersLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!adminSellers || adminSellers.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No seller found.</p>
          </div>
        ) : (
          paginatedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Seller ID
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      {user._id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Name</p>
                    <p>{user.name}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Address</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {user.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Joined At</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {user.createdAt.slice(0, 10)}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Link to={`/seller/profile/preview/${user._id}`}>
                    <button
                      className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                      title="View Seller"
                    >
                      <AiOutlineEye size={20} />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                    onClick={() => {
                      setSellerId(user._id);
                      setOpen(true);
                    }}
                    title="Delete Seller"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {adminSellers && adminSellers.length > pageSize && (
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
      <div className="hidden md:block w-full rounded-sm overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)]">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Seller ID
              </th>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Joined At
              </th>
              <th className="px-3 py-2 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!adminSellers || adminSellers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500 text-lg"
                >
                  No sellers found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate">
                    {user._id}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {user.address}
                  </td>
                  <td className="px-4 py-2 text-sm text-center align-middle">
                    {user.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 text-sm text-center align-middle flex gap-2 justify-center">
                    <Link to={`/seller/profile/preview/${user._id}`}>
                      <button
                        className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                        title="View Seller"
                      >
                        <AiOutlineEye size={20} />
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                      onClick={() => {
                        setSellerId(user._id);
                        setOpen(true);
                      }}
                      title="Delete Seller"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {adminSellers && adminSellers.length > pageSize && (
          <div className="flex justify-center items-center gap-1 my-4">
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
      {open && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="w-[95%] md:w-[400px] bg-white rounded shadow-lg p-6 animate-fadeIn">
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
              Are you sure you want to delete this seller?
            </h3>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-6 py-2 rounded bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600 transition"
                onClick={() => {
                  setOpen(false);
                  handleDelete(userId);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardSellers;
