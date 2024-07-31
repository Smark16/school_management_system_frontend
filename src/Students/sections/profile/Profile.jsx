import React, { useContext, useEffect, useState } from 'react';
import Profile from '@/Teacher/sections/profile/img/profile.jpg';
import './studentProfile.css';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';
const updTEsTUDENT = 'https://school-management-system-backend-u6m8.onrender.com/school/update_student/1'
import useCustomHook from '../customHook';
import Swal from 'sweetalert2';
import UseAxios from '@/components/UseAxios';

const changePassword = 'https://school-management-system-backend-u6m8.onrender.com/school/change-password/';

function StudentProfile() {
  const {user} = useContext(AuthContext)
  const {loggedStudent} = useCustomHook()
  const axiosInstance = UseAxios();
  const currentStudent = `https://school-management-system-backend-u6m8.onrender.com/school/get_student_user/${user.user_id}`;
  const updTEsTUDENT = `https://school-management-system-backend-u6m8.onrender.com/school/update_student/${loggedStudent}`
  const [loggedDetail, setLoggedDetail] = useState({name:"", dob:""})
  const [status, setStatus] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await axios.get(currentStudent);
      setLoggedDetail(response.data)
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(()=>{
   if(user.is_student){
    setStatus(true)
   }else{
    setStatus(false)
   }
  }, [])

  const handleChange = (e)=>{
   const {name,value} = e.target
   setLoggedDetail({...loggedDetail, [name]:value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("user", user.user_id)
    formData.append("name", loggedDetail.name)
    formData.append("reg_no", loggedDetail.reg_no)
    formData.append("student_no", loggedDetail.student_no)
    formData.append("dob", loggedDetail.dob)
    formData.append("year_of_enrollment", loggedDetail.year_of_enrollment)

    axios.put(updTEsTUDENT, formData)
    .then(res =>{
      if(res.status === 200){
        showSuccessAlert("Profile Updated");
      }
    }).catch(err =>{
      console.log('there is an err', err)
    })
  }
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 2000,
    });
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("password", newPassword);
    formData.append("password2", confirmPassword);

    try {
      const response = await axiosInstance.put(changePassword, formData);
      setMessage(response.data.message);
    } catch (error) {
      const errorMsg = error.response.data;
      if (errorMsg.old_password) {
        setMessage(errorMsg.old_password);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <>
      <h4 className='text-center'>VIEW YOUR PROFILE</h4>

      <div className="row studProfile">
        <div className="col-md-4 col-sm-12">
          <img src={Profile} alt="Profile" className='profile_img'/>
          <ul>
            <li>
              <h5>Status: </h5>
              <span>{status && 'student'}</span>
            </li>
            <li>
              <h5>Name: </h5>
              <span>{loggedDetail.name}</span>
            </li>
            <li>
              <h5>Registration Number: </h5>
              <span>{loggedDetail.reg_no}</span>
            </li>
            <li>
              <h5>Entry Year: </h5>
              <span>{loggedDetail.year_of_enrollment}</span>
            </li>
          </ul>
        </div>

        <div className="col-md-7 col-sm-12">
          <form onSubmit={handleSubmit}>
          <h4>Edit Profile</h4>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input 
                type="text" 
                className="form-control" 
                id="inputEmail3" 
                name='name'
                value={loggedDetail.name}
                onChange={handleChange}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                Date Of Birth
              </label>
              <div className="col-sm-10">
                <input 
                type="date" 
                className="form-control" 
                id="inputPassword3" 
                name='dob'
                value={loggedDetail.dob}
                onChange={handleChange}/>
              </div>
            </div>
            <div className="pro_btns">
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
              <button type="button" className="btn bg-black text-white" onClick={() => setShowModal(true)}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>

       {/* Custom Modal */}
       {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Change Password</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handlePassword}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Password</button>
                {message && <div className="alert alert-info mt-3">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentProfile;
