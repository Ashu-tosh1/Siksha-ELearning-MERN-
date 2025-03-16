import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./CourseTab";

import { motion } from "framer-motion";
import { BarChart, BookOpen, BookPlus } from "lucide-react";

const EditCourse = () => {
  const step = 2; // Assuming step tracking is handled elsewhere
  const navigate = useNavigate();
  return (  
    <div className="flex  bg-black border-t border-gray-700 text-white mt-[64px]">
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
                className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-800 transition"
              >
                <BookPlus className="w-5 h-5 text-yellow-400" />
                Add Course
              </button>
              <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                <li>
                  <button
                    // onClick={() => navigate("/admin/courses/add/step1")}
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md bg-gray-800 transition text-sm"
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
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 p-10"
      >
        <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-2xl border border-gray-800 relative">
          {/* Step Indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-6 flex space-x-2"
          >
            <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-500" : "bg-gray-600"}`}></div>
            <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-500" : "bg-gray-600"}`}></div>
            <div className={`w-3 h-3 rounded-full ${step === 3 ? "bg-blue-500" : "bg-gray-600"}`}></div>
            <div className={`w-3 h-3 rounded-full ${step === 4 ? "bg-blue-500" : "bg-gray-600"}`}></div>
          </motion.div>

          {/* Header Section */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold text-blue-400">Edit Course Details Here </h1>
           
            <h2> Add Lectures by clicking on the button to your right after thumbnail and price </h2>
            
            
            <Link to="lecture">
              <Button className="hover:bg-blue-400 hover:text-black   text-white border border-gray-700 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-500 hover:border-blue-500">
                Go to Lectures →
              </Button>
            </Link>
          </div>

          {/* Course Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className=" bg-[#121212] p-6 rounded-lg shadow-md border border-gray-700"
          >
            <CourseTab />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditCourse;
