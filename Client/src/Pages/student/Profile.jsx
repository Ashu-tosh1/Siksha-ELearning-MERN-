import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, BookOpen, X } from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authapi";

const Profile = () => {
  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", photo: null });

  if (isLoading) return <h1 className="text-white">Loading...</h1>;
  if (isError || !data) return <h1 className="text-white">Failed to load profile</h1>;

  const { name, email, photoUrl, role, courses = [] } = data.user;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleUpdateProfile = async () => {
    const form = new FormData();
    form.append("name", formData.name || name);
    form.append("email", formData.email || email);
    if (formData.photo) form.append("profilePhoto", formData.photo);

    try {
      await updateUser(form);
      refetch(); // Refresh profile data after update
      setIsEditing(false); // Close modal
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Picture */}
        <motion.img
          src={photoUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt={name}
          className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Name & Email */}
        <h2 className="text-white text-3xl font-bold mt-4">{name}</h2>
        <p className="text-gray-400 text-lg mt-1 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-teal-400" /> {email}
        </p>
        <p className="text-gray-500 mt-2">Role: {role}</p>

        {/* Learning Section */}
        <div className="w-full mt-8">
          <h3 className="text-teal-400 text-xl font-semibold mb-4">My Learning Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="p-5 bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-8 h-8 text-teal-400" />
                    <h4 className="text-white text-lg font-semibold">{course.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{course.progress}% Completed</p>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div
                      className="bg-teal-400 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">No enrolled courses yet.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <motion.button
            className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-500 transition duration-300"
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </motion.button>

          <motion.button
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white font-semibold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)}>
                <X className="text-white w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={name}
                onChange={handleInputChange}
                className="bg-gray-700 p-2 rounded-md text-white w-full"
              />

              <label className="text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={email}
                onChange={handleInputChange}
                className="bg-gray-700 p-2 rounded-md text-white w-full"
              />

              <label className="text-gray-400">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="bg-gray-700 p-2 rounded-md text-white w-full"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
                onClick={handleUpdateProfile}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;






// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="bg-black min-h-screen flex items-center justify-center p-6 mt-28">
//       <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
//         {/* Profile Header */}
//         <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-500">
//           {/* Avatar */}
//           <div className="absolute -bottom-16 left-8 transform hover:scale-110 transition-transform duration-300">
//             <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
//               <img
//                 src="https://github.com/shadcn.png"
//                 alt="Student Avatar"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="px-8 pt-20 pb-8">
//           {/* Name and Bio */}
//           <h1 className="text-3xl font-bold text-white">Ashutosh Patro</h1>
//           <p className="mt-2 text-gray-400">Web Developer | Lifelong Learner</p>
//           <p className="mt-4 text-gray-300">
//             Passionate about building scalable web applications and learning new technologies.
//           </p>

//           {/* Stats */}
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {/* Courses Enrolled */}
//             <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300">
//               <h3 className="text-lg font-semibold text-white">Courses Enrolled</h3>
//               <p className="text-2xl font-bold text-purple-500">12</p>
//             </div>

           

//             {/* Achievements */}
//             <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300">
//               <h3 className="text-lg font-semibold text-white">Courses completed</h3>
//               <p className="text-2xl font-bold text-green-500">5</p>
//             </div>
//             <div>
//           <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 w-28 rounded-xl mt-[23px]"> Edit </button>

//           </div>
//           </div>

         
         
//           {/* Social Links */}
//           <div className="mt-8 flex space-x-4">
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;