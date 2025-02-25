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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Learning</h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-500">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-4">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 text-lg font-bold">{course.title}</h3>
              <p className="text-gray-600">Instructor: {course.instructor}</p>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div
                  className="bg-teal-500 h-3 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{course.progress || 0}% completed</p>

              <a
                href={`/course/${course._id}`}
                className="block bg-teal-600 text-white mt-3 py-2 text-center rounded-md"
              >
                Continue Learning
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
