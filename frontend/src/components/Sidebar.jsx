import React from 'react'

const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-100 p-5">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
            <span>🏠</span>
            <span>Resource Monitor</span>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
            <span>💰</span>
            <span>Cost Management</span>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
            <span>☁️</span>
            <span>Cloud Providers</span>
          </li>
        </ul>
      </div>
    );
  };

export default Sidebar
