import { useSelector } from "react-redux";
import {
  Breadcrumb,
  DashboardHeader,
  Footer,
  SellerProfileData,
  SellerProfileSideBar,
} from "../../components";
import { useParams } from "react-router-dom";
import NotFoundPage from "../Misc/NotFoundPage";

const SellerProfilePage = () => {
  const { id } = useParams();
  const { seller } = useSelector((state) => state.seller);

  if (seller?._id !== id) {
    return <NotFoundPage />;
  }

  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Your Seller Profile" page="Profile" />
      <div className="w-11/12 mx-auto flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <SellerProfileSideBar isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <SellerProfileData isOwner={true} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfilePage;
