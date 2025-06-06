import { useEffect } from "react";
import {
  Hero,
  Header,
  Events,
  Footer,
  BestDeals,
  Brands,
  Categories,
  FeaturedProducts,
} from "../../components";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Brands />
      <Footer />
    </div>
  );
};

export default HomePage;
