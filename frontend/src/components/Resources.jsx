import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Resources = () => {
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/live-metrics/"
        );
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching live metrics:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/chart-data/"
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchMetrics();
    fetchChartData();
  }, []);

  if (!metrics || !chartData) {
    return <div>Loading...</div>;
  }

  const { cpu, memory, disk, uptime, bandwidth, cost_distribution } = metrics;

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  const cardStyles =
    "p-4 bg-white rounded-lg shadow-md flex flex-col justify-between items-start";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Resource Monitor</h1>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={cardStyles}>
            <h2 className="text-xl font-semibold">Memory</h2>
            <p className="text-3xl font-bold">{memory}</p>
          </div>
          <div className={cardStyles}>
            <h2 className="text-xl font-semibold">CPU</h2>
            <p className="text-3xl font-bold">{cpu}</p>
          </div>
          <div className={cardStyles}>
            <h2 className="text-xl font-semibold">Storage</h2>
            <p className="text-3xl font-bold">{disk.used}</p>
            <p className="text-sm text-gray-500">Free: {disk.free}</p>
          </div>
          <div className={cardStyles}>
            <h2 className="text-xl font-semibold">Bandwidth</h2>
            <p className="text-3xl font-bold">{bandwidth.sent}</p>
            <p className="text-sm text-gray-500">Received: {bandwidth.recv}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Network Traffic</h2>
            <Line options={lineChartOptions} data={chartData} />
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">CPU Usage</h2>
            <Line options={lineChartOptions} data={chartData} />
          </div>
        </div>

        {/* Cost Distribution & Disk Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Disk Usage</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Used: {disk.used}</p>
              <p className="text-lg font-semibold">Free: {disk.free}</p>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${disk.percent}` }}
              ></div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Cost Distribution</h2>
            <div>
              <div className="mb-2">
                <p className="text-sm">Storage: {cost_distribution.storage}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${cost_distribution.storage}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-sm">Compute: {cost_distribution.compute}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${cost_distribution.compute}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Bandwidth: {cost_distribution.bandwidth}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-yellow-500 h-4 rounded-full"
                    style={{ width: `${cost_distribution.bandwidth}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow p-4 bg-gray-100">
          <div className={cardStyles}>
            <h2 className="text-xl font-semibold">Uptime</h2>
            <p className="text-3xl font-bold">{uptime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
