import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseapi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] =
    useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
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
          console.log("Video uploaded successfully");
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

  useEffect(() => {
    if (isSuccess) {
        console.log("success")
    }
    if (error) {
        console.log("error")
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) toast.success(removeData.message);
  }, [removeSuccess]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl h-full bg-gray-800 p-10 rounded-lg shadow-xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold">Edit Lecture</h1>
            <p className="text-gray-400">Modify lecture details and save changes.</p>
          </div>
          <button
            disabled={removeLoading}
            onClick={removeLectureHandler}
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Removing...
              </>
            ) : (
              "Delete Lecture"
            )}
          </button>
        </div>

        {/* Lecture Details */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-lg font-medium mb-2">Lecture Title</label>
            <input
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              type="text"
              placeholder="Enter lecture title..."
              className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="block w-full text-lg text-gray-300 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer p-4 focus:ring-blue-500 focus:border-blue-500"
            />
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
        </div>
      </div>
    </div>
  );
};

export default LectureTab;