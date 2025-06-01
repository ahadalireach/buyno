import { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = (id) => {};

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="w-[95%] max-w-4xl h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative p-6 flex flex-col gap-4">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 z-50 bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <RxCross1 size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={data.images && data.images[0]?.url}
                    alt={data.name}
                    className="w-[220px] h-[220px] object-contain rounded-xl bg-gray-50 shadow"
                  />
                </div>
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex items-center gap-3 mb-4 hover:underline"
                >
                  <img
                    src={data.images && data.images[0]?.url}
                    alt={data.shop.name}
                    className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-orange-500">
                      {data.shop.name}
                    </h3>
                    <h5 className="text-xs text-gray-500">
                      {data?.shop.ratings} Ratings
                    </h5>
                  </div>
                </Link>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg py-2 shadow hover:opacity-90 transition"
                  onClick={handleMessageSubmit}
                >
                  Send Message <AiOutlineMessage size={20} />
                </button>
                <h5 className="text-[15px] text-red-500 mt-4 font-semibold">
                  ({data.sold_out || 0}) Sold out
                </h5>
              </div>

              {/* Right: Product Details */}
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
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

                {/* Quantity & Wishlist */}
                <div className="flex items-center gap-6 mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
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
                  {/* Wishlist */}
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
                    onClick={() => setWishlisted((w) => !w)}
                    aria-label={
                      wishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    {wishlisted ? (
                      <AiFillHeart size={26} color="red" />
                    ) : (
                      <AiOutlineHeart size={26} color="#FF7D1A" />
                    )}
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  className="mt-6 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-3 shadow-lg transition"
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to cart <AiOutlineShoppingCart size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
