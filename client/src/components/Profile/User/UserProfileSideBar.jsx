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
  { key: 4, label: "Inbox", icon: AiOutlineMessage, route: "/inbox" },
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
    <div className="w-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm p-2 pt-4 md:p-4 md:pt-8">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <div
            key={item.key}
            className={`flex items-center gap-3 cursor-pointer w-full mb-2 md:mb-4 px-2 md:px-3 py-2 rounded-sm transition
                ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
              `}
            onClick={() => {
              setActive(item.key);
              if (item.route) navigate(item.route);
            }}
          >
            <Icon
              size={22}
              className={isActive ? "text-gray-800" : "text-gray-500"}
            />
            <span
              className={`
                pl-1
                hidden md:inline
                ${isActive ? "text-gray-800" : "text-gray-500"}
              `}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className={`flex items-center gap-3 cursor-pointer w-full mb-2 md:mb-4 px-2 md:px-3 py-2 rounded-lg transition
              ${
                active === 8
                  ? "bg-orange-50 text-orange-500 font-semibold shadow"
                  : "hover:bg-orange-50"
              }
            `}
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={22}
              color={active === 8 ? "#FF7D1A" : "#888"}
            />
            <span
              className={`
                pl-1
                hidden md:inline
                ${active === 8 ? "text-orange-500" : "text-gray-700"}
              `}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      <div
        className={`flex items-center gap-3 cursor-pointer w-full mb-2 px-2 md:px-3 py-2 rounded-lg transition
          ${
            active === 9
              ? "bg-orange-50 text-orange-500 font-semibold shadow"
              : "hover:bg-orange-50"
          }
        `}
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={22} color={active === 9 ? "#FF7D1A" : "#888"} />
        <span
          className={`
            pl-1
            hidden md:inline
            ${active === 9 ? "text-orange-500" : "text-gray-700"}
          `}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default UserSideBar;
