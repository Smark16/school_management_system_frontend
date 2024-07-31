import React, { useContext, useState } from 'react';
import './dashboard.css';
import { Calendar } from '@/components/ui/calendar';
import { AuthContext } from '@/Context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HeadDashboard() {
  const { students, teachers, departments, setDepartments, events } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [formDisplay, setFormDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({ name: "", code: "", description: "", term: "" });

  const displayForm = () => {
    setFormDisplay(!formDisplay);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    setDepartment({ ...department, term: selected });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", department.name);
    formData.append("code", department.code);
    formData.append("description", department.description);
    formData.append("term", department.term);

    axios.post('https://school-management-system-backend-u6m8.onrender.com/school/post_department', formData)
      .then(response => {
        if (response.status === 201) {
          setDepartments(prevDepartments => [...prevDepartments, department]);
          setLoading(false);
          setFormDisplay(false);
        }
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="dashboard-container">
        <h4 className="welcome text-center">Welcome back! Head Teacher👋</h4>
        <div className="metrics">
          <div className="board">
            <h4>Total Students</h4>
            <span>{students.length}</span>
          </div>
          <div className="board">
            <h4>Upcoming Events</h4>
            <span>{events.length}</span>
          </div>
          <div className="board">
            <h4>Total Teachers</h4>
            <span>{teachers.length}</span>
          </div>
          <div className="board">
            <h4>Departments</h4>
            <span>{departments.length}</span>
            <p className='text-primary' onClick={displayForm}>Add Department</p>
          </div>
        </div>

        <div className="main-content">
          <div className="announcements">
            <div className="tbl">
              <h5 className='text-center'>Teacher List</h5>
              {teachers.length === 0 ? (
                <span className='text-center buu'>Currently No Teachers!!!</span>
              ) : (
                <>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.slice(0, 5).map((teacher, index) => (
                        <tr key={teacher.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{teacher.name}</td>
                          <td>{teacher.department.name}</td>
                          <td>{teacher.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className='text-primary seeAll'><Link to='/headTeacher/staff'>see All <i className="bi bi-arrow-right-circle-fill"></i></Link></p>
                </>
              )}
            </div>

            <div className="stdlist mt-5">
              <h5 className='text-center'>Student List</h5>
              {students.length === 0 ? (
                <span className='text-center buu'>Currently No Students!!!</span>
              ) : (
                <>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Student Number</th>
                        <th scope="col">Year Of Enrollment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 5).map((student, index) => (
                        <tr key={student.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{student.name}</td>
                          <td>{student.reg_no}</td>
                          <td>{student.student_no}</td>
                          <td>{student.year_of_enrollment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className='text-primary seeAll'><Link to='/headTeacher/student_management'>see All <i className="bi bi-arrow-right-circle-fill"></i></Link></p>
                </>
              )}
            </div>
          </div>

          <div className="recent-activities">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />

            <div className="chart-container mt-3">
              <h4 className='text-primary'>Events Activated</h4>
              {events.map(event => {
    const { id, name, description, startDate, endDate } = event;
    return (
      <div key={id} className="mainEvent">
        <h5><i className="bi bi-arrow-right-circle-fill"></i> {name}</h5>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <span className='mt-2'>{startDate} - {endDate}</span>
      </div>
    );
  })}

            </div>
          </div>
        </div>
      </div>

      {formDisplay && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title text-center">Add Department</h5>
              <button type="button" className="close" onClick={() => setFormDisplay(false)}>
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="departmentName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentName"
                    name='name'
                    value={department.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="departmentDescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentDescription"
                    name='description'
                    value={department.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="departmentCode" className="form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentCode"
                    name='code'
                    value={department.code}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="departmentTerm" className="form-label">Term</label>
                  <select
                    className="form-control"
                    id="departmentTerm"
                    name='term'
                    value={department.term}
                    onChange={handleChange}
                  >
                    <option value='Term 1'>Term 1</option>
                    <option value='Term 2'>Term 2</option>
                    <option value='Term 3'>Term 3</option>
                  </select>
                </div>
                <button type='submit' className='text-white text-center bg-primary'>
                  {loading ? 'Adding...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeadDashboard;
