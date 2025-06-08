import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = () => {
  return (
    <nav className="flex gap-1 h-full items-center 800px:flex-row flex-col">
      {navItems &&
        navItems.map((i) => {
          return (
            <Link
              key={i.url}
              to={i.url}
              className="px-5 py-2 font-semibold text-white transition-all hover:text-orange-400 duration-200 h-full flex items-center"
            >
              {i.title}
            </Link>
          );
        })}
    </nav>
  );
};

export default Navbar;
