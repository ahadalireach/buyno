import { navItems } from "../../static/data";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex gap-1 h-full items-center 800px:flex-row flex-col">
      {navItems &&
        navItems.map((i) => {
          const isActive = location.pathname === i.url;
          return (
            <Link
              key={i.url}
              to={i.url}
              className={`px-5 py-2 font-semibold text-base transition-all hover:text-orange-400 duration-200 h-full flex items-center
                ${
                  isActive
                    ? "text-orange-500 shadow-sm"
                    : "text-gray-800 800px:text-white"
                }
              `}
              style={{ borderRadius: "10px 10px 0 0" }}
            >
              {i.title}
            </Link>
          );
        })}
    </nav>
  );
};

export default Navbar;
