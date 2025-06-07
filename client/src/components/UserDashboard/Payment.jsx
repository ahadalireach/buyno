import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payerId,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/orders/create`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful.");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      toast.error("Card information is incomplete.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/payments/process`,
        paymentData,
        config
      );

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/orders/create`,
            order,
            config
          );

          setOpen(false);
          navigate("/order/success");
          toast.success("Order successful.");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error?.response?.data?.message || "Payment failed.");
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/orders/create`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full md:w-[400px]">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Select Payment Method
      </h2>
      <div className="space-y-4">
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border transition cursor-pointer ${
            select === 1
              ? "border-orange-500 bg-orange-50 shadow"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => setSelect(1)}
        >
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
              select === 1 ? "border-orange-500" : "border-gray-300"
            }`}
          >
            {select === 1 && (
              <span className="w-3 h-3 bg-orange-500 rounded-full block" />
            )}
          </span>
          <span className="font-semibold text-gray-800">
            Pay with Debit/Credit Card
          </span>
        </div>
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border transition cursor-pointer ${
            select === 2
              ? "border-orange-500 bg-orange-50 shadow"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => setSelect(2)}
        >
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
              select === 2 ? "border-orange-500" : "border-gray-300"
            }`}
          >
            {select === 2 && (
              <span className="w-3 h-3 bg-orange-500 rounded-full block" />
            )}
          </span>
          <span className="font-semibold text-gray-800">Pay with Paypal</span>
        </div>
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border transition cursor-pointer ${
            select === 3
              ? "border-orange-500 bg-orange-50 shadow"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => setSelect(3)}
        >
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
              select === 3 ? "border-orange-500" : "border-gray-300"
            }`}
          >
            {select === 3 && (
              <span className="w-3 h-3 bg-orange-500 rounded-full block" />
            )}
          </span>
          <span className="font-semibold text-gray-800">Cash on Delivery</span>
        </div>
      </div>

      <div className="mt-8">
        {select === 1 && (
          <form className="space-y-5" onSubmit={paymentHandler}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  Name On Card
                </label>
                <input
                  required
                  placeholder={user && user.name}
                  className="w-full h-11 px-4 text-[16px] border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 placeholder:font-normal  focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  Exp Date
                </label>
                <div className="w-full h-11 flex items-center">
                  <CardExpiryElement
                    className="w-full h-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#444",
                          "::placeholder": {
                            color: "#888",
                            fontWeight: "500",
                          },
                        },
                        invalid: {
                          color: "#f63b60",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  Card Number
                </label>
                <div className="w-full h-11 flex items-center">
                  <CardNumberElement
                    className="w-full h-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#444",
                          "::placeholder": {
                            color: "#888",
                            fontWeight: "500",
                          },
                        },
                        invalid: {
                          color: "#f63b60",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">CVV</label>
                <div className="w-full h-11 flex items-center">
                  <CardCvcElement
                    className="w-full h-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#444",
                          "::placeholder": {
                            color: "#888",
                            fontWeight: "500",
                          },
                        },
                        invalid: {
                          color: "#f63b60",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition"
            >
              Submit
            </button>
          </form>
        )}

        {select === 2 && (
          <div className="w-full flex flex-col gap-4">
            <button
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition"
              onClick={() => setOpen(true)}
            >
              Pay Now
            </button>

            {open && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-orange-500"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 size={24} />
                  </button>
                  <PayPalScriptProvider
                    options={{
                      "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}

        {select === 3 && (
          <form className="w-full mt-2" onSubmit={cashOnDeliveryHandler}>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="bg-white rounded-2xl shadow-lg pb-2 pt-8 pl-8 pr-8">
      <div className="flex justify-between mb-3">
        <span className="text-base font-medium text-gray-700">Subtotal:</span>
        <span className="text-lg font-bold text-gray-900">
          ${orderData?.subTotalPrice}
        </span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-base font-medium text-gray-700">Shipping:</span>
        <span className="text-lg font-bold text-gray-900">${shipping}</span>
      </div>
      <div className="flex justify-between border-b pb-3 mb-3">
        <span className="text-base font-medium text-gray-700">Discount:</span>
        <span className="text-lg font-bold text-green-600">
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "$0"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">Total:</span>
        <span className="text-2xl font-bold text-orange-500">
          ${orderData?.totalPrice}
        </span>
      </div>
      <br />
    </div>
  );
};

export default Payment;
