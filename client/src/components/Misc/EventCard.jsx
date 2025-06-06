import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const MAX_NAME_LENGTH = 50;
const MAX_DESC_LENGTH = 150;

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const EventCard = ({ active, data }) => {
  const addToCartHandler = (data) => {};

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg transition hover:shadow-xl ${
        active ? "border-2 border-orange-500" : "mb-10 border-2"
      }`}
    >
      <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">
        🎉 Event of The Day
      </span>

      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 w-full bg-orange-500 flex items-center justify-center p-4">
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
                  encodeURIComponent(data.name || "Event")
            }
            alt={data.name || "Event"}
            className="w-full h-64 md:h-96 object-contain rounded-xl bg-white"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(data.name || "Event");
            }}
          />
        </div>

        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {truncateText(data.name, MAX_NAME_LENGTH)}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {truncateText(data.description, MAX_DESC_LENGTH)}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2 items-end">
                <span className="text-sm text-gray-400 line-through">
                  ${data.originalPrice}
                </span>
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
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow">
                See Details
              </button>
            </Link>
            <button
              onClick={() => addToCartHandler(data)}
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
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
