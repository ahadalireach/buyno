import {
  Hero,
  Header,
  Events,
  Footer,
  BestDeals,
  Sponsored,
  Categories,
  FeaturedProducts,
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
