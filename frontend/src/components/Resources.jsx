import React from 'react';
import Sidebar from './Sidebar';
const Card = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow bg-gray-50 p-10">
        <h1 className="text-3xl font-bold mb-6">Resource Monitor</h1>
        <p className="text-gray-500 mb-10">Welcome to CR Resource Manager. To get an overview of your cloud resource usage and costs.</p>

        <h2 className="text-xl font-semibold mb-4">Current Project Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card title="Memory" value="1.5 GB" />
          <Card title="CPU" value="30%" />
          <Card title="Storage" value="1.5 TB" />
          <Card title="Uptime" value="100%" />
          <Card title="Bandwidth" value="500 Mbps" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Network Traffic</h3>
            <p className="text-green-500 font-semibold mb-4">+5%</p>
            {/* Placeholder  */}
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">CPU Usage</h3>
            <p className="text-green-500 font-semibold mb-4">+2%</p>
            {/* Placeholder */}
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Bandwidth Comparison</h3>
            <p className="text-green-500 font-semibold mb-4">+10%</p>
            {/* Placeholder */}
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
