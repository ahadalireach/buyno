import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const RegisterSeller = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", avatar);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("zipCode", zipCode);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/register`,
        formData,
        config
      );

      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setPhoneNumber("");
      setAddress("");
      setZipCode("");
      setAvatarPreview(null);
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-base font-semibold text-gray-900 mb-1"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full border border-gray-300"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-2 bg-orange-600 hover:bg-gray-800 text-white rounded-md font-semibold tracking-wide transition flex items-center justify-center`}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            <div className="flex gap-4 mt-4">
              <Link
                to="/seller/login"
                className="w-full py-2 bg-gray-300 text-black text-base text-center rounded-md font-semibold hover:bg-gray-800 hover:text-white transition"
              >
                Already have a registered shop?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;
