import { useCreateCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseapi";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, BookOpen, BookPlus } from "lucide-react";

const CreateCourse = () => {
  const [step] = useState(1);
  const navigate = useNavigate();
  const createCourseMutation = useCreateCourseMutation();
  const createCourse = createCourseMutation[0]; // Mutation function
  const isLoading = createCourseMutation[1]?.isLoading; // Mutation state

  const [courseDetails, setCourseDetails] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "Web Development",
    price: "",
    courseLevel: "Beginner",
    courseDuration: "",
  });

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (step === 1) {
      try {
        const response = await createCourse({
          ...courseDetails,
        }).unwrap();

        navigate(`/course/${response.course._id}`);
      } catch (error) {
        console.error("Course creation failed", error);
      }
    }
  };
 
  return (
    <div className="flex h-screen mt-[45px] bg-black border-t border-gray-700 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-900 w-64 p-6 border-r border-gray-800 shadow-lg"
      >
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
              <Link to="/course" className="flex items-center gap-4 p-3 rounded-lg  hover:bg-gray-700 transition duration-300">
                <BookOpen className="w-6 h-6 text-green-400" />
                Courses
              </Link>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/courses/add")}
                className="flex items-center gap-3 p-3 w-full text-left rounded-lg bg-gray-800 transition"
              >
                <BookPlus className="w-5 h-5 text-yellow-400" />
                Add Course
              </button>
              <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                <li>
                  <button
                    // onClick={() => navigate("/admin/courses/add/step1")}
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 transition text-sm"
                  >
                    🔹 Add Basic Details
                  </button>
                </li>
                <li>
                  <button
                    // onClick={() => navigate("/admin/courses/add/step2")}
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 transition text-sm"
                  >
                    🔹 Add Lecture Name
                  </button>
                </li>
                <li>
                  <button
                    // onClick={() => navigate("/admin/courses/add/step3")}
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 text-white transition text-sm"
                  >
                    🔹 Add Lecture Details
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}

      <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 mt-[85px] right-[150px] z-10 flex items-center gap-2"
        >
          
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-500" : "bg-gray-600"}`}></div>
        <div className={`w-3 h-3 rounded-full ${step === 3 ? "bg-blue-500" : "bg-gray-600"}`}></div>
        <div className={`w-3 h-3 rounded-full ${step === 4 ? "bg-blue-500" : "bg-gray-600"}`}></div>
        </motion.div>
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex justify-center items-center"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-2xl w-full max-w-5xl p-10 relative border border-gray-800"
        >
          <h1 className="text-3xl font-extrabold text-blue-400 text-center mb-8">
            Create a New Course
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex gap-10 bg-black bg-opacity-40 p-8 rounded-xl backdrop-blur-md"
          >
            {/* Left Section */}
            <div className="flex-1 space-y-5">
              <div>
                <label className="text-gray-400 block mb-2">Title</label>
                <input
                  type="text"
                  name="courseTitle"
                  value={courseDetails.courseTitle}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-2">Subtitle</label>
                <input
                  type="text"
                  name="subTitle"
                  value={courseDetails.subTitle}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Enter course subtitle"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-2">Category</label>
                <select
                  name="category"
                  value={courseDetails.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                >
                  <option value="nextjs">Next JS</option>
                  <option value="data science">Data Science</option>
                  <option value="frontend development">
                    Frontend Development
                  </option>
                  <option value="fullstack development">
                    Fullstack Development
                  </option>
                  <option value="mern stack development">
                    MERN Stack Development
                  </option>
                  <option value="backend development">
                    Backend Development
                  </option>
                  <option value="javascript">Javascript</option>
                  <option value="python">Python</option>
                  <option value="docker">Docker</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="html">HTML</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-2">Course Level</label>
                <select
                  name="courseLevel"
                  value={courseDetails.courseLevel}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 space-y-5">
              <div>
                <label className="text-gray-400 block mb-2">Description</label>
                <textarea
                  name="description"
                  value={courseDetails.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all h-32"
                  placeholder="Enter course description"
                ></textarea>
              </div>

              <div>
                <label className="text-gray-400 block mb-2">
                  Course Duration (in hours)
                </label>
                <input
                  type="number"
                  name="courseDuration"
                  value={courseDetails.courseDuration}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Enter course duration"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-all shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Next"}
            </button>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default CreateCourse;
