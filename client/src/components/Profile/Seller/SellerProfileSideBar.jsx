import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { productData } from "../../../static/data";
import Loader from "../../Layout/Loader";

const SellerSideBar = () => {
  const [isLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

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
        console.log(error.response.data.message);
      });
  };

  const totalReviewsLength =
    productData &&
    productData.reduce(
      (acc, product) => acc + (product.reviews?.length || 0),
      0
    );

  const totalRatings =
    productData &&
    productData.reduce(
      (acc, product) =>
        acc +
        (product.reviews
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0)
          : 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full bg-white rounded-2xl shadow p-6 border border-orange-100">
          <div className="flex flex-col items-center">
            <img
              src={
                seller?.avatar?.url
                  ? seller.avatar.url
                  : seller?.avatar && typeof seller.avatar === "string"
                  ? `${process.env.REACT_APP_BACKEND_NON_API_URL}${
                      seller.avatar.startsWith("/")
                        ? seller.avatar
                        : "/" + seller.avatar
                    }`
                  : "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(seller?.name || "Shop")
              }
              alt={seller?.name}
              className="w-28 h-28 rounded-full border-2 border-orange-400 object-cover"
            />
            <h3 className="text-center py-2 text-2xl font-bold text-orange-500">
              {seller.name}
            </h3>
            <p className="text-base text-gray-600 text-center">
              {seller.description}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div>
              <h5 className="font-semibold text-gray-900">Address</h5>
              <h4 className="text-gray-500">{seller.address}</h4>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Phone Number</h5>
              <h4 className="text-gray-500">{seller.phoneNumber}</h4>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Total Products</h5>
              <h4 className="text-gray-500">
                {productData && productData.length}
              </h4>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Shop Ratings</h5>
              <h4 className="text-gray-500">{averageRating.toFixed(1)}/5</h4>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Joined On</h5>
              <h4 className="text-gray-500">
                {seller.createdAt
                  ? new Date(seller.createdAt).toLocaleDateString()
                  : seller.created_at || "N/A"}
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Link to="/seller/settings">
              <button className="w-full h-11 rounded bg-orange-500 hover:bg-gray-600 text-white font-semibold transition">
                Edit Shop
              </button>
            </Link>
            <button
              className="w-full h-11 rounded bg-gray-200 hover:bg-gray-600 hover:text-white text-gray-700 font-semibold transition"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerSideBar;
