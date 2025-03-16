import { BarChart, BookOpen, BookPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { useGetPublishedCourseQuery } from "@/features/api/courseapi";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  BarChart as RBarChart,
} from "recharts";

const AdminDashboard = () => {
  const { data: purchasedData, isLoading, isError } = useGetPurchasedCoursesQuery();
  const { data: coursesData } = useGetPublishedCourseQuery();

  if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Failed to load data</h1>;

  const { purchasedCourse } = purchasedData || [];
  const totalSales = purchasedCourse.length;
  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);

  const courseSales = purchasedCourse.reduce((acc, course) => {
    const title = course.courseId.courseTitle;
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

  const topCourses = Object.entries(courseSales)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const revenueByMonth = purchasedCourse.reduce((acc, purchase) => {
    const month = new Date(purchase.createdAt).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + (purchase.amount || 0);
    return acc;
  }, {});

  const revenueData = Object.entries(revenueByMonth)
    .map(([month, revenue]) => ({ month, revenue }))
    .sort((a, b) => new Date(`01 ${a.month} 2024`) - new Date(`01 ${b.month} 2024`));

  return (
    <div className="flex mt-[64px] scrollbar-hide  bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-500">Admin Panel</h2>
        <nav className="mt-6">
          <ul className="space-y-5">
            <li>
              <Link to="/dashboard" className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300">
                <BarChart className="w-6 h-6 text-blue-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/course" className="flex items-center gap-4 p-3 rounded-lg  hover:bg-gray-700 transition duration-300">
                <BookOpen className="w-6 h-6 text-green-400" />
                Courses
              </Link>
            </li>
            <li>
              <Link to="/course/create" className="flex items-center gap-4 p-3 rounded-lg  hover:bg-gray-700 transition duration-300">
                <BookPlus className="w-6 h-6 text-yellow-400" />
                Add Course
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-950">
        <h1 className="text-3xl font-extrabold mb-6 text-white">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-white text-lg">Total Sales</h3>
            <p className="text-4xl font-bold">{totalSales}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-white text-lg">Total Revenue</h3>
            <p className="text-4xl font-bold">₹{totalRevenue}</p>
          </div>
        </div>

        {/* Charts & Recent Purchases Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Top-Selling Courses */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-gray-300 mb-4">Top 5 Best-Selling Courses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RBarChart data={topCourses} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis type="number" stroke="white" />
                <YAxis type="category" dataKey="name" stroke="white" width={150} />
                <Tooltip />
                <Bar dataKey="count" fill="#FF9800" barSize={30} radius={[5, 5, 0, 0]} />
              </RBarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Purchases - Right Side */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-auto ">
            <h3 className="text-gray-300 mb-4">Recent Purchases</h3>
            <ul className="space-y-4">
              {purchasedCourse.length > 0 ? (
                purchasedCourse.map((purchase, index) => (
                  <li key={index} className="p-4 bg-gray-700 rounded-lg border border-gray-600 flex justify-between items-center transition hover:bg-gray-600 duration-300">
                    <span className="text-lg font-semibold text-white">{purchase.courseId.courseTitle}</span>
                    <span className="text-sm text-gray-300">₹{purchase.amount} • {new Date(purchase.createdAt).toLocaleDateString()}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No recent purchases</p>
              )}
            </ul>
          </div>
        </div>

        {/* Monthly Revenue Trend - Moved Below */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8">
          <h3 className="text-gray-300 mb-4">Monthly Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} dot={{ stroke: "#4CAF50", strokeWidth: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
