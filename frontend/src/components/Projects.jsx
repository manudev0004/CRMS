import React from "react";

const Projects = () => {
  const projects = [
    {
      name: "Cloud Migration Project",
      description:
        "A comprehensive migration project to transition on-premise resources to the cloud. Includes data transfer, application rehosting, and optimization.",
      status: "In Progress",
      manager: "John Doe",
    },
    {
      name: "AI Infrastructure Setup",
      description:
        "Building scalable infrastructure for AI workloads, including GPU provisioning and data pipeline setup.",
      status: "Completed",
      manager: "Sarah Smith",
    },
    {
      name: "Disaster Recovery Planning",
      description:
        "Implementing robust disaster recovery solutions with automated backups and high availability architecture.",
      status: "Not Started",
      manager: "James Carter",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Projects</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          View and manage your projects. Track progress, assign responsibilities, and review outcomes.
        </p>
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg mb-6 p-6 flex flex-col md:flex-row items-start md:items-center"
          >
            <div className="md:flex-1">
              <h2 className="text-2xl font-semibold">{project.name}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
            <div className="md:flex-none mt-4 md:mt-0 md:ml-6 text-center">
              <p className="text-sm font-medium">Status: {project.status}</p>
              <p className="text-sm text-gray-500">Manager: {project.manager}</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
