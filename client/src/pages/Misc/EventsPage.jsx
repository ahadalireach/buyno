import { useSelector } from "react-redux";
import {
  Header,
  Footer,
  Breadcrumb,
  Loader,
  EventCard,
} from "../../components";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb mainTitle="Hot Events" page="Events" />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <EventCard active={true} data={allEvents && allEvents[0]} />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
