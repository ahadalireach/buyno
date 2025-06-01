import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const removeFromWishlistHandler = (data) => {};
  const addToCartHandler = (data) => {};

  const wishlist = [
    {
      name: "Sample Product",
      discountPrice: 20,
      qty: 1,
      stock: 10,
      images: [
        {
          url: "https://s.alicdn.com/@sc04/kf/H776186991f2848ea890c936814a8aba4A.jpg_300x300.jpg",
        },
      ],
    },
    {
      name: "Another Product",
      discountPrice: 15,
      qty: 2,
      stock: 5,
      images: [
        {
          url: "https://m.media-amazon.com/images/I/41oT2DONfqL._AC_SY1000_.jpg",
        },
      ],
    },
    {
      name: "Third Product",
      discountPrice: 30,
      qty: 1,
      stock: 8,
      images: [
        { url: "https://i.ebayimg.com/images/g/dXkAAOSwVm9lsocK/s-l225.jpg" },
      ],
    },
  ];

  // Animation state for open/close
  const [wishlistVisible, setWishlistVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setWishlistVisible(true), 10);
  }, []);

  const handleClose = () => {
    setWishlistVisible(false);
    setTimeout(() => setOpenWishlist(false), 350);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-30 transition-opacity duration-300">
      <div
        className={`fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-2xl border-l-4 border-orange-500 transition-transform duration-300 ${
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
                className="cursor-pointer text-orange-500 hover:text-orange-600 transition"
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
                  className="cursor-pointer text-orange-500 hover:text-orange-600 transition"
                  onClick={handleClose}
                />
              </div>
              <div className="flex items-center gap-2 p-4 border-b border-orange-100">
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
  const [value] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b border-orange-100 p-4 flex items-center gap-3 relative">
      <img
        src={data?.images[0]?.url}
        alt={data.name}
        className="w-[80px] h-[80px] object-cover rounded-[5px] border border-orange-100"
      />
      <div className="flex-1 pl-2">
        <h1 className="font-semibold text-gray-800">{data.name}</h1>
        <h4 className="font-bold text-[17px] pt-1 text-orange-500">
          US${totalPrice}
        </h4>
      </div>
      <BsCartPlus
        size={22}
        className="cursor-pointer text-orange-500 hover:text-orange-600 transition absolute top-2 right-10"
        title="Add to cart"
        onClick={() => addToCartHandler(data)}
      />
      <RxCross1
        className="cursor-pointer text-gray-400 hover:text-orange-500 transition absolute top-2 right-2"
        onClick={() => removeFromWishlistHandler(data)}
        size={20}
      />
    </div>
  );
};

export default Wishlist;
