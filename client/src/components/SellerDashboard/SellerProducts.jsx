import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import {
  deleteProduct,
  getAllSellerProducts,
} from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const SellerProducts = () => {
  const { isLoading, products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

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

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg mt-8">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Stock</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Sold Out
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Preview</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="py-4 text-center">
                <Loader />
              </td>
            </tr>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 text-sm">{product._id}</td>
                <td className="px-4 py-2 text-sm">{product.name}</td>
                <td className="px-4 py-2 text-sm">
                  {product.discountPrice
                    ? `$${product.discountPrice}`
                    : product.originalPrice
                    ? `$${product.originalPrice}`
                    : "-"}
                </td>
                <td className="px-4 py-2 text-sm">{product.stock}</td>
                <td className="px-4 py-2 text-sm">{product.sold_out || 0}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition"
                    title="Preview"
                    // onClick={() => handlePreview(product._id)}
                  >
                    <AiOutlineEye size={18} />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                    title="Delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-400">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerProducts;
