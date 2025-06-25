/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProducts } from "../../../redux/actions/product";
import axios from "axios";
import { profilePlaceholderImg } from "../../../assets";

const SellerProfileSideBar = ({ isOwner, sellerData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllSellerProducts(id));
  }, []);

  const logoutHandler = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sellers/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "Logout failed");
      });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className="w-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-6 border border-gray-100">
      <div className="flex flex-col items-center">
        <img
          src={sellerData?.avatar?.url}
          alt={sellerData?.name || "Seller"}
          className="w-28 h-28 rounded-full border-2 border-gray-800 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = profilePlaceholderImg;
          }}
        />
        <h3 className="text-center py-2 text-xl font-bold text-gray-800">
          {sellerData?.name || "Seller"}
        </h3>
        <p className="text-base text-gray-600 text-center">
          {sellerData?.description || ""}
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div>
          <h5 className="font-semibold text-gray-800">Address</h5>
          <h4 className="text-gray-500">{sellerData?.address || "N/A"}</h4>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Phone Number</h5>
          <h4 className="text-gray-500">{sellerData?.phoneNumber || "N/A"}</h4>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Total Products</h5>
          <h4 className="text-gray-500">{products && products.length}</h4>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Seller Ratings</h5>
          <h4 className="text-gray-500">{averageRating.toFixed(1)}/5</h4>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Joined On</h5>
          <h4 className="text-gray-500">
            {sellerData?.createdAt
              ? new Date(sellerData.createdAt).toLocaleDateString()
              : sellerData?.created_at || "N/A"}
          </h4>
        </div>
      </div>
      {isOwner && (
        <div className="flex flex-col gap-3 mt-6">
          <Link to="/seller/dashboard-settings">
            <button className="w-full h-11 rounded-sm bg-orange-500 hover:bg-gray-800 text-white font-semibold transition">
              Edit Seller Info
            </button>
          </Link>
          <button
            className="w-full h-11 rounded-sm bg-gray-200 hover:bg-gray-800 hover:text-white text-gray-700 font-semibold transition"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerProfileSideBar;
