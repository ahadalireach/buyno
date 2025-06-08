import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLogin } from "react-icons/ai";
import { sidebarItems } from "../../static/data";
import axios from "axios";

const DashboardSideBar = ({ active }) => {
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
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-2 pt-4 md:p-4 md:pt-8 my-10">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <Link to={item.route} key={item.key}>
            <div
              className={`flex items-center gap-3 cursor-pointer w-full mb-2 md:mb-4 px-2 md:px-3 py-2 rounded-sm transition
          ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
        `}
            >
              <Icon
                size={22}
                className={`${isActive ? "text-gray-800" : "text-gray-500"}`}
              />
              <span
                className={`
            pl-1 hidden md:inline
            ${isActive ? "text-gray-800" : "text-gray-500"}
          `}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}

      <div
        className="flex items-center gap-3 cursor-pointer w-full mb-2 px-2 md:px-3 py-2 rounded-sm transition hover:bg-gray-50"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={22} className="text-gray-500" />
        <span className="pl-1 hidden md:inline text-gray-500">Log out</span>
      </div>
    </div>
  );
};

export default DashboardSideBar;
