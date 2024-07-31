import React, { useState, useContext, useEffect } from 'react';
import Chart from 'react-apexcharts';
import student from './imgs/student.png';
import assignments from './imgs/assignments.png';
import teacher from './imgs/teacher.png';
import submittedImage from './imgs/submitted.png'
import { Calendar } from '@/components/ui/calendar';
import './dashboard.css';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';


function Dashboard() {
  const [date, setDate] = useState(new Date());
  const { user, teachers, submissions, totalStudents, events } = useContext(AuthContext);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [studentId, setStudentId] = useState(true);
  const [departmentResult, setDepartmentResult] = useState([]);
  const [deptID, setDeptID] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [submissionRate, setSubmissionRate] = useState([0, 0]);
  const [submitted, setSubmitted] = useState('')
  const [nosubmission, setNosubmission] = useState()
  const [examCount, setExamCount] = useState(0)
  

  // handle performance
  useEffect(() => {
    if (teachers.length > 0) {
      const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
      if (loggedinTeacher && loggedinTeacher.department) {
        setDeptID(loggedinTeacher.department.id);
      }
    }
  }, [teachers, user]);

  useEffect(() => {
    if (deptID) {
      const DepartmentResultUrl = `https://school-management-system-backend-u6m8.onrender.com/school/department_results/${deptID}`;
      const examCountUrl = `https://school-management-system-backend-u6m8.onrender.com/school/exam_department_count/${deptID}`

      const fetchData = async () => {
        try {
          const response = await axios.get(DepartmentResultUrl);
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          setDepartmentResult(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const countExam = async()=>{
        try{ 
          const response = await axios(examCountUrl)
          const data = response.data
          setExamCount(data.count)
        }catch(err){
          console.log('there is an error', err)
        }
      }

      fetchData();
      countExam()
    }
  }, [deptID]);

  useEffect(() => {
    if (teachers.length > 0 && submissions.length > 0) {
      const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
      if(loggedinTeacher){
        const departmentId = loggedinTeacher.department.id;
        const filtered = submissions.filter((submission) => submission.department.id === departmentId);
        setFilteredSubmissions(filtered);
  
        // Calculate submission rates
        const submittedCount = filtered.filter(submission => submission.status !== 'No Submission').length;
        setSubmitted(submittedCount)
        const notSubmittedCount = filtered.length - submittedCount;
        setNosubmission(notSubmittedCount)
        const totalCount = filtered.length;
  
        if (totalCount > 0) {
          setSubmissionRate([
            (notSubmittedCount / totalCount) * 100,
            (submittedCount / totalCount) * 100,
          ]);
        }
      }
     
    }

    submissions.forEach(submission => {
      if (submission.student.id === undefined) {
        setStudentId(false);
      } else {
        setStudentId(true);
      }
    });
  }, [teachers, submissions]);

  useEffect(() => {
    if (teachers.length > 0) {
      const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
      if(loggedinTeacher){
        setTeacherName(loggedinTeacher.name);
      }
    }

  
  }, [teachers]);

  // Apex charts options for pie/donut chart
  const options = {
    colors: ['#2E93fA', '#66DA26'],
    labels: ['Not Submitted', 'Submitted'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + '%';
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              offsetY: 16,
              formatter: function (val) {
                return val.toFixed(1);
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0).toFixed(1) + '%';
              },
            },
          },
        },
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  return (
    <>
      <h4 className="mt-2 text-center">Welcome back! {teacherName}👋</h4>
      <div className="row_info">
      <div className="col-md-8 col-sm-12 col_metrics">
        <div className="metrics">
        <div className="students">
          <div className="img">
            <img src={student} alt="student" className='studImg'/>
          </div>
          <div className="words">
            <h5>Students</h5>
            <span>{totalStudents}</span>
          </div>
        </div>

        <div className="students">
          <div className="img">
            <img src={teacher} alt="teacher" className='studImg'/>
          </div>
          <div className="words">
            <h5>Not Submitted</h5>
            <span>{nosubmission}</span>
          </div>
        </div>

        <div className="students">
          <div className="img">
            <img src={assignments} alt="assignments" className='studImg'/>
          </div>
          <div className="words">
            <h5>Assignments Given</h5>
            <span>{examCount}</span>
          </div>
        </div>

        <div className="students">
          <div className="img">
            <img src={submittedImage} alt="student" className='studImg'/>
          </div>
          <div className="words">
            <h5>Submissions</h5>
            <span>{submitted}</span>
          </div>
        </div>
        </div>
       
       {/* chart */}
       
       <div className="text-center mixed-chart">
          <div className="text-center">
            <span className="text-center">Submission Rate</span>
            <Chart options={options} series={submissionRate} type="donut" width="400" />
          </div>
        </div>


        {/* perfomance table */}
        <div className="perfs mt-5">
            <p>Performance</p>
            <hr></hr>
            {departmentResult.length === 0 ? (
              <>
                <h4 className='mt-2'>No Activities!!</h4>
              </>
            ) : (
              <>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Student Name</th>
                      <th scope="col">Department</th>
                      <th scope="col">Exam Name</th>
                      <th scope="col">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentResult.slice(0, 5).map((dept_result, index) => (
                      <tr key={index}>
                        <td>{dept_result.student.name}</td>
                        <td>{dept_result.department.name}</td>
                        <td>{dept_result.exam.name}</td>
                        <td>{dept_result.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='text-primary seeAll'><Link to='/teacher/perfomance'>see All <i className="bi bi-arrow-right-circle-fill"></i></Link></p>
              </>
            )}
          </div>

{/* Student submissions */}
<div className="mt-5 subs">
            <p>Student Submissions</p>
            <hr></hr>
            {!studentId ? (
              <>
                <h4>No Activities!!</h4>
              </>
            ) : (
              <>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Student</th>
                      <th scope="col">Department</th>
                      <th scope="col">Exam</th>
                      <th scope="col">Date</th>
                      <th scope="col">Assignment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <td>{submission.student.name}</td>
                        <td>{submission.department.name}</td>
                        <td>{submission.name}</td>
                        <td>{submission.date}</td>
                        <td>
                          {submission.status === 'No Submission' ? (
                            <span className="text-danger">No Submission</span>
                          ) : (
                            <span className="text-success d-flex">
                              <i className="bi bi-check2-circle"></i> Submitted
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='text-primary seeAll'><Link to='/teacher/student_list'>see All <i className="bi bi-arrow-right-circle-fill"></i></Link></p>
              </>
            )}
          </div>
      </div>

<div className="col_calendar">
   {/* calendar */}     
   <div className="calendar">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="chart-container mt-3">
              <h4 className='text-primary'>Events Activated</h4>
              {events.map(event => {
    const { id, name, description, startDate, endDate } = event;
    return (
      <div key={id} className="mainEvent">
        <h5><i className="bi bi-arrow-right-circle-fill"></i> {name}</h5>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <span className='mt-2'>{startDate} - {endDate}</span>
        <span>{moment().startOf('day').fromNow()}</span>
      </div>
    );
  })}

            </div>
</div>
     
      </div>
    </>
  );
}

export default Dashboard;
