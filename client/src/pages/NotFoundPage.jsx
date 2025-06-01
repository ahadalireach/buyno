import { useNavigate } from "react-router-dom";
import { img404 } from "../assets";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img src={img404} alt="404" className="w-60 md:w-80 mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
        That Page Can’t be found!
      </h2>
      <p className="text-gray-500 mb-8 text-center">
        It looks like nothing was found at this location.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 px-8 rounded transition"
      >
        Go to Back
      </button>
    </div>
  );
};

export default NotFoundPage;
