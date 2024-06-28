import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';
import './profile.css';
import image from './img/profile.jpg';
import Swal from 'sweetalert2';
import UseAxios from '@/components/UseAxios';

const changePassword = 'http://127.0.0.1:8000/school/change-password/';

function Profile() {
  const { user, teachers } = useContext(AuthContext);
  const axiosInstance = UseAxios();
  const [status, setStatus] = useState('');
  const [profileView, setProfileView] = useState({ name: "", email: "", department: {} });
  const [error, setError] = useState('');
  const [loggedUser, setLoggedUser] = useState({ username: "", email: "" });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const Teacher = `http://127.0.0.1:8000/school/get_user/${user.user_id}`;
  
  const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
  
  const updateTeacherUrl = loggedinTeacher ? `http://127.0.0.1:8000/school/update_teacher/${loggedinTeacher.id}` : null;
  const singleTeacherUrl = loggedinTeacher ? `http://127.0.0.1:8000/school/retrieve_teacher/${loggedinTeacher.id}` : null;

  const fetchUser = async () => {
    try {
      const response = await axios.get(Teacher);
      setLoggedUser(response.data);
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileView({ ...profileView, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updateTeacherUrl) {
      setError('Unable to update profile. No associated teacher found.');
      return;
    }
    const formdata = new FormData();
    formdata.append("name", profileView.name);
    formdata.append("email", profileView.email);
    formdata.append("user", user.user_id);
    formdata.append("department", loggedinTeacher.department.id);

    try {
      const response = await axios.put(updateTeacherUrl, formdata);
      if(response.status === 200){
        showSuccessAlert("Profile Updated Successfully")
      }
    } catch (err) {
      console.log('There is a server error');
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 2000,
    });
  };

  const singleTeacher = async () => {
    if (!singleTeacherUrl) return;
    try {
      const response = await axios(singleTeacherUrl);
      const data = response.data;
      setProfileView(data);
    } catch (err) {
      console.log('There is an error');
    }
  };

  useEffect(() => {
    singleTeacher();
    if (user.is_teacher) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [user, singleTeacherUrl]);

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
        <h4 className='text-center mt-3'>View Profile</h4>
      
        <div className="row studProfile">
          <div className="col-md-4 col-sm-12">
          <div className="pmage">
          <img src={image} alt="Profile" />
        </div>
        <ul>
            <li>
              <h5>Status: </h5>
              <span>{status ? 'teacher' : 'student'}</span>
            </li>
            <li>
              <h5>Username: </h5>
              <span>{loggedUser.username}</span>
            </li>
            <li>
              <h5>Email: </h5>
              <span>{profileView.email}</span>
            </li>

            <li>
              <h5>Full Name: </h5>
              <span>{profileView.name}</span>
            </li>

            <li>
              <h5>Department: </h5>
              <span>{profileView.department.name}</span>
            </li>
          </ul>
           
          </div>
          <div className="col-md-7 col-sm-12">
          <form onSubmit={handleSubmit}>
            <h4>Edit Profile</h4>
            <div className="row mb-3">
              <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name='name'
                  value={profileView.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name='email'
                  value={profileView.email}
                  onChange={handleChange}
                />
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

export default Profile;
