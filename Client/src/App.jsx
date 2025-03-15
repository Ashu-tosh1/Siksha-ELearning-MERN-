import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux"; // Import Redux hook

import Login from "./Pages/Login";
import HeroSection from "./Pages/student/HeroSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./MainLayout/Layout";
import Courses from "./Pages/student/Courses";
import Profile from "./Pages/student/Profile";
import CourseDetail from "./Pages/student/CourseDetail";

import CreateCourse from "./Pages/admin/course/CreateCourse";
import CreateLecture from "./Pages/admin/Lectures/CreateLecture";
import EditLectures from "./Pages/admin/Lectures/EditLectures";

import EditCourse from "./Pages/admin/course/EditCourse";
import CourseTable from "./Pages/admin/course/CourseTable";
import CourseProgress from "./Pages/student/CourseProgress";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import Dashboard from "./Pages/admin/Dashboarad";
import Footer from "./Pages/student/Footer";
import MyLearning from "./Pages/student/MyLearning";
import SearchPage from "./Pages/student/SearchPage";
import Trial from "./Pages/admin/trial";

function App() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const isAdmin = user?.role === "instructor"; // Check if user is admin
  console.log(user);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: isAdmin ? <Dashboard /> : (
            <>
              <HeroSection />
              <Courses />
              <Footer />
            </>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "course/search",
          element: <SearchPage />,
        },
        {
          path: "my-learning",
          element: (
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:courseId",
          element: (
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <PurchaseCourseProtectedRoute>
                <CourseProgress />
              </PurchaseCourseProtectedRoute>
            </ProtectedRoute>
          ),
        },

        // ✅ Admin Routes
        {
          path: "/",
          element: (
            <AdminRoute>
              <Layout />
            </AdminRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course",
              element: <CourseTable />,
            },
            {
              path: "course/create",
              element: <CreateCourse />,
            },
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLectures />,
            },
            {
              path: "trial",
              element: < Trial  />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
