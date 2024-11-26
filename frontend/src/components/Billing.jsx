import React from "react";

const Billing = () => {
  const plans = [
    {
      name: "Free",
      price: "Free (30-day Trial)",
      features: ["5GB Cloud Storage", "Basic Support", "Limited Features"],
    },
    {
      name: "Basic",
      price: "$5/month",
      features: ["50GB Cloud Storage", "Priority Support", "Essential Features"],
    },
    {
      name: "Advanced",
      price: "$10/month",
      features: [
        "Unlimited Cloud Storage",
        "24/7 Premium Support",
        "All Features & Custom Integrations",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Billing Plans</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Choose a plan that fits your needs. All plans come with a 30-day free trial.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {plan.name}
              </h2>
              <p className="text-xl font-medium text-blue-600 text-center mb-6">
                {plan.price}
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="text-center">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
