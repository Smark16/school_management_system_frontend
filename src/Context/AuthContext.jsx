import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import '@/components/nav.css';

const loginurl = 'https://school-management-system-backend-u6m8.onrender.com/school/';
const Student_registerurl = 'https://school-management-system-backend-u6m8.onrender.com/school/student_register';
const teacher_registerUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/teacher_register';
const submissionUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/exams';
const teacherUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/teachers';
const studentsUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/students';
const departmentsUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/departments';
const examUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/exams';
const eventsUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/upcoming_events';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem('authtokens')) || null);
  const [user, setUser] = useState(() => (authTokens ? jwtDecode(authTokens.access) : null));
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState(user ? user.is_teacher : false);
  const [student, setStudent] = useState(user ? user.is_student : false);
  const [head, setHead] = useState(user ? user.is_headteacher : false);
  const [display, setDisplay] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [questionAns, setQuestionAns] = useState([]);
  const [studentInfo, setStudentInfo] = useState('');
  const [examArray, setExamArray] = useState([]);
  const [departmentInfo, setDepartmentInfo] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [fileName, setFileName] = useState('');
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [events, setEvents] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [usernameError, setUsernameError] = useState([]);
  const [studentNoError, setStudentNoError] = useState([]);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [noActiveAccount, setNoActiveAccount] = useState('')

  const navigate = useNavigate();

  // display side nav
  const handleDisplay = () => {
    setDisplay(!display);
  };

  // handle login
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(loginurl, { username, password });
      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        setJustLoggedIn(true);
        const checkMember = jwtDecode(data.access);
        const decodedStaff = checkMember.is_teacher;
        const decodedStudent = checkMember.is_student;
        const decodedHead = checkMember.is_headteacher;

        localStorage.setItem('authtokens', JSON.stringify(data));
        if (decodedStudent) navigate('/student/dashboard');
        if (decodedStaff) navigate('/teacher/dashboard');
        if (decodedHead) navigate('/headTeacher/dashboard');
        showSuccessAlert('Login successful');
      } else {
        showErrorAlert('Please provide correct username/password');
      }
    } catch (err) {
      console.log('Error', err);
      showErrorAlert('Please provide correct username/password');
      if(err.response.data.detail){
        setNoActiveAccount(err.response.data.detail)
      }
    }
  };

  // handle register
  const registerUser = async (name, reg_no, student_no, password, dob, year_of_enrollment) => {
    try {
      const response = await axios.post(Student_registerurl, {
        name,
        reg_no,
        student_no,
        password,
        dob,
        year_of_enrollment
      });
      console.log(response);
      if (response.status === 201) {
        showSuccessAlert('Registration successful');
      } else {
        showErrorAlert(`An Error occurred: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.password) {
          setPasswordError(error.response.data.password);
        }
        if (error.response.data.username) {
          setUsernameError(error.response.data.username);
        }
        if (error.response.data.student_no) {
          setStudentNoError(error.response.data.student_no);
        }

        showErrorAlert('There was a server issue');
      }
    }
  };

  const registerTeacher = async (name, department, email, password) => {
    try {
      const response = await axios.post(teacher_registerUrl, {
        name,
        department,
        email,
        password,
      });
      // console.log(response);
      if (response.status === 201) {
        showSuccessAlert('Registration successful');
      } else {
        showErrorAlert(`An Error occurred: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.password) {
          setPasswordError(error.response.data.password);
        }
        if (error.response.data.username) {
          setUsernameError(error.response.data.username);
        }
        showErrorAlert('There was a server issue');
      }
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authtokens');
    showSuccessAlert('You have been logged out').then(() => {
      navigate('/login');
    });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'success',
      timer: 6000,
      toast: true,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: true,
      customClass: {
        popup: 'custom-swal-popup'
      }
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'error',
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: true
    });
  };

  // Fetch data functions
  const fetchData = async () => {
    try {
      const response = await axios(submissionUrl);
      if (response.status === 200) {
        setSubmissions(response.data);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios(examUrl);
      setExams(response.data);
    } catch (err) {
      console.log('There was an error', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios(studentsUrl);
      setStudents(response.data);
      setTotalStudents(response.data.length);
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  const fetchTeacherDepartment = async () => {
    try {
      const response = await axios(teacherUrl);
      setTeachers(response.data);
    } catch (err) {
      console.log('Server error', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios(departmentsUrl);
      setDepartments(response.data);
    } catch (err) {
      console.log('There was an error', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios(eventsUrl);
      setEvents(response.data);
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  useEffect(() => {
    fetchTeacherDepartment();
    fetchDepartments();
    fetchExams();
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (authTokens) {
      const decodedUser = jwtDecode(authTokens.access);
      setUser(decodedUser);
      setStaff(decodedUser.is_teacher);
      setStudent(decodedUser.is_student);
      setHead(decodedUser.is_headteacher);
      if (justLoggedIn) {
        if (decodedUser.is_teacher) {
          navigate('/teacher/dashboard');
          setStaff(true)
        } else if (decodedUser.is_student) {
          navigate('/student/dashboard');
          setStudent(true)
        } else if (decodedUser.is_headteacher) {
          navigate('/headTeacher/dashboard');
          setHead(true)
        }
        setJustLoggedIn(false);
      }
    }
    setLoading(false);
  }, [authTokens, justLoggedIn]);

  const handleQuestions = (id) => {
    const submission = submissions.find((sub) => sub.id === id);
    if (submission) {
      setExamArray(submission);
      setQuestionAns(submission.questions);
      setStudentInfo(submission.student);
      setDepartmentInfo(submission.department);
      navigate(`/teacher/question_answers/${id}`);
    }
  };

  const contextData = {
    loginUser,
    logoutUser,
    authTokens,
    setAuthTokens,
    staff,
    user,
    setUser,
    student,
    handleDisplay,
    display,
    submissions,
    handleQuestions,
    questionAns,
    studentInfo,
    examArray,
    departmentInfo,
    teachers,
    totalStudents,
    fileName,
    setFileName,
    students,
    setStudents,
    departments,
    setDepartments,
    exams,
    head,
    events,
    usernameError,
    passwordError,
    studentNoError,
    registerUser,
    registerTeacher,
    noActiveAccount
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
