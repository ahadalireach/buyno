import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { productPlaceholderImg, profilePlaceholderImg } from "../../assets";

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.seller._id;

      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/conversations/new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        )
        .then((res) => {
          navigate(`/user/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to send a message!");
      navigate("/user/login");
    }
  };

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
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="w-[95%] max-w-4xl h-[90vh] overflow-y-auto bg-white rounded-sm shadow-sm relative p-6 flex flex-col gap-4">
            <button
              className="absolute right-4 top-4 z-50 bg-white rounded-sm p-2 shadow hover:bg-orange-100 transition"
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
                      imgError
                        ? productPlaceholderImg
                        : data?.images &&
                          data.images[0] &&
                          `${process.env.REACT_APP_BACKEND_NON_API_URL}/${data.images[0]}`
                    }
                    alt={data.name}
                    className="w-[220px] h-[220px] object-contain rounded-sm shadow-sm bg-gray-50"
                    onError={() => setImgError(true)}
                  />
                </div>
                <Link
                  to={`/seller/profile/preview/${data.seller._id}`}
                  className="flex items-center gap-3 mb-4 hover:underline"
                >
                  <img
                    src={
                      data?.seller?.avatar &&
                      `${process.env.REACT_APP_BACKEND_NON_API_URL}/${data.seller.avatar}`
                    }
                    alt={data.seller.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-400 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profilePlaceholderImg;
                    }}
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
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-gray-300 hover:text-black text-white font-semibold rounded-sm py-2"
                  onClick={handleMessageSubmit}
                >
                  Send Message <AiOutlineMessage size={20} />
                </button>
                <h5 className="text-[15px] text-red-500 mt-4 font-semibold">
                  ({data.soldOut || 0}) Sold out
                </h5>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
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
                  <div className="flex items-center border rounded-sm overflow-hidden">
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
                    className="bg-white rounded-sm p-2 shadow hover:bg-orange-100 transition"
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
                  className="mt-6 flex items-center justify-center gap-2 bg-orange-500 hover:bg-gray-800 text-white font-semibold rounded-sm py-3 transition"
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
