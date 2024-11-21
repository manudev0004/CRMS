import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Server,
  Network,
  Database,
  Shield,
  Users,
} from "lucide-react";

const iconMap = {
  Cpu,
  MemoryStick,
  HardDrive,
  Server,
  Network,
  Database,
  Shield,
  Users,
};

const MetricCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md">
      <Icon size={40} className="mb-4 mx-auto" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-200">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null); // Start with null for better control

  useEffect(() => {
    const fetchMetrics = () => {
      axios
        .get("http://127.0.0.1:8000/api/live-metrics/")
        .then((response) => {
          console.log("API Response:", response.data); // Log the response
          setMetrics(response.data); // Set the whole object as state
        })
        .catch((error) => {
          console.error("Error fetching live metrics:", error);
        });
    };

    fetchMetrics(); // Fetch data on load
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  // If metrics are not available, display a message
  if (!metrics) {
    return <p className="text-center text-lg text-gray-600">Loading metrics...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome User!</h1>
        <p className="text-xl text-gray-600 mb-10">
          View and manage your cloud resources
        </p>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-12">
          <img
            src="dashboard_banner.png"
            alt="Cloud Resources"
            className="w-full h-66 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <MetricCard
            icon={iconMap.Cpu}
            title="CPU"
            value={`${metrics.cpu} usage`}
          />
          <MetricCard
            icon={iconMap.MemoryStick}
            title="Memory"
            value={`${metrics.memory} used`}
          />
          <MetricCard
            icon={iconMap.HardDrive}
            title="Disk"
            value={`Used: ${metrics.disk.used} | Free: ${metrics.disk.free}`}
          />
          <MetricCard
            icon={iconMap.Server}
            title="Uptime"
            value={metrics.uptime}
          />
          <MetricCard
            icon={iconMap.Network}
            title="Bandwidth"
            value={`Sent: ${metrics.bandwidth.sent} | Received: ${metrics.bandwidth.recv}`}
          />
          {/* New Cards for Databases, Instances, Firewall, and Users */}
          <MetricCard
            icon={iconMap.Database}
            title="Databases"
            value={`${metrics.databases} databases`}
          />
          <MetricCard
            icon={iconMap.Server}
            title="Instances"
            value={`${metrics.instances} running instances`}
          />
          <MetricCard
            icon={iconMap.Shield}
            title="Firewall"
            value={`Status: ${metrics.firewall} `}
          />
          <MetricCard
            icon={iconMap.Users}
            title="Users"
            value={`${metrics.users} total users`}
          />
        </div>

        <div className="mt-12 text-center">
          <a
            href="/resources"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View Detailed Resource Monitor
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
