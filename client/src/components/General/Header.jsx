import { useEffect, useRef, useState } from "react";
import {
  logo,
  productPlaceholderImg,
  profilePlaceholderImg,
} from "../../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesData } from "../../static/data";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import Navbar from "./Navbar";
import Cart from "../General/Cart";
import DropDown from "./DropDown";
import Wishlist from "../General/Wishlist";

const Header = () => {
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
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
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between py-4 px-4 gap-4">
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Multivendor"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden 800px:flex items-center flex-wrap gap-4">
            <div
              className="relative w-[200px] sm:w-[250px] md:w-[300px]"
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-sm py-2 pl-5 pr-12 text-base focus:outline-none focus:border-orange-500"
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
                        src={
                          i?.images &&
                          i.images[0] &&
                          `${process.env.REACT_APP_BACKEND_NON_API_URL}/${i.images[0]}`
                        }
                        alt={i.name}
                        className="w-8 h-8 mr-3 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = productPlaceholderImg;
                        }}
                      />
                      <span className="text-gray-800">{i.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <button onClick={() => setOpenWishlist(true)} className="relative">
              <AiOutlineHeart
                size={22}
                className="text-gray-500 cursor-pointer"
              />
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist && wishlist.length > 0 ? wishlist.length : 0}
              </span>
            </button>

            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <button onClick={() => setOpenCart(true)} className="relative">
              <RiShoppingCartLine size={22} className="text-gray-500" />
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart && cart.length > 0 ? cart.length : 0}
              </span>
            </button>

            <span className="h-8 border-l border-gray-300 mx-3"></span>
            <div>
              {isAuthenticated ? (
                <Link to="/user/profile">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${user?.avatar}`}
                    className="w-7 h-7 rounded-full object-cover border-2 border-gray-500"
                    alt="profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profilePlaceholderImg;
                    }}
                  />
                </Link>
              ) : (
                !isSeller && (
                  <Link to="/user/login">
                    <FiUser size={22} className="text-gray-500" />
                  </Link>
                )
              )}
            </div>

            <Link
              to={`${isSeller ? "/seller/dashboard" : "/seller/register"}`}
              className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-sm font-medium hover:bg-gray-800 transition"
            >
              {isSeller ? "Go Dashboard" : "Become Seller"}
            </Link>
          </div>

          <button
            className="800px:hidden flex items-center text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={28} />
          </button>
        </div>
      </div>

      <div
        className={`${
          active ? "shadow-sm z-10" : ""
        } transition hidden 800px:flex items-center w-full bg-gray-800 h-[60px]`}
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

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } 800px:hidden`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <img src={logo} alt="Logo" className="h-10" />
            <button
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={28} />
            </button>
          </div>
          <div className="p-4 space-y-4 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-sm py-2 pl-5 pr-12 text-base focus:outline-none focus:border-orange-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <AiOutlineSearch size={20} />
              </button>
              {searchData && searchData.length !== 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-sm z-10 max-h-60 overflow-y-auto">
                  {searchData.map((i) => (
                    <Link
                      to={`/product/${i._id}`}
                      key={i._id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${i.images[0]}`}
                        alt={i.name}
                        className="w-8 h-8 mr-3 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = productPlaceholderImg;
                        }}
                      />
                      <span className="text-gray-800">{i.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  setOpenWishlist(true);
                  setMobileMenuOpen(false);
                }}
                className="relative"
              >
                <AiOutlineHeart size={22} className="text-gray-500" />
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist && wishlist.length > 0 ? wishlist.length : 0}
                </span>
              </button>
              <button
                onClick={() => {
                  setOpenCart(true);
                  setMobileMenuOpen(false);
                }}
                className="relative"
              >
                <RiShoppingCartLine size={22} className="text-gray-500" />
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart && cart.length > 0 ? cart.length : 0}
                </span>
              </button>
              <div>
                {isAuthenticated ? (
                  <Link
                    to="/user/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${user?.avatar}`}
                      className="w-7 h-7 rounded-full object-cover border-2 border-gray-500"
                      alt="profile"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = profilePlaceholderImg;
                      }}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/user/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUser size={22} className="text-gray-500" />
                  </Link>
                )}
              </div>
              <Link
                to="/seller/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-4 p-2 bg-orange-500 text-white rounded-sm font-medium text-center hover:bg-gray-800 transition"
              >
                Become Seller
              </Link>
            </div>
            <div className="mt-6">
              <div className="rounded-sm bg-gray-800 py-2">
                <Navbar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
