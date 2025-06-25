import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Hero,
  Header,
  HotEvent,
  Footer,
  BestDeals,
  Brands,
  Categories,
  FeaturedProducts,
  Loader,
} from "../../components";

const HomePage = () => {
  const { isLoading: productsLoading } = useSelector((state) => state.products);
  const { isLoading: eventsLoading } = useSelector((state) => state.events);

  const isPageLoading = productsLoading || eventsLoading;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      {isPageLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <BestDeals />
          <HotEvent />
          <FeaturedProducts />
        </div>
      )}
      <Brands />
      <Footer />
    </>
  );
};

export default HomePage;
