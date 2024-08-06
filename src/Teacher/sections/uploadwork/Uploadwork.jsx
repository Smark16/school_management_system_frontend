import React, { useState, useContext } from 'react';
import './upload.css';
import { Button } from "@/components/ui/button";
import upload from './img/upload.png';
import axios from 'axios';
import { AuthContext } from '@/Context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const postwork = 'https://school-management-system-backend-u6m8.onrender.com/school/post_work';
const downloadEndpoint = 'https://school-management-system-backend-u6m8.onrender.com/school/download_file';
const uploadUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/upload_file';

function Uploadwork() {
  
  const { teachers, user, setFileName } = useContext(AuthContext);
  const [fileDetails, setFileDetails] = useState('');
  const [LearningMaterial, setLearningMaterial] = useState({ name: "", description: "", file: null, week: "" });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileId, setFileId] = useState(''); // Track the file ID
  const [fileUrl, setFileUrl] = useState('');
  const navigate = useNavigate();

  const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
  const departmentId = loggedinTeacher ? loggedinTeacher.department.id : null; // Ensure departmentId is only set if loggedinTeacher is found

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLearningMaterial({ ...LearningMaterial, [name]: value });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
    if (selectedFile) {
      setFileDetails(selectedFile);
      setUploadProgress(0); // Reset the progress bar

      // Create form data for file upload
      const formData = new FormData();
      formData.append('name', selectedFile);

      // Upload the file immediately
      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        });

        if (response.status === 201) {
          setFileId(response.data.file_id);
          setFileUrl(response.data.file_url);
          setLearningMaterial({ ...LearningMaterial, file: parseInt(response.data.file_id) });
        }
      } catch (error) {
        console.error('There was an error uploading the file!', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', LearningMaterial.name);
    formData.append('description', LearningMaterial.description);
    formData.append('file', LearningMaterial.file);
    formData.append('department', departmentId);
    formData.append('week', LearningMaterial.week);

    try {
      const response = await axios.post(postwork, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.id) {
        setFileId(response.data.id); // Set the file ID
        showSuccessAlert("File Uploaded");
        resetForm();
        navigate('/teacher/view_uploaded_files');
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 2000,
    });
  };

  const resetForm = () => {
    setLearningMaterial({ name: "", description: "", file: null, week: "" });
    setFileDetails('');
    setUploadProgress(0);
  };

  const handleView = () => {
    navigate('/teacher/view_uploaded_files');
  };

  return (
    <>
      <h2 className='text-center'>Upload Course Materials From Here</h2>
      <button className='bg-primary p-2 upload_btn' onClick={handleView}>View files</button>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Material Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            name='name'
            value={LearningMaterial.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            name='description'
            value={LearningMaterial.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Week
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            name='week'
            value={LearningMaterial.week}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="uploadFile" className="btn bg-primary text-white text-center p-2">
            Upload_File
          </label>
          <span>Only one file is allowed at a time</span>
          <input
            type="file"
            className="form-control"
            id="uploadFile"
            accept=".pdf, .docx, .zip"
            hidden
            onChange={handleFileChange}
          />

          <div className='file_upload mt-2'>
            {fileDetails ? (
              <ul>
                <li className="file-name">
                  <a href={fileUrl} className='reduce_letter'>{fileDetails.name}</a>
                  <div className="progress-bar p-2" style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress}%
                  </div>
                </li>
              </ul>
            ) : (
              <img src={upload} alt='file_upload' className='material_img'/>
            )}
          </div>
          <p>Allowed Files (.pdf, .docx, .zip)</p>
        </div>

        <Button type='submit'>Submit_Work</Button>
      </form>
    </>
  );
}

export default Uploadwork;
