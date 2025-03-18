import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseapi";
import axios from "axios";
import { Loader2, Upload, Trash2 } from "lucide-react";
import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MEDIA_API = "http://localhost:3000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [editLecture, { isLoading, isSuccess, error }] = useEditLectureMutation();
  const [removeLecture, { isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();

  // Drag & Drop Handlers
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFile = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
        }
      } catch (error) {
        console.log("Error uploading video");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  return (
    <div className="h-[70vh] w-[70vw] flex items-center justify-center  text-white p-6">
      <div className="w-full max-w-4xl bg-[#121212] p-8 rounded-lg shadow-lg border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold">Edit Lecture</h1>
          <button
            disabled={removeLoading}
            onClick={removeLectureHandler}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Removing...    <motion.aside
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
              </>
            ) : (
              <>
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Lecture
              </>
            )}
          </button>
        </div>

        {/* Lecture Details */}
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Lecture Title</label>
            <input
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              type="text"
              placeholder="Enter lecture title..."
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
            />
          </div>

          {/* Drag & Drop File Upload */}
          <div>
            <label className="block text-lg font-medium mb-2">Upload Video</label>
            <div
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {uploadVideoInfo ? (
                <p className="text-gray-300">{uploadVideoInfo.videoUrl.split("/").pop()}</p>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-gray-400">Drag & drop a file here or</span>
                  <label className="text-blue-400 underline cursor-pointer">
                    Click to upload
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => uploadFile(e.target.files[0])}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {mediaProgress && (
            <div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-lg mt-2">{uploadProgress}% uploaded</p>
            </div>
          )}

          {/* Is Free Toggle */}
          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-600 peer-checked:bg-blue-500 rounded-full transition duration-200 relative">
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-1 transition-all duration-200 ${
                    isFree ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </label>
            <span className="text-lg">Is this video FREE?</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button
            disabled={isLoading}
            onClick={editLectureHandler}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
 {/* <Link to={`/admin/course/${courseId}/lecture`}>
                                <button className=" px-3 py-1 rounded-full hover:bg-blue-600 transition">
                                    ⬅
                                </button>
                            </Link> */}

          <Link to={`/course/${courseId}/lecture`}>
          <button className="bg-blue-600 ml-4 px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center text-lg">Return to Lectures</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default LectureTab;
