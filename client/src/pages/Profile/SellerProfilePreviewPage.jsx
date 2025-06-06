import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSellerProducts } from "../../redux/actions/product";
import {
  DashboardHeader,
  Breadcrumb,
  SellerProfileData,
  SellerProfileSideBar,
  Footer,
} from "../../components";
import axios from "axios";

const SellerProfilePreviewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellerExists, setSellerExists] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sellers/info/${id}`)
      .then((res) => {
        if (!res.data.seller) {
          setSellerExists(false);
          toast.error(
            "Oops! The Seller Profile you're looking for is not found."
          );
          navigate("/");
        } else {
          setSellerExists(true);
          dispatch(getAllSellerProducts(id));
        }
      })
      .catch(() => {
        setSellerExists(false);
        toast.error(
          "Oops! The Seller Profile you're looking for is not found."
        );
        navigate("/");
      });
  }, [dispatch, id, navigate]);

  if (!sellerExists) return null;

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Seller Profile" page="Profile" />
      <div className="w-11/12 mx-auto flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <SellerProfileSideBar isOwner={false} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <SellerProfileData isOwner={false} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfilePreviewPage;
