import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  SellerDashboardHeader,
  Footer,
  SellerProfileData,
  SellerProfileSideBar,
} from "../../../components";

const SellerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (seller?._id !== id) {
      toast.error("You can only manage your own profile.");
      navigate(`/seller/${seller?._id}`);
    }
  }, [seller, id, navigate]);

  if (seller?._id !== id) {
    return null;
  }

  return (
    <>
      <SellerDashboardHeader />
      <Breadcrumb mainTitle="Your Seller Profile" page="Profile" />
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row py-6 lg:py-10 gap-6 lg:gap-0 justify-between">
        <div className="w-full lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm lg:overflow-y-scroll lg:h-[90vh] lg:sticky lg:top-10 lg:left-0 lg:z-10">
          <SellerProfileSideBar isOwner={true} />
        </div>
        <div className="w-full lg:w-[72%] rounded-[4px]">
          <SellerProfileData isOwner={true} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfilePage;
