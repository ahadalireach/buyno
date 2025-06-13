import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sellers/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Login Shop successful.");
        navigate("/seller/dashboard");
        window.location.reload(true);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-800 mb-1"
              >
                Email <span className="text-orange-600">*</span>
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="customer@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-800 mb-1"
              >
                Password <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="•••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                    size={22}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                    size={22}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-800 font-medium">
                  Remember me
                </span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-orange-500 hover:bg-gray-800 text-white text-lg rounded-sm uppercase tracking-wide transition flex items-center justify-center"
              >
                Signin
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                to="/seller/register"
                className="w-1/2 py-2 bg-gray-800 text-white text-base font-semibold text-center rounded-sm uppercase hover:bg-gray-200 hover:text-black transition"
              >
                Create a account
              </Link>
              <Link
                to="/forgot-password"
                className="w-1/2 py-2 bg-gray-300 text-gray-700 text-base font-semibold text-center rounded-sm uppercase hover:bg-gray-800 hover:text-white transition"
              >
                Forget password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
