import React from 'react';
import { Cpu, MemoryStick, HardDrive, Server, Database, Shield, Users } from 'lucide-react';

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
  const metrics = [
    { icon: Cpu, title: 'CPU', value: '20% usage' },
    { icon: MemoryStick, title: 'RAM', value: '5.4 GB used' },
    { icon: HardDrive, title: 'Disk', value: '120 GB used' },
    { icon: Server, title: 'Instances', value: '10 instances' },
    { icon: Database, title: 'Databases', value: '3 databases' },
    { icon: Shield, title: 'Firewalls', value: '2 firewalls' },
    { icon: Users, title: 'Users', value: '5 users' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome User!</h1>
        <p className="text-xl text-gray-600 mb-10">View and manage your cloud resources</p>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <img 
          src="dashboard_banner.png" 
          alt="Cloud Resources" 
          className="w-full h-64 object-cover"
        />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} icon={metric.icon} title={metric.title} value={metric.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
