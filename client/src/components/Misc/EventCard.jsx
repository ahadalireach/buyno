import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import CountDown from "./CountDown";
import { eventPlaceholderImg } from "../../assets";

const MAX_NAME_LENGTH = 50;
const MAX_DESC_LENGTH = 150;

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const EventCard = ({ active, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

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
    <div
      className={`relative rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.05)] ${
        active ? "border-2 border-gray-300" : "mb-10 border-2"
      }`}
    >
      <span className="absolute top-5 left-5 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-sm z-10 shadow">
        🎉 Event of The Day
      </span>

      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 w-full bg-gray-200 flex items-center justify-center p-4">
          <img
            src={`${data.images[0]?.url}`}
            alt={data.name || "Event"}
            className="w-full h-64 md:h-96 object-contain rounded-sm bg-white"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = eventPlaceholderImg;
            }}
          />
        </div>

        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {truncateText(data.name, MAX_NAME_LENGTH)}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {truncateText(data.description, MAX_DESC_LENGTH)}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2 items-end">
                {data.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${data.originalPrice}
                  </span>
                )}
                <span className="text-xl font-bold text-orange-500">
                  ${data.discountPrice}
                </span>
              </div>
              <span className="text-sm text-green-600 font-semibold">
                {data.soldOut} sold
              </span>
            </div>

            <CountDown data={data} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to={`/product/${data._id}?isEvent=true`} className="flex-1">
              <button className="w-full bg-orange-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-sm transition duration-300 shadow">
                See Details
              </button>
            </Link>
            <button
              onClick={() => addToCartHandler(data?._id)}
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-300 text-white hover:text-black font-semibold py-2 px-4 rounded-sm transition duration-300 shadow"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
