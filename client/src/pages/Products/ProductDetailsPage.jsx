import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Footer,
  Header,
  Breadcrumb,
  ProductDetails,
  SuggestedProducts,
} from "../../components";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let found = null;
    if (eventData !== null) {
      found = allEvents && allEvents.find((i) => i._id === id);
      setData(found || null);
      if (allEvents.length && !found) {
        toast.error("Oops! The Event you're looking for is not found.");
        navigate("/");
      }
    } else {
      found = allProducts && allProducts.find((i) => i._id === id);
      setData(found || null);
      if (allProducts.length && !found) {
        toast.error("Oops! The Product you're looking for is not found.");
        navigate("/");
      }
    }
  }, [id, allProducts, allEvents, eventData, navigate]);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={data?.name || "Product"} page="Product Details" />
      <ProductDetails data={data} />
      {!eventData && data && <SuggestedProducts data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
