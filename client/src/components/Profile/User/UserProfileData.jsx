/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { MdTrackChanges } from "react-icons/md";
import { Country, State } from "country-state-city";
import { getUser } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInfo,
} from "../../../redux/actions/user";
import axios from "axios";

const UserProfileData = ({ active }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(getUser());
      toast.success("Avatar updated successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update avatar.");
    }
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={
                  avatar ||
                  `${process.env.REACT_APP_BACKEND_NON_API_URL}${
                    user?.avatar?.startsWith("/")
                      ? user?.avatar
                      : "/" + user?.avatar
                  }` ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user?.name || "U")
                }
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-400 shadow"
                alt="profile"
              />
              <div className="w-[34px] h-[34px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] border-2 border-gray-400">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera className="text-gray-500" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                onSubmit={handleSubmit}
                aria-required={true}
                className="space-y-6"
              >
                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Enter your password
                    </label>
                    <input
                      type="password"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-md font-semibold tracking-wide transition mt-4"
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "ORD100001",
      cart: [{}, {}, {}],
      totalPrice: 249.99,
      status: "Delivered",
    },
    {
      _id: "ORD100002",
      cart: [{}, {}],
      totalPrice: 129.99,
      status: "Processing",
    },
    {
      _id: "ORD100003",
      cart: [{}],
      totalPrice: 59.99,
      status: "Shipped",
    },
  ];

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Order ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Items Qty
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 text-sm">{order._id}</td>
              <td className="px-4 py-2 text-sm">{order.status}</td>
              <td className="px-4 py-2 text-sm">{order.cart.length}</td>
              <td className="px-4 py-2 text-sm">US$ {order.totalPrice}</td>
              <td className="px-4 py-2">
                <Link to={`/user/order/${order._id}`}>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition">
                    <AiOutlineArrowRight size={18} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "ORD789012",
      cart: [{}, {}],
      totalPrice: 159.49,
      status: "Processing refund",
    },
    {
      _id: "ORD555555",
      cart: [{}, {}, {}, {}],
      totalPrice: 499.99,
      status: "Processing refund",
    },
    {
      _id: "ORD123456",
      cart: [{}, {}, {}],
      totalPrice: 299.99,
      status: "Processing",
    },
  ];

  const eligibleOrders = orders.filter(
    (item) => item.status === "Processing refund"
  );

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Order ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Items Qty
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {eligibleOrders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 text-sm">{order._id}</td>
              <td className="px-4 py-2 text-sm">{order.status}</td>
              <td className="px-4 py-2 text-sm">{order.cart.length}</td>
              <td className="px-4 py-2 text-sm">US$ {order.totalPrice}</td>
              <td className="px-4 py-2">
                <Link to={`/user/order/${order._id}`}>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition">
                    <AiOutlineArrowRight size={18} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "ORD123456",
      cart: [{}, {}, {}],
      totalPrice: 299.99,
      status: "Processing",
    },
    {
      _id: "ORD654321",
      cart: [{}],
      totalPrice: 99.99,
      status: "Delivered",
    },
    {
      _id: "ORD789012",
      cart: [{}, {}],
      totalPrice: 159.49,
      status: "Processing refund",
    },
  ];

  return (
    <div className="w-full px-2 md:px-10 pt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Order ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Items Qty
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 text-sm">{order._id}</td>
              <td className="px-4 py-2 text-sm">{order.status}</td>
              <td className="px-4 py-2 text-sm">{order.cart.length}</td>
              <td className="px-4 py-2 text-sm">US$ {order.totalPrice}</td>
              <td className="px-4 py-2">
                <Link to={`/user/track/order/${order._id}`}>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition">
                    <MdTrackChanges size={18} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8">
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6">
          Change Password
        </h1>
        <form onSubmit={passwordChangeHandler} className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-1">
              Enter your old password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-1">
              Enter your new password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-1">
              Confirm your new password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-md font-semibold tracking-wide transition mt-4"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[35rem] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-y-scroll max-h-[90vh]">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer text-gray-500 hover:text-orange-500"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Address Type
                    </label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className="w-full py-2 bg-orange-500 hover:bg-gray-600 text-white rounded-md font-semibold tracking-wide transition mt-4 cursor-pointer"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-[25px] font-[600] text-gray-800 pb-2">
          My Addresses
        </h1>
        <div
          className="bg-orange-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white min-h-[70px] rounded-lg flex items-center px-3 shadow justify-between pr-10 mb-5 border border-orange-100"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold text-orange-500">
                {item.addressType}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[13px] text-gray-700">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[13px] text-gray-700">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={22}
                className="cursor-pointer text-gray-400 hover:text-orange-500 transition"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px] text-gray-400">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default UserProfileData;
