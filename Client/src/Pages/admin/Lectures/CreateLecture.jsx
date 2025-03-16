import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseapi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BarChart, BookOpen, BookPlus } from "lucide-react";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();
  const step = 3; // This is Component 3

  const [createLecture, { isLoading, isSuccess, error }] = useCreateLectureMutation();
  const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (error) {
      console.error("Error creating lecture", error);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex h-[91.2vh] bg-black border-t border-gray-700 text-white mt-[64px]">
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
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md hover:bg-gray-800 transition text-sm"
                  >
                    🔹 Add Basic Details
                  </button>
                </li>
                <li>
                  <button
                    // onClick={() => navigate("/admin/courses/add/step2")}
                    className="flex items-center gap-2 p-2 w-full text-left rounded-md bg-gray-800 transition text-sm"
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
        className="flex-1 p-10 relative"
      >
        {/* Step Indicator (Top-Right) */}
        <motion.div
          className="absolute top-14 right-[150px] flex items-center space-x-2  px-4 py-2  shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 3 ? "bg-blue-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 4 ? "bg-blue-500" : "bg-gray-600"}`}></div>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-[#121212] shadow-lg rounded-lg p-6 border border-gray-800">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Add a New Lecture</h1>
          {/* <p className="text-sm text-gray-400 mb-6">Enter the lecture title and create a new lecture.</p> */}
          <p className="text-lg text-gray-400 mb-6">Click on the Edit button to edit or add or remove video for the lecture</p>

          {/* Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="text-gray-400">Lecture Title</label>
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter Lecture Title"
              required
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-end mt-6"
          >
            <button
              onClick={() => navigate(`/course`)}
              className="bg-gray-700 px-6 py-2 rounded-md hover:bg-gray-600 transition-all mr-2"
            >
              Back to Course
            </button>
            <button
              onClick={createLectureHandler}
              className="bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Lecture"}
            </button>
          </motion.div>

          {/* Lecture List */}
          <div className="mt-10">
            {lectureLoading ? (
              <p className="text-gray-400">Loading lectures...</p>
            ) : lectureError ? (
              <p className="text-red-500">Failed to load lectures.</p>
            ) : lectureData?.lectures?.length === 0 ? (
              <p className="text-gray-400">No lectures available.</p>
            ) : (
              lectureData.lectures.map((lecture, index) => (
                <motion.div
                  key={lecture._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Lecture lecture={lecture} courseId={courseId} index={index} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateLecture;
