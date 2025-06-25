import { useSelector } from "react-redux";
import EventCard from "../Misc/EventCard";

const HotEvent = () => {
  const { allEvents } = useSelector((state) => state.events);

  let featuredEvent = null;

  if (allEvents && allEvents.length === 1) {
    featuredEvent = allEvents[0];
  } else if (allEvents && allEvents.length > 1) {
    featuredEvent = [...allEvents].sort((a, b) => b.soldOut - a.soldOut)[0];
  }

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            <span className="text-gray-800">Featured Event</span>
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
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10m-13 7h16a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">No events available</p>
              <p className="text-sm mt-1 text-gray-400">
                Stay tuned for upcoming announcements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotEvent;
