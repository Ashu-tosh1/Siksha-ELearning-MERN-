import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js"; // Ensure you configure Cloudinary
import cloudinary from "./cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Change this as needed
    allowed_formats: ["jpg", "png", "jpeg", "mp4"],
  },
});

const upload = multer({ storage });

export default upload;
