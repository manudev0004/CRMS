import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Sidebar from "./Sidebar";

const CostManagement = () => {
  const [liveMetrics, setLiveMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch live metrics from the backend
    axios.get("http://127.0.0.1:8000/api/live-metrics/").then((response) => {
      setLiveMetrics(response.data);
      setChartData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Cost",
            data: [40, 35, 30, 25, 50, 70],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  if (!liveMetrics || !chartData) return <p>Loading...</p>;

  // Calculate AI predicted cost (example calculation)
  const aiPredictedCost =
    liveMetrics.cost_distribution.storage +
    liveMetrics.cost_distribution.compute * 1.2;
  const averageCPU = ((14.3 + 15.4 + 7.6) / 3).toFixed(1); // Replace with dynamic data if needed

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Cost Management</h1>
        <div className="grid grid-cols-2 gap-8">
          {/* Card 2: Cost Allocation */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Cost Allocation</h2>
            <p>Storage: {liveMetrics.cost_distribution.storage}%</p>
            <p>Compute: {liveMetrics.cost_distribution.compute}%</p>
            <p>Bandwidth: {liveMetrics.cost_distribution.bandwidth}%</p>
          </div>

          {/* Card 3: Historical Trends */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Historical Trends</h2>
            <p>Average CPU (Last 3 Days): {averageCPU}%</p>
            <p>Memory Usage: {liveMetrics.memory}</p>
            <p>Total Bandwidth Sent (Last 3 Days): 118.98 MB</p>
          </div>

          {/* Card 4: Predicted Monthly Costs */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              Predicted Monthly Costs (AI)
            </h2>
            <p>
              Predicted Storage Cost: $
              {(liveMetrics.cost_distribution.storage * 1.15).toFixed(2)}
            </p>
            <p>
              Predicted Compute Cost: $
              {(liveMetrics.cost_distribution.compute * 1.15).toFixed(2)}
            </p>
            <p>
              Predicted Bandwidth Cost: $
              {(liveMetrics.cost_distribution.bandwidth * 1.15).toFixed(2)}
            </p>
          </div>

          {/* Card 5: Anomalies and Alerts */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Anomalies and Alerts</h2>
            <p>
              CPU Usage Today: {liveMetrics.cpu}
              <span className="text-red-500">
                {" "}
                (30% higher than last 3 days avg)
              </span>
            </p>
            <p>Memory Usage: {liveMetrics.memory}</p>
          </div>

          {/* Card 7: Total Costs for the Month */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Costs for the Month</h2>
            <p>
              Total Cost: $
              {(
                liveMetrics.cost_distribution.storage +
                liveMetrics.cost_distribution.compute +
                liveMetrics.cost_distribution.bandwidth
              ).toFixed(2)}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Cost Trends</h2>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostManagement;
