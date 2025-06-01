import { useState } from "react";
import { productData } from "../../static/data";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 1 ? count - 1 : 1);

  const removeFromWishlistHandler = () => setClick(false);
  const addToWishlistHandler = () => setClick(true);

  const handleMessageSubmit = async () => {
    navigate("/cart");
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#f5f6fb] py-8 min-h-screen">
      {data ? (
        <>
          <div className="w-11/12 bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-10 border border-orange-100">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center mb-4">
                <img
                  src={data.images && data.images[select]?.url}
                  alt={data?.name}
                  className="w-[90%] h-[400px] object-contain rounded-xl bg-gray-50 shadow"
                />
              </div>
              <div className="flex gap-2 mb-4">
                {data.images &&
                  data.images.map((i, index) => (
                    <img
                      key={index}
                      src={i?.url}
                      alt=""
                      className={`w-16 h-16 object-contain rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        select === index
                          ? "border-orange-500 shadow-lg scale-105"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                      onClick={() => setSelect(index)}
                    />
                  ))}
              </div>
              <Link
                to={`/shop/preview/${data?.shop._id}`}
                className="flex items-center gap-3 mb-4 hover:underline"
              >
                <img
                  src={data?.shop?.avatar?.url}
                  alt={data?.shop?.name}
                  className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-orange-500">
                    {data.shop.name}
                  </h3>
                  <h5 className="text-xs text-gray-500">5 Ratings</h5>
                </div>
              </Link>
              <button
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg py-2 shadow hover:opacity-90 transition"
                onClick={handleMessageSubmit}
              >
                Send Message <AiOutlineMessage size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {data.name}
              </h1>
              <p className="text-gray-700 mb-2">{data.description}</p>
              <div className="flex items-center gap-4 mb-2">
                <h4 className="text-2xl font-bold text-orange-500">
                  ${data.discountPrice}
                </h4>
                {data.originalPrice &&
                  data.originalPrice !== data.discountPrice && (
                    <h3 className="text-lg text-gray-400 line-through">
                      ${data.originalPrice}
                    </h3>
                  )}
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                  <button
                    className="bg-gray-100 text-gray-700 px-3 py-2 hover:bg-orange-100 transition"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="px-5 py-2 text-base font-semibold bg-white">
                    {count}
                  </span>
                  <button
                    className="bg-gray-100 text-gray-700 px-3 py-2 hover:bg-orange-100 transition"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-white rounded-full p-2 shadow hover:bg-orange-100 transition border border-orange-100"
                  onClick={() =>
                    click
                      ? removeFromWishlistHandler(data)
                      : addToWishlistHandler(data)
                  }
                  aria-label={
                    click ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  {click ? (
                    <AiFillHeart size={26} color="red" />
                  ) : (
                    <AiOutlineHeart size={26} color="#FF7D1A" />
                  )}
                </button>
              </div>
              <button className="mt-6 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-3 shadow-lg transition">
                Add to cart <AiOutlineShoppingCart size={22} />
              </button>
              <div className="flex items-center mt-4">
                <Ratings rating={data?.ratings} />
                <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600 shadow">
                  {data.sold_out} sold
                </span>
              </div>
            </div>
          </div>
          <div className="w-11/12 mt-8">
            <ProductDetailsInfo
              data={data}
              products={productData}
              totalReviewsLength={data?.reviews?.length || 0}
              averageRating={
                data?.reviews?.length
                  ? (
                      data.reviews.reduce(
                        (acc, item) => acc + (item.rating || 0),
                        0
                      ) / data.reviews.length
                    ).toFixed(1)
                  : 0
              }
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-white px-3 800px:px-10 py-6 rounded-2xl shadow-lg border border-orange-100">
      <div className="w-full flex flex-wrap gap-4 border-b pb-2">
        <div className="relative">
          <h5
            className={`text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] transition-colors ${
              active === 1 ? "text-orange-500" : "text-gray-700"
            }`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && (
            <div className="h-1 bg-orange-500 rounded-t w-full mt-1" />
          )}
        </div>
        <div className="relative">
          <h5
            className={`text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] transition-colors ${
              active === 2 ? "text-orange-500" : "text-gray-700"
            }`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && (
            <div className="h-1 bg-orange-500 rounded-t w-full mt-1" />
          )}
        </div>
        <div className="relative">
          <h5
            className={`text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] transition-colors ${
              active === 3 ? "text-orange-500" : "text-gray-700"
            }`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && (
            <div className="h-1 bg-orange-500 rounded-t w-full mt-1" />
          )}
        </div>
      </div>
      {active === 1 && (
        <p className="py-4 text-[18px] leading-8 whitespace-pre-line text-gray-700">
          {data.description}
        </p>
      )}

      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews &&
            data.reviews.map((item, index) => (
              <div
                className="w-full flex my-2 bg-gray-50 rounded-lg p-3 shadow-sm"
                key={index}
              >
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full border border-orange-100"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-gray-700">{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && (!data.reviews || data.reviews.length === 0) && (
              <h5 className="text-gray-500">
                No Reviews have for this product!
              </h5>
            )}
          </div>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full border-2 border-orange-400"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className="font-semibold text-orange-500">
                    {data.shop.name}
                  </h3>
                  <h5 className="pb-2 text-[15px] text-gray-500">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2 text-gray-700">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div className="rounded-[4px] h-[39.5px] mt-3 bg-orange-500 flex items-center justify-center px-4">
                  <h4 className="text-white font-semibold">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
