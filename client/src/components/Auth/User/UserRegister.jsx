import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, or JPEG files are allowed.");
      return;
    }

    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", avatar);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        formData,
        config
      );

      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setAvatarPreview(null);
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-base font-semibold text-gray-800 mb-1"
              >
                Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="abdulahad"
                className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-800 mb-1"
              >
                Email <span className="text-orange-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="abdulahad@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
              />
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

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar preview"
                      className="h-full w-full object-cover rounded-full border border-gray-300"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-semibold tracking-wide transition flex items-center justify-center`}
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
                to="/user/login"
                className="w-full py-2 bg-gray-300 text-black text-base text-center rounded-sm font-semibold hover:bg-gray-800 hover:text-white transition"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
