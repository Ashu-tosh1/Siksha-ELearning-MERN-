import { PlayCircle, User, Clock, BookOpen, BarChart2, Lock } from "lucide-react";

import React from 'react';
import ReactPlayer from 'react-player';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { useNavigate, useParams } from 'react-router-dom';
import BuyCourseButton from '@/components/BuyCourseButton';
import { Button } from '@/components/ui/button';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;

  console.log(course);
  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white mt-[30px]">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{course?.courseTitle}</h1>
              <p className="text-xl opacity-90">Course Sub-title</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
              <User className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Instructor</p>
                <p className="font-medium">{course?.creator?.name || "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Clock} title="Duration" value={course?.courseDuration
 || "N/A"} />
          <StatCard icon={BookOpen} title="Lessons" value={course?.lectures?.length || 0} />
          <StatCard icon={BarChart2} title="Level" value={course?.courseLevel
 || "All Levels"} />
          <StatCard icon={User} title="Students" value={course?.enrolledStudents?.length || 0} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gray-700">
              <ReactPlayer
                url={course?.lectures?.[0]?.videoUrl || ""}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <div 
              className="prose text-gray-300"
              dangerouslySetInnerHTML={{ __html: course?.description }}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
            <div className="space-y-4">
              {course?.lectures?.map((lecture, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {purchased ? <PlayCircle className="w-5 h-5 text-purple-400" /> : <Lock className="w-5 h-5 text-red-400" />}
                    <span className="font-medium">{lecture.lectureTitle}</span>
                  </div>
                  <span className="text-sm text-gray-400">{lecture.duration || "N/A"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm opacity-85">Full Course Access</p>
                <p className="text-3xl font-bold">₹{course?.coursePrice}</p>
              </div>
            </div>
            {purchased ? (
              <Button onClick={handleContinueCourse} className="w-full">
                Continue Course
              </Button>
            ) : (
              <BuyCourseButton courseId={courseId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center gap-3">
    <div className="p-2 bg-gray-700 rounded-lg">
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  </div>
);

export default CourseDetail;



