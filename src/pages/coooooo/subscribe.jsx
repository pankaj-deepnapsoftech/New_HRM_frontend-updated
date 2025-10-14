import React from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
    price: "2000",
    period: "/year",
    features: ["Unlimited access", "Priority support", "Advanced integrations"],
    cta: "Subscribe",
    recommended: true,
  },
];

const Subscription = () => {
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
              className={`relative bg-white border rounded-lg shadow-sm p-6 flex flex-col justify-between ${
                plan.recommended ? "ring-2 ring-blue-500 border-transparent" : ""
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
                {plan.name === "Premium" || plan.name === "Free Trial" ? (
                  <Link to="/sign-in">
                    <button
                      className={`w-full py-2 rounded-md font-semibold ${
                        plan.recommended
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      {plan.cta}
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`w-full py-2 rounded-md font-semibold ${
                      plan.recommended
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    } transitio n-colors`}
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