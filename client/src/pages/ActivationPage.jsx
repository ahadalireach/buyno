import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/user/activation`,
            { activation_token }
          );
        } catch (error) {
          setError(true);
          console.log("Activation failed:", error.response?.data.message);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-lg rounded-sm flex flex-col items-center">
          <div className="mb-6">
            <svg
              className={`mx-auto h-16 w-16 ${
                error ? "text-red-400" : "text-green-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {error ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 uppercase">
            {error ? "Activation Failed" : "Account Activated"}
          </h2>
          <p className="text-base text-gray-700 text-center">
            {error
              ? "Your token is expired!"
              : "Your account has been created successfully!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
