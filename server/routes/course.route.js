import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controller/course.controller.js";
import upload from "../utils/multer.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
// import {CourseProgress} from "../models/courseProgress.model.js";
// import { CourseProgress } from "..models/courseProgress.js";
import { CourseProgress } from "../models/courseProgress.js";
const router=express.Router()

router.route("/").post(isAuthenticated,createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
router.get("/enrolled/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all courses the user is enrolled in
        const enrolledCourses = await Course.find({ enrolledStudents: userId }).populate("creator", "name");

        if (!enrolledCourses.length) {
            return res.status(404).json({ message: "No enrolled courses found" });
        }

        // Fetch progress for each enrolled course
        const coursesWithProgress = await Promise.all(
            enrolledCourses.map(async (course) => {
                const progressDoc = await CourseProgress.findOne({
                    userId,
                    courseId: course._id
                });

                // Get the actual total lectures from the course model
                const totalLectures = course.lectures.length;
                let progressPercentage = 0;

                if (progressDoc && totalLectures > 0) {
                    const completedLectures = progressDoc.lectureProgress.filter(lecture => lecture.viewed).length;
                    progressPercentage = Math.round((completedLectures / totalLectures) * 100);
                }

                return {
                    _id: course._id,
                    title: course.courseTitle,
                    thumbnail: course.courseThumbnail,
                    instructor: course.creator.name,
                    progress: progressPercentage, // Corrected progress calculation
                };
            })
        );

        res.json({ courses: coursesWithProgress });
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        res.status(500).json({ message: "Error fetching enrolled courses" });
    }
});


  

export default router;
