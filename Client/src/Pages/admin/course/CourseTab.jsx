// import RichTextEditor from "@/components/RichTextEditor";
// import RichTextEditor from "@/components/RichTextEditor";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/features/api/courseapi";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const { courseId } = useParams();
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId);
  const [publishCourse] = usePublishCourseMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: null, // Ensuring no accidental empty string assignment
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    if (courseByIdData?.course.lectures.length === 0) {
    //   return toast.error("Add at least one lecture before publishing.");
    console.log("error")
    }
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        // toast.success(response.data.message);
        console.log("success")
      }
    } catch (error) {
    //   toast.error("Failed to publish or unpublish course");
    console.log("error")
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success(data?.message || "Course updated.");
    if (error) toast.error(error?.data?.message || "Failed to update course");
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1 className="text-center text-xl text-white">Loading...</h1>;

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-gray-900 rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Basic Course Information</h1>
            <p className="mt-2 text-gray-400">Make changes to your course. Click save when you're done.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <button
              disabled={courseByIdData?.course.lectures.length === 0}
              onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
              className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
            </button>
            <button className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md">
              Remove Course
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-gray-400 font-medium">Course Thumbnail</label>
          <input type="file" onChange={selectThumbnail} accept="image/*" className="w-full p-3 bg-gray-800 rounded-md border border-gray-600" />
          {previewThumbnail && <img src={previewThumbnail} className="h-64 my-4 rounded-md object-cover" alt="Course Thumbnail" />}

          <div className="flex justify-end gap-4 mt-6">
            <button onClick={() => navigate("/admin/course")} className="px-6 py-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">Cancel</button>
            <button disabled={isLoading} onClick={updateCourseHandler} className="px-6 py-3 bg-green-600 rounded-md hover:bg-green-700 transition flex items-center text-white">
              {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait</>) : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTab;
