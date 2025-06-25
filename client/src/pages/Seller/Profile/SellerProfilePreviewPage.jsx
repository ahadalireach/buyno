import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSellerProducts } from "../../../redux/actions/product";
import {
  Breadcrumb,
  SellerProfileData,
  SellerProfileSideBar,
  Footer,
  Header,
  Loader,
} from "../../../components";
import axios from "axios";

const SellerProfilePreviewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sellerData, setSellerData] = useState({});
  const [sellerExists, setSellerExists] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    // Fetch seller data and products
    Promise.all([
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/sellers/info/${id}`),
      dispatch(getAllSellerProducts(id)),
    ])
      .then(([sellerResponse]) => {
        if (!sellerResponse.data.seller) {
          setSellerExists(false);
          toast.error(
            "Oops! The Seller Profile you're looking for is not found."
          );
          navigate("/");
        } else {
          setSellerData(sellerResponse.data.seller);
          setSellerExists(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSellerExists(false);
        toast.error(
          "Oops! The Seller Profile you're looking for is not found."
        );
        navigate("/");
        setIsLoading(false);
      });
  }, [dispatch, id, navigate]);

  if (!sellerExists) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Seller Profile" page="Profile" />
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row py-6 lg:py-10 gap-6 lg:gap-0 justify-between">
        <div className="w-full lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm lg:overflow-y-scroll lg:h-[90vh] lg:sticky lg:top-10 lg:left-0 lg:z-10">
          <SellerProfileSideBar isOwner={false} sellerData={sellerData} />
        </div>
        <div className="w-full lg:w-[72%] rounded-[4px]">
          <SellerProfileData isOwner={false} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfilePreviewPage;
