import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login';
import HeroSection from './Pages/student/HeroSection';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from './MainLayout/Layout';
import Courses from './Pages/student/Courses';
import Profile from './Pages/student/Profile';
import CourseDetail from './Pages/student/CourseDetail';
import Assignment from './Pages/student/Assignment';
import Dashboarad from './Pages/admin/Dashboarad';
import CreateCourse from './Pages/admin/course/CreateCourse';

import CreateLecture from './Pages/admin/Lectures/CreateLecture';
import EditLectures from './Pages/admin/Lectures/EditLectures';
import Lecture from './Pages/admin/Lectures/Lecture';
import EditCourse from './Pages/admin/course/EditCourse';
import CourseTable from './Pages/admin/course/CourseTable';
import CourseProgress from './Pages/student/CourseProgress';


const appRouter=createBrowserRouter([

  {
    path: '/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:(
        <>
          <HeroSection/>
          <Courses/>
          </>
          
        )
      },
      {
        path:'profile',
        element:(
          <>
          <Profile/>
          </>
        )
      }, {
        path:'course-detail/:courseId',
        element:(
          <>
          <CourseDetail/>
          </>
        )
      },
      {
        path: "course-progress/:courseId",
        element: (
          
            
            <CourseProgress />
           
       
        ),},
      {
        path:'assignment',
        element:(
          <>
          <Assignment/>
          </>
        )
      }

    ]
  },
  {
    path:'login',
    element:<Login/>
  },
  // admin routes
  {
    path:"admin",
    element:<Dashboarad/>
  },
  {
    path:"course/create", 
    element:<CreateCourse/> //<AddCourse>
  },
  {
    path:"course/:courseId",
    element:<EditCourse/>
  },
  {
    path: "course",
    element: <CourseTable />,
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
    path: "lecture",
    element: <Lecture />,
  },
])


function App() {
  return (
    
      <main>
        <RouterProvider router={appRouter}/>
      </main>
    
  );
}

export default App;
