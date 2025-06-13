import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByAdmin } from "../../../redux/actions/product";
import Loader from "../../General/Loader";

const AdminDashboardProducts = () => {
  const dispatch = useDispatch();
  const { adminProductsLoading, adminProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProductsByAdmin());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = adminProducts
    ? Math.ceil(adminProducts.length / pageSize)
    : 1;
  const paginatedProducts = adminProducts
    ? adminProducts.slice((page - 1) * pageSize, page * pageSize)
    : [];

  return adminProductsLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!adminProducts || adminProducts.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Product ID
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      {product._id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Name</p>
                    <p className="text-sm text-gray-900 font-semibold">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Price</p>
                    <p className="text-sm text-gray-600">
                      US$ {product.discountPrice}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Stock</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      {product.stock}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Sold</p>
                    <p className="text-sm text-gray-600 font-semibold">
                      {product.soldOut}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-2">
                  <span className="text-sm font-medium text-gray-800">
                    Preview
                  </span>
                  <td className="py-2 text-sm text-center align-middle flex gap-2 justify-center">
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                        title="Preview Product"
                      >
                        <AiOutlineArrowRight size={20} />
                      </button>
                    </Link>
                  </td>
                </div>
              </div>
            </div>
          ))
        )}
        {adminProducts && adminProducts.length > pageSize && (
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
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
          </colgroup>
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Sold
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Preview
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!adminProducts || adminProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={product._id}
                  >
                    {product._id}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    US$ {product.discountPrice}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-900">
                    {product.soldOut}
                  </td>
                  <td className="px-4 py-2 text-sm text-center align-middle flex gap-2 justify-center">
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="bg-orange-500 text-white hover:bg-gray-800 rounded-sm p-1 transition"
                        title="Preview Product"
                      >
                        <AiOutlineArrowRight size={20} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {adminProducts && adminProducts.length > pageSize && (
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
    </div>
  );
};

export default AdminDashboardProducts;
