import {
  BestDeals,
  Categories,
  FeaturedProducts,
  Header,
  Hero,
  Events,
  Sponsored,
  Footer,
} from "../components";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
