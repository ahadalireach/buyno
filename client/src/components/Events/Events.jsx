import EventCard from "./EventCard";

const Events = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="mb-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            <span className="text-orange-500">🌟 Popular Events</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Don’t miss these trending happenings
          </p>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
