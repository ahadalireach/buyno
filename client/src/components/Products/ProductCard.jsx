import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import Ratings from "./Ratings";
import ProductDetailsCard from "./ProductDetailsCard";
import { productPlaceholderImg } from "../../assets";

const ProductCard = ({ data, isEvent }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-sm shadow-sm hover:shadow-md border border-gray-100 p-4 relative transition-all group flex flex-col">
        <div className="w-full h-[190px] flex items-center justify-center bg-gray-200 rounded-sm relative overflow-hidden mb-4">
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
                data?.images &&
                data.images[0] &&
                `${process.env.REACT_APP_BACKEND_NON_API_URL}/${data.images[0]}`
              }
              alt={data.name}
              className="w-[80%] h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = productPlaceholderImg;
              }}
            />
          </Link>
          <div className="absolute top-3 right-3 z-10 flex flex-col items-center gap-2">
            <button
              className="bg-white rounded-sm p-2 shadow hover:bg-orange-100 transition"
              onClick={() =>
                click
                  ? removeFromWishlistHandler(data)
                  : addToWishlistHandler(data)
              }
              aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
            >
              {click ? (
                <AiFillHeart size={20} color="red" />
              ) : (
                <AiOutlineHeart size={20} color="#FF7D1A" />
              )}
            </button>
            <button
              className="bg-white rounded-sm p-2 shadow hover:bg-orange-100 transition"
              onClick={() => setQuickViewOpen(true)}
              aria-label="Quick View"
            >
              <AiOutlineEye size={20} color="#333" />
            </button>
            <button
              className="bg-orange-500 rounded-sm p-2 shadow hover:bg-gray-800 transition"
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
          <h4 className="font-semibold text-gray-800 text-base leading-tight min-h-[48px] mb-2 hover:text-orange-500 transition-colors">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>
        <div className="flex items-center mb-2">
          <Ratings rating={data?.ratings} />
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
          <span className="text-xs font-semibold px-2 py-1 rounded-sm bg-green-50 text-green-600 shadow">
            {data.soldOut} sold
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
