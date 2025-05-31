import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const EventCard = ({ active }) => {
  return (
    <div
      className={`relative bg-white border border-orange-300 rounded-2xl shadow-lg transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden ${
        active ? "" : "mb-12"
      }`}
    >
      <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
        Event of The Day
      </span>
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLig1H5cfDbpeQEeeMn1zGuHLRJZ87Y-GT2w&s"
          alt="Event"
          className="rounded-xl w-auto h-auto object-cover shadow-md"
        />
      </div>
      {/* Content */}
      <div className="md:w-1/2 flex flex-col justify-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Mega Summer Sale
        </h2>
        <p className="text-gray-600 mb-4">
          Enjoy exclusive discounts on our best products! Limited time only.
          Don’t miss out on amazing deals and special offers. Shop now and save
          big on your favorite items.
        </p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-end gap-2">
            <span className="text-lg text-gray-400 line-through font-medium">
              $1000
            </span>
            <span className="text-2xl text-orange-500 font-bold">$899</span>
          </div>
          <span className="text-green-600 font-semibold">18 sold</span>
        </div>
        <CountDown />
        <div className="flex gap-4 mt-6">
          <Link to={`/product/details?isEvent=true`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
              See Details
            </button>
          </Link>
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
