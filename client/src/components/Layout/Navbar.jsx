import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex gap-1 h-full items-center">
      {navItems &&
        navItems.map((i) => {
          const isActive = location.pathname === i.url;
          return (
            <Link
              key={i.url}
              to={i.url}
              className={`px-5 py-2 font-semibold text-base transition-all duration-200 h-full flex items-center
                ${isActive ? "text-orange-500 shadow-sm" : "text-white"}
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
