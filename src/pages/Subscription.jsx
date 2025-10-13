import React, { useCallback, useEffect, useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import axios from "axios";

const plans = [
  {
    name: "Free Trial",
    price: "0",
    period: "3 days free",
    features: ["Full access for 3 days", "Try all premium features", "Cancel anytime"],
    cta: "Free Trial Started",
    recommended: false,
  },
  {
    name: "Premium",
    price: "1000",
    period: "/year",
    features: ["Unlimited access", "Priority support", "Advanced integrations"],
    cta: "Subscribe",
    recommended: true,
  },
  {
    name: "Custom",
    price: "custom",
    period: "/year",
    features: ["Unlimited access", "Priority support", "Advanced integrations"],
    cta: "Subscribe",
    recommended: true,
  },
];

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve(true);
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Subscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8075/api/v1";

  useEffect(() => {
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handlePremiumSubscribe = useCallback(async () => {
    try {
      setIsLoading(true);
      // 1) Create order on backend
      const orderRes = await axios.post(`${API_BASE_URL}/payments/create-order`, {
        plan: "premium",
      }, { withCredentials: true });

      const { orderId, amount, currency, customer } = orderRes.data?.data || {};
      if (!orderId) throw new Error("Order creation failed");

      // 2) Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount?.toString(),
        currency: currency || "INR",
        name: "HRM Premium Subscription",
        description: "Premium annual subscription",
        order_id: orderId,
        prefill: {
          name: customer?.name || "",
          email: customer?.email || "",
          contact: customer?.phone || "",
        },
        theme: { color: "#0ea5e9" },
        handler: async function (response) {
          // 3) Verify payment on backend
          await axios.post(`${API_BASE_URL}/payments/verify`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }, { withCredentials: true });
          alert("Payment successful! Subscription activated.");
        },
        modal: { ondismiss: function () {} },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  return (
    <div className="min-h-[100vh] flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Choose a plan that fits your team</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Simple, transparent pricing. No hidden fees. Upgrade or cancel anytime.
        </p>

        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3 items-start">
          {plans.map((plan) => ( 
            <div 
              key={plan.name}
              className={`relative bg-white border rounded-lg shadow-sm p-6 flex flex-col justify-between ${plan.recommended ? "ring-2 ring-blue-500 border-transparent" : ""
                }`} 
            > 
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    <FaStar className="mr-2" /> Recommended
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg leading-6 font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                  {plan.price === "0" ? (
                    <span className="text-4xl">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl">₹{plan.price}</span>
                      <span className="ml-2 text-base font-medium text-gray-500">{plan.period}</span>
                    </>
                  )}
                </div>
                {plan.subNote && <p className="mt-2 text-sm text-gray-600">{plan.subNote}</p>}
                <p className="mt-4 text-sm text-gray-600">{plan.name} — choose what suits you best.</p>

                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {plan.name === "Premium" ? (
                  <button
                    onClick={handlePremiumSubscribe}
                    disabled={isLoading}
                    className={`w-full py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60`}
                  >
                    {isLoading ? "Processing..." : plan.cta}
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 rounded-md font-semibold ${plan.recommended
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      } transition-colors`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;