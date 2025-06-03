import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineLogin,
} from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const sidebarItems = [
  { key: 1, label: "Dashboard", icon: RxDashboard, route: "/seller/dashboard" },
  {
    key: 2,
    label: "All Orders",
    icon: FiShoppingBag,
    route: "/dashboard-orders",
  },
  {
    key: 3,
    label: "All Products",
    icon: FiPackage,
    route: "/seller/dashboard-products",
  },
  {
    key: 4,
    label: "Add Product",
    icon: AiOutlineFolderAdd,
    route: "/seller/dashboard-create-product",
  },
  {
    key: 5,
    label: "All Events",
    icon: MdOutlineLocalOffer,
    route: "/seller/dashboard-events",
  },
  {
    key: 6,
    label: "Create Event",
    icon: VscNewFile,
    route: "/seller/dashboard-create-event",
  },
  {
    key: 7,
    label: "Withdraw Money",
    icon: CiMoneyBill,
    route: "/dashboard-withdraw-money",
  },
  {
    key: 8,
    label: "Shop Inbox",
    icon: BiMessageSquareDetail,
    route: "/dashboard-messages",
  },
  {
    key: 9,
    label: "Discount Codes",
    icon: AiOutlineGift,
    route: "/dashboard-coupouns",
  },
  {
    key: 10,
    label: "Refunds",
    icon: HiOutlineReceiptRefund,
    route: "/seller/dashboard-refunds",
  },
  { key: 11, label: "Settings", icon: CiSettings, route: "/seller/settings" },
];

const DashboardSideBar = ({ active }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shop/logout`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-2 pt-4 md:p-4 md:pt-8 my-10">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <Link to={item.route} key={item.key}>
            <div
              className={`flex items-center gap-3 cursor-pointer w-full mb-2 md:mb-4 px-2 md:px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-orange-50 text-orange-500 font-semibold shadow"
                    : "hover:bg-orange-50"
                }
              `}
            >
              <Icon size={22} color={isActive ? "#FF7D1A" : "#888"} />
              <span
                className={`
                  pl-1
                  hidden md:inline
                  ${isActive ? "text-orange-500" : "text-gray-700"}
                `}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}

      <div
        className={`flex items-center gap-3 cursor-pointer w-full mb-2 px-2 md:px-3 py-2 rounded-lg transition
          hover:bg-orange-50
        `}
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={22} color="#888" />
        <span
          className={`
            pl-1
            hidden md:inline
            text-gray-700
          `}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default DashboardSideBar;
