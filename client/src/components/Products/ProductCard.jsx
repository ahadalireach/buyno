import { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Ratings from "./Ratings";

const ProductCard = ({ data, isEvent }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const addToCartHandler = (id) => {
    console.log("Add to cart:", id);
  };

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-4 relative transition-all group flex flex-col">
        <div className="w-full h-[190px] flex items-center justify-center bg-gray-200 rounded-xl relative overflow-hidden mb-4">
          <Link
            to={
              isEvent
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={
                data.images && data.images[0]?.url
                  ? data.images[0].url
                  : data.images && typeof data.images[0] === "string"
                  ? `${process.env.REACT_APP_BACKEND_NON_API_URL}${
                      data.images[0].startsWith("/")
                        ? data.images[0]
                        : "/" + data.images[0]
                    }`
                  : "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(data.name || "Product")
              }
              alt={data.name}
              className="w-[80%] h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="absolute top-3 right-3 z-10 flex flex-col items-center gap-2">
            <button
              className="bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
              onClick={() => setWishlisted((w) => !w)}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {wishlisted ? (
                <AiFillHeart size={20} color="red" />
              ) : (
                <AiOutlineHeart size={20} color="#FF7D1A" />
              )}
            </button>
            <button
              className="bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
              onClick={() => setQuickViewOpen(true)}
              aria-label="Quick View"
            >
              <AiOutlineEye size={20} color="#333" />
            </button>
            <button
              className="bg-orange-500 rounded-full p-2 shadow hover:bg-orange-600 transition"
              onClick={() => addToCartHandler(data?._id)}
              aria-label="Add to Cart"
            >
              <AiOutlineShoppingCart size={20} color="#fff" />
            </button>
          </div>
        </div>

        <Link to={`/seller/profile/preview/${data?.seller?._id}`}>
          <h5 className="text-xs font-semibold text-orange-500 mb-1 hover:underline tracking-wide">
            {data.seller?.name}
          </h5>
        </Link>

        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <h4 className="font-semibold text-gray-900 text-base leading-tight min-h-[48px] mb-2 hover:text-orange-500 transition-colors">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>

        <div className="flex items-center mb-2">
          <Ratings rating={data?.reviews} />
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-end gap-2">
            <h5 className="text-md font-bold text-orange-500">
              ${data.discountPrice}
            </h5>
            {data.originalPrice &&
              data.originalPrice !== data.discountPrice && (
                <h4 className="text-xs text-gray-400 line-through">
                  ${data.originalPrice}
                </h4>
              )}
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600 shadow">
            {data.sold_out} sold
          </span>
        </div>

        {quickViewOpen && (
          <ProductDetailsCard setOpen={setQuickViewOpen} data={data} />
        )}
      </div>
    </>
  );
};

export default ProductCard;
