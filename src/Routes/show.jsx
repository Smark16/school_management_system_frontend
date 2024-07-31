import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Pages from "../Teacher/Pages/pages";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/navbar";
import Dashboard from "../Teacher/sections/dashboard/dashboard";
import Login from "../Authenticate/Login";
import Home from "@/Welcome/home";
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from "../Context/AuthContext";

import './show.css';

// teacher pages
import SetExams from "../Teacher/sections/exam/SetExams";
import Uploadwork from "../Teacher/sections/uploadwork/Uploadwork";
import Logout from "../Teacher/sections/Logout";
import Perfomance from "../Teacher/sections/perfomance/perfomance";
import Student from "@/Teacher/sections/student_list/Student";
import Questions from "@/Teacher/sections/student_list/Questions";
import ExamDetail from "@/Teacher/sections/exam/ExamDetail";
import Profile from "@/Teacher/sections/profile/Profile";

// student pages
import StudentPages from "@/Students/Pages/pages";
import ViewFiles from "@/Teacher/sections/uploadwork/ViewFiles";
import StudentDashboard from "@/Students/sections/dashboard/dashboard";
import Physics from "@/Students/sections/departments/Physics/Physics";
import Faqs from "@/Students/sections/faqs/Faqs";
import Results from "@/Students/sections/results/Results";
import Report from "@/Students/sections/reportCard/Report";
import StudentProfile from "@/Students/sections/profile/Profile";
import Exam from "@/Students/sections/departments/Physics/Exams/Exam";
import ExamQtn from "@/Students/sections/departments/Physics/Exams/ExamQtn";

//head teacher pages
import Headpages from "@/HeadTeacher/Pages/pages";
import HeadDashboard from "@/HeadTeacher/sections/dashboard/dashboard";
import Event from "@/HeadTeacher/sections/Event/Event";
import Staff from "@/HeadTeacher/sections/Staff/Staff";
import StudentManagement from "@/HeadTeacher/sections/Student/Student";
import HeadReport from "@/HeadTeacher/sections/Reports/Report";
import HeadLogout from "@/HeadTeacher/sections/Logout";
import HeadProfile from "@/HeadTeacher/sections/Profile/HeadProfile";
import Index from "@/Welcome/course-master";

export default function Show() {
  const { display } = useContext(AuthContext);
  return (
    <>

        <Navbar />
      <Routes>

        {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path="/index" element={<Index/>}/>

        {/* Teacher Routes */}
        <Route path="teacher/*" 
          element={
            <PrivateRoute>
              <div className="main bg-alert secondary">
                <div className={`page ${display ? 'show' : ''}`}>
                  <Pages />
                </div>
                <div className="route">

                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="set_exam" element={<SetExams/>}/>
                    <Route path="upload_work" element={<Uploadwork/>}/>
                    <Route path="perfomance" element={<Perfomance/>}/>
                    <Route path='student_list' element={<Student/>}/>
                    <Route path='question_answers/:id' element={<Questions/>}/>
                    <Route path='exam_details' element={<ExamDetail/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="view_uploaded_files" element={<ViewFiles/>}/>
                    <Route path="logout" element={<Logout/>}/>
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          } 
        />

        {/* Student Routes */}
        <Route path="student/*" 
          element={
            <PrivateRoute>
              <div className="main bg-alert secondary">
                <div className={`pages ${display ? 'come' : ''}`}>
                  <StudentPages />
                </div>
                <div className="route">
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard/>}/>
                    <Route path="department/:id" element={<Physics/>}/>
                    <Route path='results' element={<Results/>}/>
                    <Route path='report' element={<Report/>}/>
                    <Route path="faqs" element={<Faqs/>}/>
                    <Route path="exam_page/:id" element={<Exam/>}/>
                    <Route path="exam_questions/:id" element={<ExamQtn/>}/>
                    <Route path="profile" element={<StudentProfile/>}/>
                    <Route path="logout" element={<Logout/>}/>
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          } 
        />

        {/* Head Teacher Routes */}
        <Route path="headTeacher/*"
          element={
            <PrivateRoute>
              <Headpages />
              <Routes>
                <Route path='dashboard' element={<HeadDashboard />} />
                <Route path="event" element={<Event />} />
                <Route path="staff" element={<Staff />} />
                <Route path="student_management" element={<StudentManagement />} />
                <Route path="reports" element={<HeadReport />} />
                <Route path="profile" element={<HeadProfile />} />
                <Route path="logout" element={<HeadLogout />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
