import { usePublishCourseMutation } from "@/features/api/courseapi";
import { useState } from "react";

const PublishCourseButton = ({ courseId, isPublished, lectureCount, refetch }) => {
  const [publishCourse] = usePublishCourseMutation();
  const [loading, setLoading] = useState(false);

  const handlePublishStatus = async () => {
    if (lectureCount === 0) {
      console.log("Error: Add lectures before publishing!");
      return;
    }

    setLoading(true);
    try {
      const action = isPublished ? "false" : "true";
      const response = await publishCourse({ courseId, query: action });

      if (response.data) {
        refetch();
        console.log("Success: Course status updated!");
      }
    } catch (error) {
      console.log("Error updating publish status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={lectureCount === 0 || loading}
      onClick={handlePublishStatus}
      className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Updating..." : isPublished ? "Unpublish" : "Publish"}
    </button>
  );
};

export default PublishCourseButton;
