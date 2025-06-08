import { Header, Breadcrumb, Footer } from "../../components";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumb mainTitle={"Order Success"} page={"Order Success"} />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex items-center justify-center mb-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            className="w-16 h-16"
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Your order was placed successfully!
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        Thank you for shopping with us. You will receive more information about
        your order via shortly.
      </p>
      <a
        href="/"
        className="mt-4 px-8 py-3 bg-orange-500 hover:bg-gray-800 text-white rounded-sm font-semibold text-lg transition"
      >
        Continue Shopping
      </a>
    </div>
  );
};

export default OrderSuccessPage;
