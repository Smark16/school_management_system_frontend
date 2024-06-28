import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import nosub from './img/nosubmission.png'

import { AuthContext } from '@/Context/AuthContext';

function Student() {
  const {submissions, handleQuestions, user, teachers} = useContext(AuthContext)
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [studentId, setStudentId] = useState(true)

console.log(submissions)
  useEffect(() => {

    // getting submissions depending on techer id
    if (teachers.length > 0 && submissions.length > 0) {
      const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id)
      const departmentId = loggedinTeacher.department.id
      const filtered = submissions.filter((submission) => submission.department.id === departmentId);
      setFilteredSubmissions(filtered);
    }
    
    {submissions.forEach(submission =>{
      
      if(submission.student.id === undefined){
        setStudentId(false)
      }else{
        setStudentId(true)
      }
      
    })}
    
  }, [teachers, submissions]);

  useEffect(() => {
    // Initialize DataTables after filteredSubmissions is updated
    if (filteredSubmissions.length > 0) {
      $('#myTable').DataTable();
    }
  }, [filteredSubmissions]);


  return (
  
    <div>
      {!studentId ? (<>
      <h4 className='text-center'>No Submissions Have been Made Yet</h4>
      <img src={nosub} alt='no submissions' className='resultImage'></img>
      </>) : (<>
        <h4 className='text-center'>VIEW STUDENT SUBMISSIONS</h4>
      <div className="container mt-5">
        <table id="myTable" className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Department</th>
              <th scope="col">Exam</th>
              <th scope="col">Date</th>
              <th scope="col">Assignment Status</th>
              <th scope="col">Submission Time</th>
              <th scope="col">Actions</th>
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
                    <span className='text-danger'>
                      No Submission
                    </span>
                  ) : (
                    <span className='text-success d-flex'>
                      <i className="bi bi-check2-circle"></i> Submitted
                    </span>
                  )}
                </td>
                <td>{submission.submission_Time}</td>
                <td>
                  <span>
                    <i className="bi bi-eye-fill" onClick={() => handleQuestions(submission.id)}></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>)}
     
    </div>
  );
}

export default Student;
