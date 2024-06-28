import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseAxios from '@/components/UseAxios';
import './student.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import noStudent from '@/Teacher/sections/student_list/img/nosubmission.png'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function StudentManagement() {
  const [position, setPosition] = useState("bottom")
  const { students, setStudents, passwordError, usernameError, registerUser, user, studentNoError } = useContext(AuthContext);
  const axiosInstance = UseAxios();
  const [display, setDisplay] = useState(false);
  const [update, setUpdate] = useState(false);
  const [oldStudent, setOldStudent] = useState({});
  const [submitting, setSubmitting] = useState(false)
  const [student, setStudent] = useState({name:"", reg_no:"", student_no:"", password:"", dob:"", year_of_enrollment:new Date().getFullYear()});

  const AddForm = () => {
    setDisplay(!display);
    if(update) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    if (students.length > 0) {
      $(() => {
        $('#myTable').DataTable();
      });
    }
  }, [students]);

  const handleEdit = async (id) => {
    setUpdate(true);
    setDisplay(false);
    try {
      const response = await axios(`http://127.0.0.1:8000/school/retrieve_student/${id}`);
      const data = response.data;
      setOldStudent(data);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteUrl = `http://127.0.0.1:8000/school/delete_user/${id}/`;
      await axiosInstance.delete(deleteUrl);
      const remained = students.filter(student => student.user !== id);
      showSuccessAlert("Student Deleted Sucesfully")
      setStudents(remained);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const generateRegNo = () => {
    const randomNumbers = Math.floor(Math.random() * 900) + 100;
    const regNo = `m2234/${randomNumbers}`;
    setStudent(prevState => ({ ...prevState, reg_no: regNo }));
  };

  const generatePassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setStudent(prevState => ({ ...prevState, password }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (update) {
      setOldStudent({ ...oldStudent, [name]: value });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { name, reg_no, student_no, password, dob, year_of_enrollment } = student;
    await registerUser(name, reg_no, student_no, password, dob, year_of_enrollment);
    setStudents(prevStudents => [...prevStudents, { name, reg_no, student_no, dob, year_of_enrollment }]);
    setStudent({ name: "", reg_no: "", student_no: "", password: "", dob: "", year_of_enrollment: new Date().getFullYear() });
    setSubmitting(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("user", user.user_id);
    formdata.append("name", oldStudent.name);
    formdata.append("dob", oldStudent.dob);
    formdata.append("reg_no", oldStudent.reg_no);
    formdata.append("student_no", oldStudent.student_no);
    formdata.append("year_of_enrollment", oldStudent.year_of_enrollment);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/school/update_student/${oldStudent.id}`, formdata);

      if(response.status === 200){
        showSuccessAlert("Updated Successfully")
      }
      setStudents(prevStudents => prevStudents.map(stud => (stud.id === oldStudent.id ? oldStudent : stud)));
      setUpdate(false);
      setOldStudent({});
    } catch (err) {
      console.log("Error:", err);
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

      <h4 className='text-center mt-5'>MANAGE STUDENTS HERE</h4>
      <button className="btn btn-primary text-center text-white mt-2 add_student" onClick={AddForm}>
        <i className="bi bi-plus-square"></i> <p className='text-white'>Add Student</p>
      </button>
      {students.length === 0 ? (<>
       <img src={noStudent} alt='nostudents' className='no_stud_img'></img>
      </>) : (<>

      {/* show data */}
      
<div className='mt-3 table_form'>
  <table id='myTable' className="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Registration Number</th>
        <th scope="col">Student Number</th>
        <th scope="col">Year Of Enrollment</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {students.map((stud, index) => {
        const { id, user, name, reg_no, student_no, year_of_enrollment } = stud;
        return (
          <tr key={id}>
            <th scope="row">{index + 1}</th>
            <td>{name}</td>
            <td>{reg_no}</td>
            <td>{student_no}</td>
            <td>{year_of_enrollment}</td>
            <td>
              <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <i className="bi bi-three-dots"></i>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="top" onClick={() => handleEdit(id)} className='edit_btn pointer dropdown-item'>Edit Student</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom" onClick={() => handleDelete(user)} className='delete_btn dropdown-item'>Delete Account</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      </>)}

      {/* updating form */}
<div className="edit_registered_student">
  <form className={update ? 'activated' : 'outted'} onSubmit={handleUpdate}>
  <div className="removed">
            <h5>Update Student</h5>
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
        value={oldStudent.name || ''}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Student_No*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2" 
        name='student_no'
        value={oldStudent.student_no || ''}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Year of Enrollment*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2"
        name='year_of_enrollment'
        value={oldStudent.year_of_enrollment || ''}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Date Of Birth*</label>
      <input 
        type="date" 
        className="form-control" 
        id="formGroupExampleInput2" 
        name='dob'
        value={oldStudent.dob || ''}
        onChange={handleChange} />
    </div>
    <button className='text-white text-center bg-primary w-100' type='submit'>Update Student</button>
  </form>
</div>
    
    
{/* registration form */}
<div className="student_register_form mt-5">
  <form className={display ? 'active' : 'out'} onSubmit={handleSubmit}>
  <div className="removed">
            <h5>Register Student</h5>
            <button type="button" className="close" onClick={() => setDisplay(false)}>
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
        value={student.name}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label bg-primary text-white p-2" onClick={generateRegNo}>Reg_No*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2" 
        placeholder="reg no" 
        name='reg_no'
        value={student.reg_no}
        onChange={handleChange} />
      {usernameError.map((err, index) => (
        <p className='text-danger' key={index}>{err}</p>
      ))}
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Student_No*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2" 
        name='student_no'
        value={student.student_no}
        onChange={handleChange} />
        {studentNoError.map((err, index) => (
        <p className='text-danger' key={index}>{err}</p>
      ))}
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Year of Enrollment*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2"
        name='year_of_enrollment'
        value={student.year_of_enrollment}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label">Date Of Birth*</label>
      <input 
        type="date" 
        className="form-control" 
        id="formGroupExampleInput2" 
        name='dob'
        value={student.dob}
        onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput2" className="form-label bg-primary text-white p-2" onClick={generatePassword}>Password*</label>
      <input 
        type="text" 
        className="form-control" 
        id="formGroupExampleInput2" 
        name='password'
        value={student.password}
        onChange={handleChange} />
      {passwordError.map((err, index) => (
        <p className='text-danger' key={index}>{err}</p>
      ))}
    </div>
    <button className='text-white text-center bg-primary w-100' type="submit">
      {submitting ? 'submitting...' : 'submit'}
      </button>
  </form>
</div>
  </div>
  );
}

export default StudentManagement;
