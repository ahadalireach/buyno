import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import {
  deleteProduct,
  getAllSellerProducts,
} from "../../../redux/actions/product";
import Loader from "../../General/Loader";

const SellerDashboardProducts = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllSellerProducts(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    toast.success("Product deleted successfully.");
    window.location.reload(true);
  };

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="block md:hidden space-y-4">
        {!products || products.length === 0 ? (
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          products.map((product) => (
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
                  <Link to={`/product/${product._id}`}>
                    <button
                      className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition"
                      title="Preview"
                    >
                      <AiOutlineEye size={16} />
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Name</p>
                    <p className="text-sm text-gray-600 break-all">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Price</p>
                    <p className="text-sm text-gray-600">
                      {product.discountPrice
                        ? `$${product.discountPrice}`
                        : product.originalPrice
                        ? `$${product.originalPrice}`
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Stock</p>
                    <p className="text-sm text-gray-600">{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Sold Out
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.soldOut || 0}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-800 text-white rounded-sm p-2 transition-colors duration-200"
                    title="Delete"
                    onClick={() => handleDelete(product._id)}
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
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                ID
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
                Sold Out
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Preview
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!products || products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 lg:px-6 py-8 text-center text-gray-500 text-lg"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
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
                    {product.discountPrice
                      ? `$${product.discountPrice}`
                      : product.originalPrice
                      ? `$${product.originalPrice}`
                      : "-"}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-4 lg:px-6 py-3 text-sm text-gray-900">
                    {product.soldOut || 0}
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200"
                        title="Preview"
                      >
                        <AiOutlineEye size={18} />
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 lg:px-6 py-3">
                    <button
                      className="bg-red-500 hover:bg-gray-800 text-white rounded-sm p-2 transition-colors duration-200"
                      title="Delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      <AiOutlineDelete size={18} />
                    </button>
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

export default SellerDashboardProducts;
