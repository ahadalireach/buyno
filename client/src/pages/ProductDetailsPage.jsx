import { useEffect, useState } from "react";
import {
  Footer,
  Header,
  Breadcrumb,
  ProductDetails,
  SuggestedProducts,
} from "../components";
import { productData } from "../static/data";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const product = productData.find((item) => item.name === productName);
    if (product) {
      setData(product);
    } else {
      setData(null);
    }
  }, [productName]);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle={data?.name} page="Product Details" />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
