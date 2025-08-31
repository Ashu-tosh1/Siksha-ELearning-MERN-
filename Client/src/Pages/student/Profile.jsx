import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, X, User } from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authapi";

const Profile = () => {
  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", photo: null });
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  
  useEffect(() => {
    if (data?.user?._id) {
      fetchEnrolledCourses(data.user._id);
    }
  }, [data]);

  const fetchEnrolledCourses = async (userId) => {
    try {
      const response = await axios.get(`https://client-khaki-eight.vercel.app/api/v1/course/enrolled/${userId}`, {
        withCredentials: true,
      });
      setEnrolledCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  if (isLoading) return <h1 className="text-white">Loading...</h1>;
  if (isError || !data) return <h1 className="text-white">Failed to load profile</h1>;

  const { name, email, photoUrl, role } = data.user;

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

        {/* Profile Details */}
        <h2 className="text-white text-3xl font-bold mt-4">{name}</h2>
        <p className="text-gray-400 text-lg mt-1 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-teal-400" /> {email}
        </p>
        <p className="text-gray-500 mt-2">Role: {role}</p>

        {/* My Enrolled Courses */}
        <div className="w-full mt-8">
          <h3 className="text-teal-400 text-xl font-semibold mb-4">My Enrolled Courses</h3>
          <div className="space-y-4">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <motion.div
                  key={course._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{course.progress || 0}% completed</p>
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700 p-2 rounded-md text-white w-full"
              />

              <label className="text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-700 p-2 rounded-md text-white w-full"
              />

              <label className="text-gray-400">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
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
                onClick={async () => {
                  const form = new FormData();
                  form.append("name", formData.name || name);
                  form.append("email", formData.email || email);
                  if (formData.photo) form.append("profilePhoto", formData.photo);
                  
                  try {
                    await updateUser(form);
                    refetch();
                    setIsEditing(false);
                  } catch (error) {
                    console.error("Update failed:", error);
                  }
                }}
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
