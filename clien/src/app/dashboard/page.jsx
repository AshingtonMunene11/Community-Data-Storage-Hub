"use client";

import "./dashboard.css";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  HardDrive,
  Activity,
  Cloud,
  Settings,
  Edit3,
} from "lucide-react";

export default function DashboardPage({ role }) {
  const storageData = [
    { name: "Jan", usage: 12 },
    { name: "Feb", usage: 19 },
    { name: "Mar", usage: 15 },
    { name: "Apr", usage: 25 },
    { name: "May", usage: 22 },
    { name: "Jun", usage: 35 },
  ];

  const distributionData = [
    { name: "Documents", value: 45, color: "hsl(158, 64%, 52%)" },
    { name: "Images", value: 30, color: "hsl(188, 95%, 68%)" },
    { name: "Videos", value: 15, color: "hsl(158, 64%, 65%)" },
    { name: "Other", value: 10, color: "hsl(220, 20%, 16%)" },
  ];

  const stats = [
    { label: "Total Storage", value: "125TB", icon: HardDrive },
    { label: "Active Users", value: "1,247", icon: Users },
    { label: "Files Stored", value: "45.2K", icon: Cloud },
    { label: "Uptime", value: "99.9%", icon: Activity },
  ];

  {/*user*/}

  const renderUserView = () => (
    <div className="charts-grid">
      <Card className="chart-card">
        <CardHeader>
          <CardTitle>Storage Usage Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={storageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="usage"
                fill="hsl(158, 64%, 52%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="chart-card">
        <CardHeader>
          <CardTitle>Data Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  {/*admin*/}
<div id="admin"></div>
  const renderAdminView = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="admin-card">
        <CardHeader>
          <CardTitle className="admin-title">
            <Edit3 className="icon-green" />
            <span>Admin Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="admin-text">
            As an admin, you can edit storage nodes and user data.
          </p>
          <Button variant="default">Edit Storage Nodes</Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <div className="header-content">
          <div>
            <h1 className="header-title">Cloud Dashboard</h1>
            <p className="header-subtitle">
              Welcome, {role === "admin" ? "Admin" : "User"} 👋
            </p>
          </div>
          <Button variant="hero" size="lg">
            <Settings className="mr-2" /> Settings
          </Button>
        </div>
      </motion.div>

      <div className="dashboard-main">
        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="stat-card">
                <CardContent>
                  <div className="stat-item">
                    <Icon className="icon-green" />
                    <div>
                      <p className="stat-value">{stat.value}</p>
                      <p className="stat-label">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Role-based view */}
        {role === "admin" ? renderAdminView() : renderUserView()}
      </div>
    </div>
  );
}
