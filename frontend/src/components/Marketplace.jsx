import React from "react";

const Products = () => {
  const products = [
    {
      name: "Cloud Storage",
      description:
        "Scalable and secure cloud storage solutions to manage your data efficiently. Designed for high availability and durability.",
      features: [
        "Unlimited scalability",
        "Global access with low latency",
        "Multi-layered security",
      ],
    },
    {
      name: "Virtual Machines",
      description:
        "Provision and manage virtual machines effortlessly. Ideal for running applications, testing environments, or hosting services.",
      features: [
        "Custom configurations",
        "Supports all major OS platforms",
        "99.99% uptime guarantee",
      ],
    },
    {
      name: "Database Services",
      description:
        "Fully managed relational and NoSQL databases to meet your application's needs. Highly reliable and scalable.",
      features: [
        "Automated backups",
        "High-performance query execution",
        "Flexible pricing tiers",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Products</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Explore our cutting-edge solutions designed to empower your cloud
          infrastructure and optimize resource management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <h3 className="text-lg font-medium mb-2">Key Features:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
