import { useState } from "react";
import { motion } from "framer-motion";
// import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import educator from "@/Pages/student/Images/educator.png"
// import slider from "@/Pages/student/Images/slider2.png"
// import image from "@/Pages/student/Images/image.png"

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  console.log(course);
  return (
    <motion.div
      className="relative bg-[#1a1a1a] text-white rounded-2xl p-4 shadow-lg max-w-sm cursor-pointer overflow-hidden border border-gray-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Course Image */}
      <motion.img 
src={course.courseThumbnail ? course.courseThumbnail : "image.png"|| slider1} 
  alt="Course Thumbnail"
  className="rounded-xl w-full h-48 object-cover transition-all duration-500"
  animate={{ opacity: isHovered ? 0.8 : 1, scale: isHovered ? 1.1 : 1 }}
/>

      {/* Course Details */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-blue-400">📂</span> {course.category || "Design"}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-400">⏳</span> {course.courseDuration || "3 Months"}
          </div>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-200 truncate">{course.courseTitle}</h3>
        <p className="text-gray-300 text-sm mt-1 line-clamp-2">
          {course.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>

        {/* Instructor & Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <img
              src={course.creator?.avatar ||educator}
              alt="Instructor"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <span className="text-sm text-gray-300">{course.creator?.name || "Unknown"}</span>
          </div>
          <div className="text-right">
            <span className="text-green-400 font-semibold text-lg ml-2">
              ₹{course.coursePrice || "80"}
            </span>
          </div>
        </div>

        {/* Hover Effect for View Details */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 rounded-2xl opacity-0 transition-all"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
         
          <Link
            to={`/course-detail/${course._id}`}
            className="text-blue-400 hover:underline text-lg font-semibold"
          >
            View Details
          </Link>
          <motion.p
            className="text-gray-300 text-sm mt-2 text-center px-4"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {course.courseLevel || "Beginner"}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
