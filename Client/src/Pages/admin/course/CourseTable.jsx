import { Link, useNavigate } from "react-router-dom";
import { Edit, BarChart, BookOpen, PlusCircle, BookPlus } from "lucide-react";
import { useGetCreatorCourseQuery } from "@/features/api/courseapi";
import PublishCourseButton from "./PublishCourseButton";

const CourseTable = () => {
  const { data, isLoading, refetch } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-center text-xl text-white">Loading...</h1>;

  return (
    <div className="flex min-h-screen mt-[64px] bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-500">Admin Panel</h2>
        <nav className="mt-6">
          <ul className="space-y-5">
            <li>
              <Link to="/dashboard" className="flex items-center gap-4 p-3 rounded-lg  hover:bg-gray-700 transition duration-300">
                <BarChart className="w-6 h-6 text-blue-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/course" className="flex items-center gap-4 p-3 rounded-lg  bg-gray-700 transition duration-300">
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
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Your Courses</h1>
          <button
            onClick={() => navigate(`create`)}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Create Course
          </button>
        </div>

        {/* Course Table Container with Glassmorphism */}
        <div className="overflow-x-auto p-6 rounded-xl bg-black/60 backdrop-blur-md shadow-xl border border-gray-800">
          <table className="w-full text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.courses?.map((course) => (
                <tr key={course._id} className="border-b border-gray-800 hover:bg-gray-800/80 transition">
                  <td className="px-6 py-4">₹{course?.coursePrice || "NA"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                        course.isPublished ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{course.courseTitle}</td>
                  <td className="px-6 py-4 text-right flex items-center gap-3 justify-end">
                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`${course._id}`)}
                      className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition"
                    >
                      <Edit size={18} />
                    </button>

                    {/* Publish Button - Show only for Draft courses */}
                    {!course.isPublished && (
                      <PublishCourseButton
                        courseId={course._id}
                        isPublished={course.isPublished}
                        lectureCount={course.lectures.length}
                        refetch={refetch}
                      />
                    )}
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
