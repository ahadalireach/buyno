/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProducts } from "../../../redux/actions/product";
import ProductCard from "../../Products/ProductCard";
import Ratings from "../../Products/Ratings";
import { profilePlaceholderImg } from "../../../assets";

const SellerProfileData = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllSellerProducts(id));
  }, [dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 border-b border-gray-100 pb-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto">
          <button
            className={`text-[16px] sm:text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 1
                ? "text-gray-700 border-b-2 border-gray-800 bg-gray-100"
                : "text-gray-500"
            }`}
            onClick={() => setActive(1)}
          >
            Seller Products
          </button>
          <button
            className={`text-[16px] sm:text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 2
                ? "text-gray-700 border-b-2 border-gray-800 bg-gray-100"
                : "text-gray-500"
            }`}
            onClick={() => setActive(2)}
          >
            Running Events
          </button>
          <button
            className={`text-[16px] sm:text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 3
                ? "text-gray-700 border-b-2 border-gray-800 bg-gray-100"
                : "text-gray-500"
            }`}
            onClick={() => setActive(3)}
          >
            Seller Reviews
          </button>
        </div>
        {isOwner && (
          <Link to="/seller/dashboard" className="w-full sm:w-auto">
            <div className="rounded h-[39.5px] bg-orange-500 hover:bg-gray-800 flex items-center justify-center px-4 w-full sm:w-auto mt-3 sm:mt-0">
              <span className="text-white font-semibold text-center">
                Go Dashboard
              </span>
            </div>
          </Link>
        )}
      </div>

      {active === 1 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {products && products.length > 0 ? (
            products.map((i, index) => (
              <ProductCard data={i} key={index} isOwner={true} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <h5 className="text-center py-5 text-[18px] text-gray-500">
                No products found{!isOwner && " for this seller"}!
              </h5>
            </div>
          )}
        </div>
      )}

      {active === 2 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {events && events.length > 0 ? (
            events.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <h5 className="text-center py-5 text-[18px] text-gray-500">
                No events found{!isOwner && " for this seller"}!
              </h5>
            </div>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full flex flex-col gap-4">
          {allReviews && allReviews.length > 0 ? (
            allReviews.map((item, index) => (
              <div
                className="w-full flex items-start gap-4 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100"
                key={index}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${item?.user?.avatar}`}
                  className="w-14 h-14 rounded-full border border-gray-200 object-cover"
                  alt={item?.user?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = profilePlaceholderImg;
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold text-gray-800">
                      {item?.user?.name}
                    </h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="text-gray-700 mt-1">{item?.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full">
              <h5 className="text-center py-5 text-[18px] text-gray-500">
                No reviews found{!isOwner && " for this seller"}!
              </h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerProfileData;
