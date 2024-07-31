import React, { useContext, useState, useEffect } from 'react';
import './staff.css';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseAxios from '@/components/UseAxios';
import Swal from 'sweetalert2';
import noteacher from './imgs/noteacher.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Staff() {
  const { departments, registerTeacher, passwordError, usernameError } = useContext(AuthContext);
  const [position, setPosition] = useState("bottom");
  const axiosInstance = UseAxios();
  const [display, setDisplay] = useState(false);
  const [dept_id, setDept_id] = useState(departments.length > 0 ? departments[0].id : '');
  const [teacherDepts, setTeacherDepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [update, setUpdate] = useState(false);
  const [oldTeacher, setOldTeacher] = useState({});
  const [teacher, setTeacher] = useState({ name: "", department: "", email: "", password: "" });

  const AddForm = () => {
    setDisplay(!display);
  };

  const changeView = (id) => {
    if (id) {
      setDept_id(id);
      console.log(id);
    }
  };
console.log(dept_id)
  useEffect(() => {
    if (departments.length > 0) {
      setDept_id(departments[0].id);
    }
  }, [departments]);

  const fetchTeachers = async () => {
    if (dept_id) {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/school/teacher_by_department/${dept_id}`);
        setTeacherDepts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [dept_id]);
  console.log(teacherDepts);

  useEffect(() => {
    if (teacherDepts.length > 0) {
      const table = $('#myTable').DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [teacherDepts]);

  const handleEdit = async (id) => {
    setUpdate(true);
    setDisplay(false);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/school/retrieve_teacher/${id}`);
      const data = response.data;
      setOldTeacher(data);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteUrl = `http://127.0.0.1:8000/school/delete_user/${id}/`;
      await axiosInstance.delete(deleteUrl);
      const remained = teacherDepts.filter(teacher => teacher.user !== id);
      showSuccessAlert("Deleted Successfully!!")
      setTeacherDepts(remained);
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (update) {
      setOldTeacher({ ...oldTeacher, [name]: value });
    } else {
      setTeacher({ ...teacher, [name]: value });
    }
  };

  const handleValue = (e) => {
    const selected = e.target.value;
    if (update) {
      setOldTeacher({ ...oldTeacher, department: { id: selected } });
    } else {
      setTeacher({ ...teacher, department: selected });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { name, department, email, password } = teacher;
    const teacherData = {
      name,
      department: parseInt(department, 10), // Convert department ID to an integer
      email,
      password,
    };
    try {
      await registerTeacher(teacherData.name, teacherData.department, teacherData.email, teacherData.password);
      setTeacherDepts(prevTeachers => [...prevTeachers, {  name, department, email }]);
      setTeacher({ name: "", department: "", email: "", password: "" });
    } catch (error) {
      console.error('Error registering teacher:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, department, email, user } = oldTeacher;
    const teacherData = {
      name,
      department: parseInt(department.id, 10), // Convert department ID to an integer
      email,
      user
    };
    try {
      const response  = await axiosInstance.put(`http://127.0.0.1:8000/school/update_teacher/${oldTeacher.id}`, teacherData);
      if(response.status === 200){
        showSuccessAlert("Updated Successfully")
      }
      setStudents(prevStudents => prevStudents.map(stud => (stud.id === oldStudent.id ? oldStudent : stud)));
      setTeacherDepts(prevTeachers => prevTeachers.map(t => (t.id === oldTeacher.id ? oldTeacher : t)));
      setUpdate(false);
      setOldTeacher({});
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

    
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 4000,
      toast: true,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  return (
    <div className='bong'>
      <h4 className="mt-3 text-center">MANAGE STAFF FROM HERE</h4>
      <button className="btn btn-primary text-center text-white add_student" onClick={AddForm}>
        <i className="bi bi-plus-square"></i> <p className='text-white'>Add Teacher</p>
      </button>

      <ul className="show_dept">
        {departments.map((dept) => (
          <li key={dept.id} onClick={() => changeView(dept.id)}>
            <h5>{dept.name}</h5>
          </li>
        ))}
      </ul>

     {teacherDepts.length === 0 ? (
      <div className="dept_img">
        <span className='text-center'>No Teachers</span>
        <img src={noteacher} alt='no teacher'></img>
      </div>
    ) : (
      <>
       <div className="mt-3 table_form">
        {loading ? (
          <span className="menuloader"></span>
        ) : (
          <div>
            <table id="myTable" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherDepts.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{teacher.name}</td>
                    <td>{teacher.department.name}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <i className="bi bi-three-dots"></i>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="top" onClick={() => handleEdit(teacher.id)} className='edit_btn pointer cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300'>Edit Teacher</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom" onClick={() => handleDelete(teacher.user)} className='delete_btn cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300'>Delete Account</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
     )}
     
      <div className="teacher_register_form">
        <form className={display ? 'active' : 'out'} onSubmit={handleSubmit}>
          <div className="removed">
            <h5>Register Teacher</h5>
            <button type="button" className="close" onClick={() => setDisplay(false)}>
              &times;
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              name='name'
              value={teacher.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="formGroupExampleInput2"
              name='email'
              value={teacher.email}
              onChange={handleChange}
            />
            {usernameError && usernameError.map((err, index) => (
              <p className='text-danger' key={index}>{err}</p>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Department
            </label>
            <select className="form-control" onChange={handleValue} value={teacher.department}>
              <option>Choose Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              name='password'
              value={teacher.password}
              onChange={handleChange}
            />
            {passwordError && passwordError.map((err, index) => (
              <p className='text-danger' key={index}>{err}</p>
            ))}
          </div>
          <button className="btn btn-primary w-100" type='submit'>{submitting ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>

      {/* updating form */}
      <div className="edit_registered_teacher">
        <form className={update ? 'activated' : 'outted'} onSubmit={handleUpdate}>
          <div className="removed">
            <h5 className='text-center'>Update Teacher</h5>
            <button type="button" className="close" onClick={() => setUpdate(false)}>
              &times;
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Name*</label>
            <input 
              type="text" 
              className="form-control" 
              id="formGroupExampleInput" 
              name='name'
              value={oldTeacher.name || ''}
              onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Department</label>
            <select className="form-control" onChange={handleValue} value={oldTeacher.department?.id || ''}>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="formGroupExampleInput2"
              name='email'
              value={oldTeacher.email || ''} 
              onChange={handleChange} />
          </div>
          <button className='text-white text-center bg-primary w-100' type='submit'>Update Teacher</button>
        </form>
      </div>
    </div>
  );
}

export default Staff;
