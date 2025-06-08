import { logo } from "../../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag, FiUser } from "react-icons/fi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  const ordersCount = 0;
  const messagesCount = 0;

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 border-b border-gray-200">
      <Link to="/seller/dashboard">
        <img src={logo} alt="Logo" className="h-7 sm:h-12" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-6">
        <Link to="/seller/dashboard-coupon-codes" title="Coupons">
          <AiOutlineGift
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/seller/dashboard-events" title="Events">
          <MdOutlineLocalOffer
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/seller/dashboard-products" title="Products">
          <FiShoppingBag
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/seller/dashboard-orders" className="relative" title="Orders">
          <FiPackage
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
          <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {ordersCount}
          </span>
        </Link>
        <Link to="/dashboard-messages" className="relative" title="Messages">
          <BiMessageSquareDetail
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
          <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {messagesCount}
          </span>
        </Link>
        <Link to={`/seller/${seller?._id}`}>
          {seller?.avatar?.url ? (
            <img
              src={seller.avatar.url}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <FiUser size={28} className="text-gray-500 hover:text-orange-500" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
