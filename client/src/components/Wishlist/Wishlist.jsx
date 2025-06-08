import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { addToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";

const Wishlist = ({ setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [wishlistVisible, setWishlistVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setWishlistVisible(true), 10);
  }, []);

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const handleClose = () => {
    setWishlistVisible(false);
    setTimeout(() => setOpenWishlist(false), 350);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-30 transition-opacity duration-300">
      <div
        className={`fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-2xl border-l-4 border-gray-800 transition-transform duration-300 ${
          wishlistVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-orange-500 hover:text-gray-800 transition"
                onClick={handleClose}
              />
            </div>
            <h5 className="text-gray-600">Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer text-orange-500 hover:text-gray-800 transition"
                  onClick={handleClose}
                />
              </div>
              <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <AiOutlineHeart size={25} className="text-orange-500" />
                <h5 className="text-[20px] font-semibold text-gray-800">
                  {wishlist && wishlist.length} items
                </h5>
              </div>
              <div className="w-full">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <WishlistSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="flex items-center gap-4 bg-white p-4 mb-4 border border-gray-100 relative">
      <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
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
          className="w-20 h-20 max-w-full max-h-full object-contain bg-white"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="font-semibold text-gray-800 text-sm" title={data.name}>
          {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
        </h2>
        <span className="text-orange-500 font-bold text-md mt-1">
          US${totalPrice}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between h-full ml-2 gap-2">
        <button
          className="text-orange-500 hover:text-gray-800 transition"
          title="Add to cart"
          onClick={() => addToCartHandler(data)}
        >
          <BsCartPlus size={24} />
        </button>
        <button
          className="text-gray-400 hover:text-gray-800 transition"
          title="Remove"
          onClick={() => removeFromWishlistHandler(data)}
        >
          <RxCross1 size={22} />
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
