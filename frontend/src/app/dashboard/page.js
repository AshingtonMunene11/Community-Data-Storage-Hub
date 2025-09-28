"use client";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import api from "@/lib/api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [usersOverTime, setUsersOverTime] = useState([]);
  const [uploadsOverTime, setUploadsOverTime] = useState([]);
  const [storageUtilization, setStorageUtilization] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching dashboard data...");
      
      const [
        statsRes,
        usersRes,
        uploadsRes,
        storageRes,
        activityRes,
        fileTypesRes,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/users-over-time"),
        api.get("/dashboard/uploads-over-time"),
        api.get("/dashboard/storage-utilization"),
        api.get("/dashboard/user-activity"),
        api.get("/dashboard/file-types"),
      ]);

      console.log("Dashboard data fetched successfully");

      setStats(statsRes.data);
      setUsersOverTime(usersRes.data);
      setUploadsOverTime(uploadsRes.data);
      setStorageUtilization(storageRes.data);
      setUserActivity(activityRes.data);
      setFileTypes(fileTypesRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Chart configurations
  const usersOverTimeConfig = {
    labels: usersOverTime.map((item) => item.month),
    datasets: [
      {
        label: "New Users",
        data: usersOverTime.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const uploadsOverTimeConfig = {
    labels: uploadsOverTime.map((item) => item.month),
    datasets: [
      {
        label: "Upload Count",
        data: uploadsOverTime.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        label: "Total Size (MB)",
        data: uploadsOverTime.map((item) => item.total_size / (1024 * 1024)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  const storageUtilizationConfig = {
    labels: storageUtilization.map((node) => node.name),
    datasets: [
      {
        label: "Storage Utilization (%)",
        data: storageUtilization.map((node) => node.utilization_percentage),
        backgroundColor: storageUtilization.map((node) =>
          node.utilization_percentage > 80
            ? "rgba(255, 99, 132, 0.6)"
            : node.utilization_percentage > 60
            ? "rgba(255, 206, 86, 0.6)"
            : "rgba(75, 192, 192, 0.6)"
        ),
        borderColor: storageUtilization.map((node) =>
          node.utilization_percentage > 80
            ? "rgba(255, 99, 132, 1)"
            : node.utilization_percentage > 60
            ? "rgba(255, 206, 86, 1)"
            : "rgba(75, 192, 192, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const fileTypesConfig = {
    labels: fileTypes.map((type) => type.extension),
    datasets: [
      {
        label: "File Count",
        data: fileTypes.map((type) => type.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topUsersConfig = {
    labels: userActivity
      .sort((a, b) => b.upload_count - a.upload_count)
      .slice(0, 10)
      .map((user) => user.username),
    datasets: [
      {
        label: "Upload Count",
        data: userActivity
          .sort((a, b) => b.upload_count - a.upload_count)
          .slice(0, 10)
          .map((user) => user.upload_count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const uploadsOverTimeOptions = {
    ...chartOptions,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Upload Count",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Total Size (MB)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.users.total}
              </p>
              <p className="text-sm text-gray-500">
                +{stats.users.this_month} this month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Uploads</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.uploads.total}
              </p>
              <p className="text-sm text-gray-500">
                {(stats.uploads.total_size / (1024 * 1024 * 1024)).toFixed(2)} GB
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Storage Nodes
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {stats.storage_nodes.active}/{stats.storage_nodes.total}
              </p>
              <p className="text-sm text-gray-500">
                {stats.storage_nodes.utilization_percentage.toFixed(1)}% utilized
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Total Allocations
              </h3>
              <p className="text-3xl font-bold text-orange-600">
                {stats.allocations.total}
              </p>
              <p className="text-sm text-gray-500">File chunks allocated</p>
            </div>
          </div>
        )}

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Users Over Time */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Registrations Over Time
            </h3>
            <div className="space-y-2">
              {usersOverTime.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.month}</span>
                  <span className="font-medium">{item.count} users</span>
                </div>
              ))}
            </div>
          </div>

          {/* Uploads Over Time */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Uploads Over Time
            </h3>
            <div className="space-y-2">
              {uploadsOverTime.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.month}</span>
                  <span className="font-medium">
                    {item.count} uploads ({(item.total_size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Users Over Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Registrations Over Time
            </h3>
            <Bar data={usersOverTimeConfig} options={chartOptions} />
          </div>

          {/* Uploads Over Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Uploads Over Time
            </h3>
            <Line data={uploadsOverTimeConfig} options={uploadsOverTimeOptions} />
          </div>

          {/* Storage Utilization Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Storage Node Utilization
            </h3>
            <Bar data={storageUtilizationConfig} options={chartOptions} />
          </div>

          {/* File Types Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              File Types Distribution
            </h3>
            <Pie data={fileTypesConfig} options={chartOptions} />
          </div>
        </div>

        {/* Top Users Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Users by Upload Count
          </h3>
          <Bar data={topUsersConfig} options={chartOptions} />
        </div>

        {/* Storage Nodes Details Table */}
        {storageUtilization.length > 0 && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Storage Nodes Details
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Node Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity (GB)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used (GB)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available (GB)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {storageUtilization.map((node, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {node.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {node.location || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(node.capacity / (1024 * 1024 * 1024)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(node.used / (1024 * 1024 * 1024)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(node.available / (1024 * 1024 * 1024)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            node.utilization_percentage > 80
                              ? "bg-red-100 text-red-800"
                              : node.utilization_percentage > 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {node.utilization_percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            node.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {node.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Activity Table */}
        {userActivity.length > 0 && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Activity
            </h3>
            <div className="space-y-2">
              {userActivity
                .sort((a, b) => b.upload_count - a.upload_count)
                .slice(0, 10)
                .map((user, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{user.username}</span>
                    <span className="font-medium">
                      {user.upload_count} uploads ({(user.total_size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* File Types Table */}
        {fileTypes.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              File Types Distribution
            </h3>
            <div className="space-y-2">
              {fileTypes.map((type, index) => (
                <div key={index} className="flex justify-between">
                  <span>.{type.extension}</span>
                  <span className="font-medium">
                    {type.count} files ({(type.total_size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}