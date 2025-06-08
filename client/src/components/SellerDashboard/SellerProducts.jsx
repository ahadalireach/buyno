import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import {
  deleteProduct,
  getAllSellerProducts,
} from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";

const SellerProducts = () => {
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
    <Loader />
  ) : (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <div className="overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Stock</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Sold Out
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Preview
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {!products || products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 text-lg"
                >
                  No products found.
                </td>
              </tr>
            ) : (
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
                  <td className="px-4 py-2 text-sm">{product.soldOut || 0}</td>
                  <td className="px-4 py-2">
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="bg-gray-800 hover:bg-gray-300 text-white hover:text-black rounded-full p-2 transition"
                        title="Preview"
                      >
                        <AiOutlineEye size={18} />
                      </button>
                    </Link>
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;
