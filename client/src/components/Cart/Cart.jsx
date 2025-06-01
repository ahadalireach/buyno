import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

const Cart = ({ setOpenCart }) => {
  const cart = [
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

  const removeFromCartHandler = (data) => {};

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {};

  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCartVisible(true), 10);
  }, []);

  const handleClose = () => {
    setCartVisible(false);
    setTimeout(() => setOpenCart(false), 350);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-30 transition-opacity duration-300">
      <div
        className={`fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-2xl border-l-4 border-orange-500 transition-transform duration-300 ${
          cartVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-orange-500 hover:text-orange-600 transition"
                onClick={handleClose}
              />
            </div>
            <h5 className="text-gray-600">Cart is empty!</h5>
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
                <IoBagHandleOutline size={25} className="text-orange-500" />
                <h5 className="text-[20px] font-semibold text-gray-800">
                  {cart && cart.length} items
                </h5>
              </div>
              <div className="w-full">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-4">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 transition rounded-[5px] shadow-lg">
                  <h1 className="text-white text-[18px] font-semibold">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updatecart = { ...data, qty: value + 1 };
      quantityChangeHandler(updatecart);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updatecart = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updatecart);
  };

  return (
    <div className="border-b border-orange-100 p-4 flex items-center gap-3 relative">
      <div className="flex flex-col items-center gap-2">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-7 h-7 flex items-center justify-center transition"
          onClick={() => increment(data)}
        >
          <HiPlus size={18} />
        </button>
        <span className="font-semibold text-gray-700">{value}</span>
        <button
          className="bg-gray-200 hover:bg-orange-100 text-orange-500 rounded-full w-7 h-7 flex items-center justify-center transition"
          onClick={() => decrement(data)}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>
      <img
        src={data?.images[0]?.url}
        alt={data.name}
        className="w-[80px] h-[80px] object-cover rounded-[5px] border border-orange-100"
      />
      <div className="flex-1 pl-2">
        <h1 className="font-semibold text-gray-800">{data.name}</h1>
        <h4 className="font-normal text-[15px] text-gray-500">
          ${data.discountPrice} x {value}
        </h4>
        <h4 className="font-bold text-[17px] pt-1 text-orange-500">
          US${totalPrice}
        </h4>
      </div>
      <RxCross1
        className="cursor-pointer text-gray-400 hover:text-orange-500 transition absolute top-2 right-2"
        onClick={() => removeFromCartHandler(data)}
        size={20}
      />
    </div>
  );
};

export default Cart;
