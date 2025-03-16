import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const MyLearning = () => {
  const { user } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/course/enrolled/${user._id}`);

        console.log("Fetched Courses with Progress:", data.courses);
        setEnrolledCourses(data.courses);
      } catch (error) {
        console.error("Error fetching enrolled courses", error);
      }
    };

    if (user?._id) {
      fetchEnrolledCourses();
    }
  }, [user]);

  return (
    <div className="min-h-screen mt-[45px] bg-[#0a0a0a] text-white p-8">
      <h2 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">
        My Learning 📚
      </h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-400 text-center">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow-lg border border-white/20 transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30"
            >
              {/* Course Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-md">
                  {course.progress || 0}% completed
                </p>
              </div>

              {/* Course Details */}
              <h3 className="mt-4 text-lg font-bold">{course.title}</h3>
              <p className="text-gray-400 text-sm">Instructor: {course.instructor}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-3 mt-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>

              {/* Continue Button */}
              <a
                href={`/course-progress/${course._id}`}
                // course-progress /:courseId
                className="block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Continue Learning 🚀
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
