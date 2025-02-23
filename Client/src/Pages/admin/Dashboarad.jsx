import React, { useState } from 'react'

const Dashboarad = () => {
  const [courses, setCourses] = useState([
    { name: "React Basics", registrations: 120, revenue: 6000 },
    { name: "Advanced JavaScript", registrations: 80, revenue: 4000 },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", registrations: 0, revenue: 0 });

  // Handle Edit Click
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(courses[index]);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save Updated Course
  const handleSave = () => {
    const updatedCourses = [...courses];
    updatedCourses[editingIndex] = editData;
    setCourses(updatedCourses);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Admin Dashboard</h1>

        {/* Add Course Section */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Add Course</h2>
          <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">Add New Course</button>
        </div>

        {/* Published Courses Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Published Courses</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-600">Course Name</th>
                <th className="p-2 border-b border-gray-600">Registrations</th>
                <th className="p-2 border-b border-gray-600">Revenue ($)</th>
                <th className="p-2 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  {editingIndex === index ? (
                    <>
                      <td className="p-2 border-b border-gray-600">
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                          className="bg-gray-700 p-1 rounded-md text-white border border-gray-600"
                        />
                      </td>
                      <td className="p-2 border-b border-gray-600">
                        <input
                          type="number"
                          name="registrations"
                          value={editData.registrations}
                          onChange={handleChange}
                          className="bg-gray-700 p-1 rounded-md text-white border border-gray-600"
                        />
                      </td>
                      <td className="p-2 border-b border-gray-600">
                        <input
                          type="number"
                          name="revenue"
                          value={editData.revenue}
                          onChange={handleChange}
                          className="bg-gray-700 p-1 rounded-md text-white border border-gray-600"
                        />
                      </td>
                      <td className="p-2 border-b border-gray-600">
                        <button
                          onClick={handleSave}
                          className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border-b border-gray-600">{course.name}</td>
                      <td className="p-2 border-b border-gray-600">{course.registrations}</td>
                      <td className="p-2 border-b border-gray-600">{course.revenue}</td>
                      <td className="p-2 border-b border-gray-600">
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboarad