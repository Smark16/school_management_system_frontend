import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';
import noresults from './img/noresults.png';
import './perfomance.css';

function Performance() {
  const { user, teachers } = useContext(AuthContext);
  const [departmentResult, setDepartmentResult] = useState([]);
  const [deptID, setDeptID] = useState('');

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

      fetchData();
    }
  }, [deptID]);

  useEffect(() => {
    if (departmentResult.length > 0) {
      $(() => {
        $('#myTable').DataTable();
      });
    }
  }, [departmentResult]);

  return (
    <div className="container">
      {departmentResult.length === 0 ? (
        <>
          <h4 className='text-center'>NO RESULTS TO DISPLAY</h4>
          <img src={noresults} alt='noresults' className='resultImage'></img>
        </>
      ) : (
        <>
          <h4 className='text-center'>Student Performance</h4>
          <div className='guju'>
            <table border="2" id="myTable" className='table myTable table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Student Name</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>Exam Name</th>
                  <th scope='col'>Marks</th>
                </tr>
              </thead>
              <tbody>
                {departmentResult.map((dept_result, index) => (
                  <tr key={index}>
                    <td>{dept_result.student.name}</td>
                    <td>{dept_result.department.name}</td>
                    <td>{dept_result.exam.name}</td>
                    <td>{dept_result.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Performance;
