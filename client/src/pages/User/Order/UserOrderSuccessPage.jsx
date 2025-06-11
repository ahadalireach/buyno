import { Header, Breadcrumb, Footer } from "../../../components";

const UserOrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumb mainTitle={"Order Success"} page={"Order"} />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-8 md:px-16 min-h-[60vh] w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            className="w-14 h-14 sm:w-16 sm:h-16"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M16 25l6 6 10-12"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
        Your order was placed successfully!
      </h2>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-8 max-w-xl">
        Thank you for shopping with us. You will receive more information about
        your order via shortly.
      </p>
      <a
        href="/"
        className="mt-4 w-full max-w-xs sm:max-w-fit px-6 py-3 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-semibold text-base sm:text-lg transition text-center"
      >
        Continue Shopping
      </a>
    </div>
  );
};

export default UserOrderSuccessPage;
