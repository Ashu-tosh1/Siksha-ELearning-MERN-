// Sidebar.jsx

import { motion } from "framer-motion";
import { BarChart, BookOpen, BookPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Trail2 = () => {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 bg-[#121212] p-5 border-r border-gray-800"
    >
      <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-800 transition"
            >
              <BarChart className="w-5 h-5 text-blue-400" />
              Dashboard
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/admin/courses")}
              className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-800 transition"
            >
              <BookOpen className="w-5 h-5 text-blue-400" />
              Courses
            </button>
          </li>

          {/* Add Course Section */}
          <li>
            <button
              onClick={() => navigate("/admin/courses/add")}
              className="flex items-center gap-3 p-3 w-full text-left rounded-lg bg-gray-800 transition"
            >
              <BookPlus className="w-5 h-5 text-blue-400" />
              Add Course
            </button>

            {/* Sub-options under Add Course */}
            <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
              <li>
                <button
                  onClick={() => navigate("/admin/courses/add/step1")}
                  className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 transition text-sm"
                >
                  🔹 Step 1
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin/courses/add/step2")}
                  className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 transition text-sm"
                >
                  🔹 Step 2
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Trail2;
