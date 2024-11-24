import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-5">
      <div className="text-2xl font-bold mb-8">Dashboard</div>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <span>🏠</span>
          <Link to="/resources" className="hover:text-blue-500">Resource Monitor</Link>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <span>💰</span>
          <Link to="/cost-management" className="hover:text-blue-500">Cost Management</Link>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <span>☁️</span>
          <Link to="/cloud-providers" className="hover:text-blue-500">Cloud Providers</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
