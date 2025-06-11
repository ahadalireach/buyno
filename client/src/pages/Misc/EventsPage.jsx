import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Loader,
  Header,
  Breadcrumb,
  EventCard,
  Footer,
} from "../../components";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb mainTitle="Hot Events" page="Events" />
      <main className="max-w-4xl mx-auto py-12 px-4">
        {allEvents && allEvents.length === 1 ? (
          <EventCard active={true} data={allEvents[0]} />
        ) : allEvents && allEvents.length > 1 ? (
          <div className="flex flex-col gap-8">
            {[...allEvents]
              .sort((a, b) => (b.soldOut || 0) - (a.soldOut || 0))
              .map((event, idx) => (
                <EventCard key={event._id || idx} active={true} data={event} />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
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
              Stay tuned for upcoming announcements and activities.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
