import { logo, profilePlaceholderImg } from "../../../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag, FiUser } from "react-icons/fi";

const AdminDashboardHeader = () => {
  const { user } = useSelector((state) => state.user);

  const ordersCount = 0;
  const messagesCount = 0;

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 border-b border-gray-200">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-7 sm:h-12" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-6">
        <Link to="/dashboard/cupouns" title="Coupons">
          <AiOutlineGift
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/admin/dashboard-events" title="Events">
          <MdOutlineLocalOffer
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/admin/dashboard-products" title="Products">
          <FiShoppingBag
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
        </Link>
        <Link to="/admin/dashboard-orders" className="relative" title="Orders">
          <FiPackage
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
          <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {ordersCount}
          </span>
        </Link>
        <Link to="/user/inbox" className="relative" title="Messages">
          <BiMessageSquareDetail
            size={24}
            className="text-gray-600 hover:text-orange-500 transition"
          />
          <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {messagesCount}
          </span>
        </Link>
        <Link to="/user/profile">
          {user?.avatar ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${user?.avatar}`}
              className="w-7 h-7 rounded-full object-cover border-2 border-gray-500 bg-gray-200"
              alt="profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = profilePlaceholderImg;
              }}
            />
          ) : (
            <FiUser size={28} className="text-gray-500 hover:text-orange-500" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
