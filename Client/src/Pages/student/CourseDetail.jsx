import { PlayCircle, User, Clock, BookOpen, BarChart2 } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';

const CourseDetail = () => {
  const course = {
    title: "Advanced UI Design",
    subtitle: "Master modern interface design patterns",
    instructor: "Sarah Thompson",
    stats: {
      duration: "8 hours",
      lessons: 24,
      level: "Intermediate",
      students: "2.4k"
    },
    description: `
      <p class="mb-4">Transform your design workflow with industry-proven techniques.</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Figma and prototyping mastery</li>
        <li>Design system creation</li>
        <li>User experience principles</li>
        <li>Animation fundamentals</li>
      </ul>
    `,
    videoPreview: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chapters: [
      { title: "Introduction to Modern UI", duration: "32min" },
      { title: "Design Systems Deep Dive", duration: "47min" },
      { title: "Microinteractions", duration: "29min" },
      { title: "Accessibility Patterns", duration: "38min" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white mt-[30px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-xl opacity-90">{course.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
              <User className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Instructor</p>
                <p className="font-medium">{course.instructor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Clock} title="Duration" value={course.stats.duration} />
          <StatCard icon={BookOpen} title="Lessons" value={course.stats.lessons} />
          <StatCard icon={BarChart2} title="Level" value={course.stats.level} />
          <StatCard icon={User} title="Students" value={course.stats.students} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Video Preview */}
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gray-700">
              <ReactPlayer
                url={course.videoPreview}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </div>

          {/* Course Description */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <div 
              className="prose text-gray-300"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Curriculum */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">{chapter.title}</span>
                  </div>
                  <span className="text-sm text-gray-400">{chapter.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm opacity-85">Full Course Access</p>
                <p className="text-3xl font-bold">$149</p>
              </div>
              <div className="text-right">
                <p className="text-sm line-through opacity-75">$299</p>
                <p className="text-sm font-medium">50% off</p>
              </div>
            </div>
            <button className="w-full bg-white text-purple-700 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all">
              Enroll Now
            </button>
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


// import React from "react";
// import { PlayCircle } from "lucide-react";
// import ReactPlayer from "react-player";

// const CourseDetail = () => {
//   return (
//     <div className="bg-black text-white min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <div className="relative h-[50vh] flex items-center justify-center text-center bg-gradient-to-r from-gray-900 to-black">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 p-5">
//           <h1 className="text-4xl font-bold">Mastering Next.js</h1>
//           <p className="text-lg text-gray-300 mt-2">Build scalable web apps with React & Next.js</p>
//           <p className="mt-2 text-gray-400">By <span className="text-blue-400 underline">John Doe</span></p>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Left Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Course Description */}
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-70">
//             <h2 className="text-2xl font-bold">What You'll Learn</h2>
//             <p className="text-gray-300 mt-2">
//               Learn the ins and outs of Next.js, from server-side rendering to API routes.
//             </p>
//             <ul className="mt-4 space-y-2 text-gray-400">
//               <li>✅ Building Server-Side Rendered Apps</li>
//               <li>✅ Static Site Generation</li>
//               <li>✅ Optimizing Performance</li>
//               <li>✅ Deploying on Vercel</li>
//             </ul>
//           </div>

//           {/* Course Content */}
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-70">
//             <h2 className="text-2xl font-bold">Course Content</h2>
//             <div className="mt-4 space-y-3">
//               {["Introduction", "Setting up Next.js", "Routing & Navigation", "API Routes"].map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-gray-300">
//                   <PlayCircle size={16} className="text-blue-400" />
//                   <p>{lecture}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="sticky top-20 space-y-6">
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-70">
//             <div className="w-full aspect-video rounded-lg overflow-hidden">
//               <ReactPlayer
//                 width="100%"
//                 height="100%"
//                 url="https://www.youtube.com/watch?v=example"
//                 controls={true}
//               />
//             </div>
//             <h3 className="text-lg font-semibold mt-4">Course Price</h3>
//             <p className="text-2xl font-bold text-green-400">₹499</p>
//             <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 transition-all py-2 rounded-lg font-semibold">
//               Enroll Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

