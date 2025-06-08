import { useEffect, useState } from "react";
import { FaqData } from "../../static/data";
import { Header, Footer, Breadcrumb } from "../../components";

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTab = (idx) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <div>
      <Header />
      <Breadcrumb mainTitle="Commonly Asked Questions" page="FAQ" />
      <div className={`w-11/12 mx-auto my-12`}>
        <div className="max-w-2xl mx-auto rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] p-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {FaqData.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  className={`flex items-center justify-between w-full text-left focus:outline-none transition-colors ${
                    activeTab === idx
                      ? "text-orange-600"
                      : "text-gray-800 hover:text-orange-500"
                  }`}
                  onClick={() => toggleTab(idx)}
                  aria-expanded={activeTab === idx}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <span
                    className={`transition-transform duration-300 ${
                      activeTab === idx
                        ? "rotate-45 text-orange-500"
                        : "rotate-0"
                    }`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeTab === idx ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  {activeTab === idx && (
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
