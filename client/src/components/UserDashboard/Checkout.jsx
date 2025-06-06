import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState(null);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.05;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/couponCodes/value/${name}`)
      .then((res) => {
        const sellerId = res.data.couponCode?.sellerId;
        const couponCodeValue = res.data.couponCode?.value;

        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter((item) => item.sellerId === sellerId);

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this seller products.");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );
            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }
        if (res.data.couponCode === null) {
          toast.error("Coupon code doesn't exists.");
          setCouponCode("");
        }
      });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full md:w-[400px]">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
          <button
            className="w-full mt-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition flex items-center justify-center"
            onClick={paymentSubmit}
          >
            Go to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelect = (item, idx) => {
    setSelectedAddress(idx);
    setAddress1(item.address1);
    setAddress2(item.address2);
    setZipCode(item.zipCode);
    setCountry(item.country);
    setCity(item.city);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Shipping Address
      </h2>
      <form className="space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user && user.name}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={user && user.email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Country</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose your country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">City</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Choose your City</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Address 1
            </label>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Address 2
            </label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
            />
          </div>
        </div>
      </form>
      <button
        className="mt-6 text-orange-500 hover:underline font-semibold text-base"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From Saved Address
      </button>
      {userInfo && (
        <div className="mt-3 space-y-2">
          {user &&
            user.addresses.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="saved-address"
                  className="accent-orange-500"
                  checked={selectedAddress === index}
                  onChange={() => handleAddressSelect(item, index)}
                />
                <span className="font-medium text-gray-700">
                  {item.addressType}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex justify-between mb-3">
        <span className="text-base font-medium text-gray-700">Subtotal:</span>
        <span className="text-lg font-bold text-gray-900">
          ${subTotalPrice}
        </span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-base font-medium text-gray-700">Shipping:</span>
        <span className="text-lg font-bold text-gray-900">
          ${shipping.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between border-b pb-3 mb-3">
        <span className="text-base font-medium text-gray-700">Discount:</span>
        <span className="text-lg font-bold text-green-600">
          -{discountPercentenge ? "$" + discountPercentenge.toString() : "$0"}
        </span>
      </div>
      <div className="flex justify-between items-center pt-2 mb-6">
        <span className="text-lg font-semibold text-gray-900">Total:</span>
        <span className="text-2xl font-bold text-orange-500">
          ${totalPrice}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold text-base transition"
          type="submit"
        >
          Apply Code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
