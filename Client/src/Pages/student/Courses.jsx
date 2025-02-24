import React from "react";
import { useGetPublishedCourseQuery } from "@/features/api/courseapi";
import Course from "./Course";


const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  console.log(data)
  if (isError) return <h1 className="text-center text-red-500">Some error occurred while fetching courses.</h1>;

  return (
    <div className="bg-black dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-extrabold text-4xl text-center text-white dark:text-white mb-12">Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            data?.courses && data.courses.map((course, index) => <Course key={index} course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden p-4 border border-gray-200 dark:border-gray-700">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
      <div className="mt-4 space-y-3">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
          </div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
        </div>
        <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
      </div>
    </div>
  );
};
