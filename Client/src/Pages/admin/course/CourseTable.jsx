// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, BarChart, BookOpen, PlusCircle, BookPlus } from "lucide-react";
import { useGetCreatorCourseQuery } from "@/features/api/courseapi";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-center text-xl text-white">Loading...</h1>;

  return (
    <div className="flex h-[91.2vh]  bg-black border-t border-gray-700 text-white mt-[64px]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-5 border-r border-gray-700">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="mt-5">
          <ul className="space-y-4">
            <li>
              <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BarChart className="w-5 h-5 text-blue-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/courses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Courses
              </Link>
            </li>
            <Link to="/course/create" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition">
                <BookPlus className="w-5 h-5 text-blue-400" />
                Add Course
              </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Courses</h1>
          <button
            onClick={() => navigate(`create`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Create Course
          </button>
        </div>

        <div className="overflow-x-auto bg-[#1a1a1a] p-4 rounded-lg shadow-lg border border-gray-700">
          <table className="w-full text-white border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left border-b border-gray-700">Price</th>
                <th className="px-4 py-3 text-left border-b border-gray-700">Status</th>
                <th className="px-4 py-3 text-left border-b border-gray-700">Title</th>
                <th className="px-4 py-3 text-right border-b border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.courses?.map((course) => (
                <tr key={course._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-4 py-3">₹{course?.coursePrice || "NA"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-md ${
                        course.isPublished ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{course.courseTitle}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`${course._id}`)}
                      className="p-2 text-gray-300 hover:text-white transition"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CourseTable;
