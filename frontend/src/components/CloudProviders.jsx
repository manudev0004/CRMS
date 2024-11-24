import React from "react";
import Sidebar from "./Sidebar";

const CloudProviders = () => {
  const providers = [
    {
      name: "Amazon Web Services",
      status: "Connected",
      date: "12/31/2022",
    },
    {
      name: "Google Cloud Platform",
      status: "Not Connected",
      date: null,
    },
    {
      name: "Microsoft Azure",
      status: "Not Connected",
      date: null,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Connect your cloud providers
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="p-6 bg-gray-200 rounded-lg shadow-md text-center"
            >
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p
                className={`mt-2 ${
                  provider.status === "Connected"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {provider.status}
              </p>
              {provider.date && (
                <p className="mt-1 text-gray-600">Connected: {provider.date}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudProviders;
