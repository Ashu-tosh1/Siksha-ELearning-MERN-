import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCreatorCourseQuery } from '@/features/api/courseapi';

const Dashboard = () => {
  const { data, isLoading, isError } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  console.log("Fetched Courses:", data);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="text-red-500">Failed to get courses</h1>;

  const courses = data?.courses || [];

  const handleEdit = (course) => {
    navigate(`/course/${course._id}`, { state: { course } });
  };
  

  const handleAddNewCourse = () => {
    navigate('/course/create');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Admin Dashboard</h1>

        {/* Add Course Section */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Add Course</h2>
          <button
            onClick={handleAddNewCourse}
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New Course
          </button>
        </div>

        {/* Published Courses Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Published Courses</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-600">Course Name</th>
                <th className="p-2 border-b border-gray-600">Registrations</th>
                <th className="p-2 border-b border-gray-600">Revenue (₹)</th>
                <th className="p-2 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-700">
                  <td className="p-2 border-b border-gray-600">{course.courseTitle}</td>
                  <td className="p-2 border-b border-gray-600">{course.enrolledStudents.length}</td>
                  <td className="p-2 border-b border-gray-600">₹{course.price || 0}</td>
                  <td className="p-2 border-b border-gray-600">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
