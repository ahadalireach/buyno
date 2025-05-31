import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { logo } from "../../assets";
import DropDown from "./DropDown";
import Navbar from "./Navbar";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const categoriesRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setDropDown(false);
      }
    }
    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchData(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-[95%] sm:w-11/12 mx-auto border-b border-gray-300 bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between py-6 px-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative w-[300px]" ref={searchRef}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-lg py-2 pl-5 pr-12 text-base focus:outline-none focus:border-orange-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <AiOutlineSearch size={20} />
              </button>
              {searchData && searchData.length !== 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded z-10 max-h-60 overflow-y-auto">
                  {searchData.map((i) => (
                    <Link
                      to={`/product/${i._id}`}
                      key={i._id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src={i.images[0]?.url}
                        alt={i.name}
                        className="w-8 h-8 mr-3 rounded"
                      />
                      <span className="text-gray-800">{i.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Wishlist */}
            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <Link to="/wishlist" className="relative">
              <AiOutlineHeart
                size={22}
                className="text-gray-500 cursor-pointer"
              />
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {/* Cart */}
            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <Link to="/cart" className="relative">
              <RiShoppingCartLine size={22} className="text-gray-500" />
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {/* Profile */}
            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <div>
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_NON_API_URL}${
                      user?.avatar?.startsWith("/")
                        ? user.avatar
                        : "/" + user.avatar
                    }`}
                    className="w-7 h-7 rounded-full object-cover"
                    alt="profile"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={22} className="text-gray-500" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          active ? "shadow-sm z-10" : ""
        } transition hidden 800px:flex items-center w-full bg-[#393c41] h-[60px]`}
      >
        <div className="w-[95%] sm:w-11/12 mx-auto flex justify-between items-center h-full px-2">
          <div
            ref={categoriesRef}
            className="relative h-[60px] w-[220px] flex items-center"
            style={{ zIndex: 20 }}
          >
            <button
              className="h-full w-full flex justify-between items-center pl-8 pr-4 bg-orange-500 text-white font-sans text-base font-medium select-none"
              onClick={() => setDropDown((prev) => !prev)}
              type="button"
            >
              <span className="flex items-center">All Categories</span>
              <IoIosArrowDown
                size={18}
                className="ml-2 text-white cursor-pointer"
              />
            </button>
            {dropDown && (
              <div className="absolute left-0 top-full w-full">
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Header;
