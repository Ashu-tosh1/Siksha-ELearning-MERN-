import React from "react";
import { BarChart, BookOpen,BookPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, BarChart as RBarChart } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 30000 },
  { month: "Mar", revenue: 50000 },
  { month: "Apr", revenue: 70000 },
  { month: "May", revenue: 60000 },
  { month: "Jun", revenue: 80000 },
];

const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 150 },
  { month: "Mar", students: 200 },
  { month: "Apr", students: 300 },
  { month: "May", students: 280 },
  { month: "Jun", students: 350 },
];

const AdminDashboard = () => {
  return (
    <div className="flex h-[91.2vh]  bg-black border-t border-gray-700 text-white mt-[64px]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-5 border-r border-gray-700">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="mt-5">
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BarChart className="w-5 h-5 text-blue-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/course" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Courses
              </Link>
                      </li>
                      <li>
              <Link to="/course/create" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BookPlus className="w-5 h-5 text-blue-400" />
                Add Course
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-gray-400">Total Users</h3>
            <p className="text-3xl font-bold text-blue-400">1,234</p>
          </div>
          <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-gray-400">Total Courses</h3>
            <p className="text-3xl font-bold text-blue-400">42</p>
          </div>
          <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-gray-400">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-400">₹5,67,890</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Revenue Graph */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-gray-400 mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis dataKey="month" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Course Enrollment Graph */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-gray-400 mb-4">Course Enrollment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RBarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis dataKey="month" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Bar dataKey="students" fill="#3498db" barSize={40} />
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
