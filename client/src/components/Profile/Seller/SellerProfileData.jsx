/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProducts } from "../../../redux/actions/product";
import ProductCard from "../../Products/ProductCard";
import Ratings from "../../Products/Ratings";

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
      <div className="flex w-full items-center justify-between border-b border-orange-100 pb-2">
        <div className="flex gap-6">
          <button
            className={`text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 1
                ? "text-orange-500 border-b-2 border-orange-500 bg-orange-50"
                : "text-gray-700"
            }`}
            onClick={() => setActive(1)}
          >
            Seller Products
          </button>
          <button
            className={`text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 2
                ? "text-orange-500 border-b-2 border-orange-500 bg-orange-50"
                : "text-gray-700"
            }`}
            onClick={() => setActive(2)}
          >
            Running Events
          </button>
          <button
            className={`text-[18px] font-semibold px-2 py-1 rounded-t transition-colors ${
              active === 3
                ? "text-orange-500 border-b-2 border-orange-500 bg-orange-50"
                : "text-gray-700"
            }`}
            onClick={() => setActive(3)}
          >
            Seller Reviews
          </button>
        </div>
        {isOwner && (
          <Link to="/seller/dashboard">
            <div className="rounded h-[39.5px] bg-orange-500 hover:bg-gray-600 flex items-center justify-center px-4">
              <span className="text-white font-semibold">Go Dashboard</span>
            </div>
          </Link>
        )}
      </div>

      <div className="mt-8">
        {active === 1 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {products && products.length > 0 ? (
              products.map((i, index) => (
                <ProductCard data={i} key={index} isOwner={true} />
              ))
            ) : (
              <h5 className="w-full text-center py-5 text-[18px] text-gray-500">
                No products found{!isOwner && " for this seller"}!
              </h5>
            )}
          </div>
        )}

        {active === 2 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {events && events.length > 0 ? (
              events.map((i, index) => <ProductCard data={i} key={index} />)
            ) : (
              <h5 className="w-full text-center py-5 text-[18px] text-gray-500">
                No events found{!isOwner && " for this seller"}!
              </h5>
            )}
          </div>
        )}

        {active === 3 && (
          <div className="w-full flex flex-col gap-4">
            {allReviews && allReviews.length > 0 ? (
              allReviews.map((item, index) => (
                <div
                  className="w-full flex items-start gap-4 bg-gray-50 rounded-lg p-4 shadow-sm border border-orange-100"
                  key={index}
                >
                  <img
                    src={item?.user?.avatar?.url}
                    className="w-14 h-14 rounded-full border border-orange-200 object-cover"
                    alt={item?.user?.name}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-gray-900">
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
              <h5 className="w-full text-center py-5 text-[18px] text-gray-500">
                No reviews found{!isOwner && " for this seller"}!
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfileData;
