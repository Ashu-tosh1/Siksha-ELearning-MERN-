import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import { useGetCreatorCourseQuery } from "@/features/api/courseapi";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-center text-xl text-white">Loading...</h1>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Courses</h1>
        <button
          onClick={() => navigate(`create`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Create a new course
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-700">Price</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">Status</th>
              <th className="px-4 py-3 text-left border-b border-gray-700">Title</th>
              <th className="px-4 py-3 text-right border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.map((course) => (
              <tr key={course._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="px-4 py-3">{course?.coursePrice || "NA"}</td>
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
    </div>
  );
};

export default CourseTable;
