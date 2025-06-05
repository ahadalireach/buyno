import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  if (isLoading) return null;

  const featuredEvent =
    allEvents && allEvents.length > 0
      ? [...allEvents].sort((a, b) => b.sold_out - a.sold_out)[0]
      : null;

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            <span className="text-orange-500">🌟 Featured Event</span>
          </h2>
          {featuredEvent && (
            <p className="text-gray-500 text-sm sm:text-base">
              Discover our top event of the moment!
            </p>
          )}
        </div>
        <div className="w-full grid">
          {featuredEvent ? (
            <EventCard data={featuredEvent} />
          ) : (
            <div className="text-center text-gray-500 py-8">
              No Event found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
