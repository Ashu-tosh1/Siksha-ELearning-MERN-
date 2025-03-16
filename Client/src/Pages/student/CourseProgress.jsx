import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/CourseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, PlayCircle } from "lucide-react";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [inCompleteCourse] = useInCompleteCourseMutation();
  const [completeCourse] = useCompleteCourseMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const initialLecture = currentLecture || courseDetails.lectures?.[0];

  const isLectureCompleted = (lectureId) => progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(courseId);
      refetch();
    } catch (error) {
      console.error("Failed to mark as completed.");
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await inCompleteCourse(courseId);
      refetch();
    } catch (error) {
      console.error("Failed to mark as incomplete.");
    }
  };

  return (
    <div className="h-screen p-6 bg-[#0D0D0D] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">{courseTitle}</h1>
        <button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
            completed
              ? "border border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {completed ? (
            <span className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" /> Completed
            </span>
          ) : (
            "Mark as Completed"
          )}
        </button>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        {/* Video Player */}
        <div className="flex-1 h-[620px] bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-800">
          <video
            src={currentLecture?.videoUrl || initialLecture?.videoUrl}
            controls
            className="w-full h-[520px] rounded-lg"
            onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
          />
          <h3 className="mt-4 text-lg font-semibold">
            Lecture {courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture?._id)) + 1}
            : {currentLecture?.lectureTitle || initialLecture?.lectureTitle}
          </h3>
        </div>

        {/* Lecture List */}
        <div className="w-full md:w-2/5 bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-800">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Course Lectures</h2>
          <div className="space-y-3 max-h-[450px] overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <div
                key={lecture._id}
                className={`flex items-center justify-between p-4 rounded-lg transition cursor-pointer border ${
                  lecture._id === currentLecture?._id ? "bg-gray-800 border-blue-500" : "bg-gray-900 border-gray-700"
                } hover:bg-gray-800`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <div className="flex items-center gap-3">
                  {isLectureCompleted(lecture._id) ? (
                    <CheckCircle2
                      size={24}
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleLectureProgress(lecture._id)}
                    />
                  ) : (
                    <CirclePlay size={24} className="text-gray-500" />
                  )}
                  <h3 className="text-md font-medium">{lecture.lectureTitle}</h3>
                </div>
                {lecture._id === currentLecture?._id && <PlayCircle size={24} className="text-blue-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
