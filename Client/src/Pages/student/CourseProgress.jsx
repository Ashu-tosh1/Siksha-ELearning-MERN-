
  import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from "@/features/api/CourseProgressApi";
import { CheckCircle2, CirclePlay } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  
  const CourseProgress = () => {
    const params = useParams();
    const courseId = params.courseId;
    const { data, isLoading, isError, refetch } =
      useGetCourseProgressQuery(courseId);
  
    const [updateLectureProgress] = useUpdateLectureProgressMutation();
    const [inCompleteCourse] = useInCompleteCourseMutation();
    const [completeCourse] = useCompleteCourseMutation();
  
    useEffect(() => {
      console.log(data);
    }, [data]);
  
    const [currentLecture, setCurrentLecture] = useState(null);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load course details</p>;
  
    const { courseDetails, progress } = data.data;
    const { courseTitle } = courseDetails;
  
    const initialLecture =
      currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);
  
    const isLectureCompleted = (lectureId) => {
      return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    };
  
    const handleLectureProgress = async (lectureId) => {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    };
  
    const handleSelectLecture = (lecture) => {
      setCurrentLecture(lecture);
      handleLectureProgress(lecture._id);
    };
  
    const handleInCompleteLecture = async (lectureId) => {
      await inCompleteCourse({ courseId, lectureId });
      refetch();
    };
  
    const handleCompleteAllLectures = async () => {
      await completeCourse(courseId);
      refetch();
    };
  
    const allLecturesCompleted = courseDetails.lectures.every((lecture) =>
      isLectureCompleted(lecture._id)
    );
  
    return (
      <div className="h-screen p-4 bg-gray-950 text-white  flex flex-col">
        <div className="flex justify-between mb-4 mt-16">
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
          <button 
            onClick={handleCompleteAllLectures} 
            className="px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            {allLecturesCompleted ? "Course Completed" : "Mark All as Completed"}
          </button>
        </div>
  
        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="flex-1 h-full rounded-lg shadow-lg p-4 bg-gray-800">
            <div>
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-full md:rounded-lg"
                onPlay={() =>
                  handleLectureProgress(currentLecture?._id || initialLecture._id)
                }
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-lg">
                {`Lecture ${
                  courseDetails.lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id)
                  ) + 1
                } : ${
                  currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-700 md:pl-4 pt-4 md:pt-0">
            <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
            <div className="flex-1 overflow-y-auto">
              {courseDetails?.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition transform rounded-lg p-4 border border-gray-600 ${
                    lecture._id === currentLecture?._id
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  } `}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-500 mr-2 cursor-pointer"
                          onClick={() => handleInCompleteLecture(lecture._id)}
                        />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <h3 className="text-lg font-medium">{lecture.lectureTitle}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseProgress;
