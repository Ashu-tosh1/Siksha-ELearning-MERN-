import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/${courseId}/lecture/${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-md my-2">
      <h1 className="font-bold">
        Lecture {index + 1}: {lecture.lectureTitle}
      </h1>
      <button
        onClick={goToUpdateLecture}
        className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
    </div>
  );
};

export default Lecture;