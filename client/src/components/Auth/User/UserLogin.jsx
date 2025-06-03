import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("User Loggedin successful.");
        navigate("/");
        window.location.reload(true);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-lg rounded-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Email <span className="text-orange-600">*</span>
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="abdulahad@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-900 mb-1"
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
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
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
                <span className="ml-2 block text-sm text-gray-900 font-medium">
                  Remember me
                </span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 hover:bg-gray-800 text-white text-lg rounded-md font-semibold tracking-wide transition flex items-center justify-center"
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
                {loading ? "Signing in..." : "Signin"}
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                to="/user/register"
                className="w-1/2 py-2 bg-gray-800 text-white text-base text-center rounded-md font-semibold hover:bg-gray-200 hover:text-black transition"
              >
                Create a user account
              </Link>
              <Link
                to="/user/forgot-password"
                className="w-1/2 py-2 bg-gray-200 text-gray-700 text-base text-center rounded-md font-semibold hover:bg-gray-800 hover:text-white transition"
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

export default UserLogin;
