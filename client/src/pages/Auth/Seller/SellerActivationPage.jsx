/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/sellers/activate`,
            { activation_token }
          );
        } catch (error) {
          setError(true);
          console.log("Activation failed:", error);
        }
      };
      activationEmail();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.36, 1.01, 0.32, 1] }}
      >
        <motion.div
          className="bg-white py-10 px-8 shadow-2xl rounded-xl flex flex-col items-center border border-orange-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <svg
              className={`mx-auto h-20 w-20 ${
                error ? "text-red-400" : "text-green-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {error ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </svg>
          </motion.div>
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 text-center mb-3 uppercase tracking-wide drop-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {error ? "Activation Failed" : "Seller Account Activated"}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 text-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            {error
              ? "Your token is expired!"
              : "Your seller account has been created successfully!"}
          </motion.p>
          {!error && (
            <motion.a
              href="/seller/login"
              className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold shadow hover:bg-orange-600 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Go to Login
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SellerActivationPage;
