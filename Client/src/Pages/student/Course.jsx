import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(course)
  return (
    <motion.div
      className="relative w-72 h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      onMouseMove={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ rotateY: isHovered ? 180 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Front Side */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-40 object-cover rounded-t-2xl"
        />
        <h2 className="text-white text-xl font-bold mt-3 truncate">{course.courseTitle}</h2>
        <p className="text-gray-400 text-sm">By {course.creator?.name || "Unknown"}</p>
        <span className="text-green-400 font-semibold text-lg mt-2">₹ {course.coursePrice}</span>
      </motion.div>

      {/* Back Side */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Eye className="text-white w-12 h-12 mb-3" />
        <Link to={`/course-detail/${course._id}`} className="text-blue-400 hover:underline">
          View Details
        </Link>
        <motion.p
          className="text-gray-300 text-sm opacity-0 mt-2 text-center px-4"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {course.courseLevel}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Course;
