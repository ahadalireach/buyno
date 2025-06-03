import { Header, Footer, Breadcrumb, EventCard } from "../../components";

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb mainTitle="Upcoming Events" page="Events" />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Hot Events
        </h1>
        <EventCard active={true} />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
