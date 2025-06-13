import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
import { getSeller } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SellerDashboardSettings = () => {
  const dispatch = useDispatch();
  const [avatar] = useState();
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller && seller.name);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [password, setPassword] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/sellers/update-avatar`,
          { avatar: reader.result },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch(getSeller());
        toast.success("Avatar updated successfully.");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to update avatar."
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/update-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Seller info updated succesfully.");
        dispatch(getSeller());
        setPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-center w-full mb-8">
        <div className="relative">
          <img
            src={avatar ? avatar : `${seller.avatar?.url}`}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] rounded-full object-cover border-4 border-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            alt="Seller Profile"
          />
          <div className="w-8 h-8 md:w-[34px] md:h-[34px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] border-2 border-gray-400">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera className="text-gray-500 text-sm md:text-base" />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white py-6 md:py-8 px-4 md:px-6 lg:px-10 shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
          <form onSubmit={updateHandler} className="space-y-4 md:space-y-6">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Shop Description
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Shop Address
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Shop Phone Number
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Shop Zip Code
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  required
                  value={zipCode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-1">
                  Enter your password
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 md:py-3 bg-orange-500 hover:bg-gray-800 text-white cursor-pointer rounded-sm font-semibold tracking-wide transition mt-4 flex items-center justify-center"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardSettings;
