import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
// import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";


export const register=async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email.",
                
            })

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        
        });
        return res.status(201).json({
            success: true,
            message: "account created successful"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
}

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`);
       

        
    }   
     catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}

export const getUserProfile=async (req,res)=>{
    try {
        const userId=req.id;
        const user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(200).json({
                message:'profile not found',
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to Load user"
    })
    }
}
//logic for photo and name upload
export const updateProfile = async (req, res) => {
    try {
        console.log("Received file:", req.file);
        console.log("Received body:", req.body);

        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        if (!profilePhoto) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Cloudinary URL is already provided by Multer
        const photoUrl = profilePhoto.path;

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, photoUrl },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully.",
        });

    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return res.status(500).json({ message: "Failed to update profile" });
    }
};
