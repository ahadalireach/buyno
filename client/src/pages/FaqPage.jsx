import { useState } from "react";
import { Header, Footer, Breadcrumb } from "../components";
const FAQS = [
  {
    question: "What is your return policy?",
    answer:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only offer shipping within the United States.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, PayPal payment method also we have cash on delivery system.",
  },
];

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (idx) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <div>
      <Header />
      <Breadcrumb mainTitle="Frequently Asked Questions" page="FAQ" />
      <div className={`w-11/12 mx-auto my-12`}>
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  className={`flex items-center justify-between w-full text-left focus:outline-none transition-colors ${
                    activeTab === idx
                      ? "text-orange-600"
                      : "text-gray-900 hover:text-orange-500"
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
                    {/* Plus/close icon */}
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
