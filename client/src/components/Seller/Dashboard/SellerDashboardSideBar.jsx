import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLogin } from "react-icons/ai";
import { sellerSidebarItems } from "../../../static/data";
import axios from "axios";

const SellerDashboardSideBar = ({ active }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/logout`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="w-full shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm bg-white">
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-3 lg:p-4 lg:pt-8 gap-2 lg:gap-0">
        {sellerSidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <Link
              to={item.route}
              key={item.key}
              className="flex-shrink-0 lg:flex-shrink"
            >
              <div
                className={`flex items-center gap-3 cursor-pointer mb-0 lg:mb-4 px-3 py-2 rounded-sm transition whitespace-nowrap lg:whitespace-normal min-w-max lg:min-w-0
                  ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive ? "text-gray-800" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm lg:text-base ${
                    isActive ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}

        <div
          className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-sm transition hover:bg-gray-50 whitespace-nowrap lg:whitespace-normal min-w-max lg:min-w-0 flex-shrink-0 lg:flex-shrink"
          onClick={logoutHandler}
        >
          <AiOutlineLogin size={20} className="text-gray-500 flex-shrink-0" />
          <span className="text-gray-500 text-sm lg:text-base">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardSideBar;
