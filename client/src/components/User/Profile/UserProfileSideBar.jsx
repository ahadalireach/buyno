import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import axios from "axios";

const sidebarItems = [
  { key: 1, label: "Profile", icon: RxPerson },
  { key: 2, label: "Orders", icon: HiOutlineShoppingBag },
  { key: 3, label: "Refunds", icon: HiOutlineReceiptRefund },
  { key: 4, label: "Inbox", icon: AiOutlineMessage, route: "/user/inbox" },
  { key: 5, label: "Track Order", icon: MdOutlineTrackChanges },
  { key: 6, label: "Change Password", icon: RiLockPasswordLine },
  { key: 7, label: "Address", icon: TbAddressBook },
];

const UserSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-3 lg:p-4 lg:pt-8 gap-2 lg:gap-0">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <div
              key={item.key}
              className={`flex items-center gap-3 cursor-pointer mb-0 lg:mb-4 px-3 py-2 rounded-sm transition whitespace-nowrap lg:whitespace-normal min-w-max lg:min-w-0 flex-shrink-0 lg:flex-shrink
                ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
              `}
              onClick={() => {
                setActive(item.key);
                if (item.route) navigate(item.route);
              }}
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
          );
        })}

        {user && user?.role === "Admin" && (
          <div
            className={`flex items-center gap-3 cursor-pointer mb-0 lg:mb-4 px-3 py-2 rounded-sm transition whitespace-nowrap lg:whitespace-normal min-w-max lg:min-w-0 flex-shrink-0 lg:flex-shrink
              ${active === 8 ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
            `}
            onClick={() => {
              setActive(8);
              navigate("/admin/dashboard");
            }}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              className={`flex-shrink-0 ${
                active === 8 ? "text-gray-800" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm lg:text-base ${
                active === 8 ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Admin Dashboard
            </span>
          </div>
        )}

        <div
          className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-sm transition whitespace-nowrap lg:whitespace-normal min-w-max lg:min-w-0 flex-shrink-0 lg:flex-shrink
            ${active === 9 ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
          `}
          onClick={() => {
            setActive(9);
            logoutHandler();
          }}
        >
          <AiOutlineLogin
            size={20}
            className={`flex-shrink-0 ${
              active === 9 ? "text-gray-800" : "text-gray-500"
            }`}
          />
          <span
            className={`text-sm lg:text-base ${
              active === 9 ? "text-gray-800" : "text-gray-500"
            }`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
