import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const Course = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-72 h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      onMouseMove={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ rotateY: isHovered ? 180 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Front Side */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://imgs.search.brave.com/047STiN-U7j9FUfVfYxHWb-dRpAW3rakMsdHXk8rUTM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5i/bG9nLndlYmt1bC5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wMi9u/ZXh0LWpzLWltYWdl/LWNvbXBvbmVudC5w/bmc"
          alt="Course"
          className="w-full h-40 object-cover rounded-t-2xl"
        />
        <h2 className="text-white text-xl font-bold mt-3">Course Title</h2>
        <p className="text-gray-400 text-sm">By Creator Name</p>
        <span className="text-green-400 font-semibold text-lg mt-2">₹ Price</span>
      </motion.div>

      {/* Back Side */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Eye className="text-white w-12 h-12 mb-3" />
        <div class="scale-x-[-1]">This text is mirrored!</div>

        <motion.p
          className="text-gray-300 text-sm opacity-0"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Course;
