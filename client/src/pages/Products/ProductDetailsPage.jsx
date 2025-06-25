import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Footer,
  Header,
  Loader,
  Breadcrumb,
  ProductDetails,
  SuggestedProducts,
} from "../../components";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const { allEvents } = useSelector((state) => state.events);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);

    let found = null;

    if (eventData !== null) {
      if (Array.isArray(allEvents) && allEvents.length > 0) {
        found = allEvents.find((i) => i._id === id);
        if (!found) {
          toast.error("Oops! The Event you're looking for is not found.");
          navigate("/");
          return;
        }
      }
    } else {
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        found = allProducts.find((i) => i._id === id);
        if (!found) {
          toast.error("Oops! The Product you're looking for is not found.");
          navigate("/");
          return;
        }
      }
    }

    setData(found || null);
    setLoading(false);
  }, [id, allProducts, allEvents, eventData, navigate]);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Product Details" page="Product" />

      {loading ? (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {data && <ProductDetails data={data} />}
          {!eventData && data && <SuggestedProducts data={data} />}
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
