import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { addToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const existingItem = cart.find((item) => item._id === id);
    if (existingItem) {
      toast.error("Item already in cart. Please update quantity.");
      return;
    } else {
      if (data.stock < count) {
        toast.error("Product stock is limited. Please reduce quantity.");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart.");
      }
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="w-[95%] max-w-4xl h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative p-6 flex flex-col gap-4">
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
                    className="w-[220px] h-[220px] object-contain rounded-xl bg-gray-50 shadow"
                  />
                </div>
                <Link
                  to={`/seller/profile/preview/${data.seller._id}`}
                  className="flex items-center gap-3 mb-4 hover:underline"
                >
                  <img
                    src={
                      data.seller?.avatar?.url
                        ? data.seller.avatar.url
                        : data.seller?.avatar &&
                          typeof data.seller.avatar === "string"
                        ? `${process.env.REACT_APP_BACKEND_NON_API_URL}${
                            data.seller.avatar.startsWith("/")
                              ? data.seller.avatar
                              : "/" + data.seller.avatar
                          }`
                        : "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(data.seller?.name || "Seller")
                    }
                    alt={data.seller.name}
                    className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-orange-500">
                      {data.seller.name}
                    </h3>
                    <h5 className="text-xs text-gray-500">
                      {data?.seller.ratings} Ratings
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
                  ({data.soldOut || 0}) Sold out
                </h5>
              </div>

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

                <div className="flex items-center gap-6 mt-4">
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
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
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
                      <AiFillHeart size={20} color="red" />
                    ) : (
                      <AiOutlineHeart size={20} color="#FF7D1A" />
                    )}
                  </button>
                </div>

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
