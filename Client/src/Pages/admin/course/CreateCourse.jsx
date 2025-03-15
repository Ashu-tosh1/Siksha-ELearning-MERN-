import { useCreateCourseMutation } from "@/features/api/courseapi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, BookOpen } from "lucide-react";

const CreateCourse = () => {
  const [step, setStep] = useState(1);
  const [courseId, setCourseId] = useState(null);
  const navigate = useNavigate();
  const createCourseMutation = useCreateCourseMutation();
  const createCourse = createCourseMutation[0]; // Mutation function
  const isLoading = createCourseMutation[1]?.isLoading; // Mutation state
  
  const [courseDetails, setCourseDetails] = useState({
    courseTitle: "",
    category: "Web Development",
    price: "",
  });

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (step === 1) {
      try {
        const response = await createCourse({
          courseTitle: courseDetails.courseTitle,
          category: courseDetails.category,
          price: courseDetails.price,
        }).unwrap();

        setCourseId(response.course._id);
        navigate(`/course/${response.course._id}`);
      } catch (error) {
        console.error("Course creation failed", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-5 border-r border-gray-700">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        <nav className="mt-5">
          <ul className="space-y-4">
            <li>
              <button onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-800 transition">
                <BarChart className="w-5 h-5 text-blue-400" />
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/admin/courses")} className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-800 transition">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Courses
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Create New Course</h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className={`w-1/3 h-2 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
            <div className={`w-1/3 h-2 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
          </div>

          {/* Step 1: Course Details */}
          {step === 1 && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-300">Course Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400">Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={courseDetails.courseTitle}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400">Category</label>
                  <select
                    name="category"
                    value={courseDetails.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>AI & Machine Learning</option>
                    <option>Cyber Security</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={courseDetails.price}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-md hover:from-blue-600 hover:to-purple-600 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
