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
