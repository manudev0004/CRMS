import React from "react";

const APIandServices = () => {
  const services = [
    {
      name: "Compute API",
      description:
        "Seamlessly deploy and manage virtual machines, containers, and serverless environments through our robust API.",
      useCases: [
        "Automate resource provisioning",
        "Integrate with CI/CD pipelines",
        "Dynamic scaling based on demand",
      ],
    },
    {
      name: "Storage API",
      description:
        "Efficiently manage your data with APIs for storage buckets, object lifecycle, and access policies.",
      useCases: [
        "Backup and disaster recovery",
        "Serve static content globally",
        "Real-time data analytics",
      ],
    },
    {
      name: "Networking Services",
      description:
        "Optimize your cloud network with APIs for virtual private clouds, firewalls, and DNS configurations.",
      useCases: [
        "Secure application deployment",
        "Real-time monitoring and logging",
        "Seamless hybrid cloud integration",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          APIs & Services
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Leverage our comprehensive APIs and services to build, scale, and
          optimize your cloud infrastructure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <h3 className="text-lg font-medium mb-2">Common Use Cases:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                {service.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIandServices;
