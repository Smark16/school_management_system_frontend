import React, { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import Chart from 'react-apexcharts';
import student from '@/Teacher/sections/dashboard/imgs/student.png';
import assignment from '@/Teacher/sections/dashboard/imgs/assignments.png';
import teacher from '@/Teacher/sections/dashboard/imgs/teacher.png';
import submitted from '@/Teacher/sections/dashboard/imgs/submitted.png';
import { AuthContext } from '@/Context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function StudentDashboard() {
  const { user, totalStudents, teachers, students, submissions, departments, exams, events } = useContext(AuthContext);

  const [studentPerformance, setStudentPerformance] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studId, setStudId] = useState('');
  const [pending, setPending] = useState([]);

  useEffect(() => {
    if (students.length > 0) {
      const loggedinStudent = students.find(student => student.user === user.user_id);
      if (loggedinStudent) {
        setStudentName(loggedinStudent.name);
        setStudId(loggedinStudent.id);
      }
    }
  }, [students, user]);

  const stud_perfomance = `http://127.0.0.1:8000/school/student_performance/${studId}`;

  const perfomanceRate = async () => {
    try {
      const response = await axios.get(stud_perfomance);
      const data = response.data;
      setStudentPerformance(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (studId) {
      perfomanceRate();
    }
  }, [studId]);

  useEffect(() => {
    setPending(submissions.filter(submission => submission.status === "No Submission"));
  }, [submissions]);

  const studentmarks = studentPerformance?.subject_performance.map(avg_score => avg_score.average_score) || [];
  const studDepartments = studentPerformance?.subject_performance.map(dept => dept.department) || [];

  const options = {
    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
    labels: studDepartments,
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
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
    series: studentmarks
  };

  return (
    <>
      <h4 className="mt-2 welcome">Welcome back! {studentName}👋</h4>
      <div className="metrics">
        <div className="metric-card">
          <div className="img">
            <img src={student} alt="student" />
          </div>
          <div className="words">
            <h5>Students</h5>
            <span>{totalStudents}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="img">
            <img src={assignment} alt="assignments" />
          </div>
          <div className="words">
            <h5>Total Assignments</h5>
            <span>{exams.length}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="img">
            <img src={teacher} alt="teachers" />
          </div>
          <div className="words">
            <h5>Teachers</h5>
            <span>{teachers.length}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="img">
            <img src={submitted} alt="courses" />
          </div>
          <div className="words">
            <h5>Courses</h5>
            <span>{departments.length}</span>
          </div>
        </div>
      </div>

      <div className="row courses-section">
        <div className="col-md-6 col-sm-12 departments">
          {departments.map(dept => {
            const { id, name } = dept;
            return (
              <div key={id} className="subject">
                <span>{name.split("").slice(0, 1)}</span>
                <div className="sub_info">
                  <div className="more">
                    <p>{name}</p>
                    <button>
                      <Link to={`/student/department/${id}`} className='text-white'>View more</Link>
                    </button>
                  </div>
                  <div className="outer_bar">
                    <div className="inner_bar"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="col-md-6 col-sm-12 graphs-section">
          <div className="mixed-chart">
            <span className="text-center">Performance Rate</span>
            <Chart options={options} series={options.series} type="donut" width="380" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7 col-sm-12 pendis">
          <h4 className='text-center text-primary'>Pending Assignments</h4>
          {pending.length === 0 ? (
            <h4>No Activities!!</h4>
          ) : (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">status</th>
                  <th scope="col">Uploaded_at</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(subs => (
                  <tr key={subs.id}>
                    <th scope="row">{subs.name}</th>
                    <td>{subs.department.name}</td>
                    <td className='text-danger'>{subs.status}</td>
                    <td>{subs.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="col-md-5 col-sm-12 chart-container mboso mt-3">
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
    </>
  );
}

export default StudentDashboard;
