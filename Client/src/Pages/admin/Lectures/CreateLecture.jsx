import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseapi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lecture from "./Lecture";


const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  console.log("Course ID:", courseId);
  console.log("Fetching lectures for:", courseId);
  
  
  const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
  const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

  console.log("Lecture Data:", lectureData);
  if (lectureError) {
    console.error("API Error:", lectureError);
  }
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      console.log("Lecture created successfully");
    }
    if (error) {
      console.error("Error creating lecture", error);
    }
  }, [isSuccess, error]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Add a New Lecture</h1>
        <p className="text-sm text-gray-400 mb-6">Enter the lecture title and create a new lecture.</p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400">Lecture Title</label>
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter Lecture Title"
              required
            />
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate(`/admin/course/${courseId}`)}
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
          </div>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <p className="text-gray-400">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures.</p>
          ) : lectureData?.lectures?.length === 0 ? (
            <p className="text-gray-400">No lectures available.</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
                <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
