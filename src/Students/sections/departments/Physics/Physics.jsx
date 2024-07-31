import React, { useEffect, useState } from 'react';
import './physics.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const downloadEndpoint = 'https://school-management-system-backend-u6m8.onrender.com/school/download_file';

function Physics() {
  const { id } = useParams(); 
  const [currentWeek, setCurrentWeek] = useState(null); 
  const singleDeptUrl = `https://school-management-system-backend-u6m8.onrender.com/school/single_dept/${id}`; 
  const deptWork = `https://school-management-system-backend-u6m8.onrender.com/school/department_files/${id}`; 
  const deptExam = `https://school-management-system-backend-u6m8.onrender.com/school/dept_exams/${id}`; 

  const [info, setInfo] = useState(''); 
  const [files, setFiles] = useState([]); 
  const [exams, setExams] = useState([]);

  const weeks = Array.from({ length: 13 }, (_, i) => i + 1); 

  // Toggle the visibility of the week's content
  const toggleWeek = (week) => {
    setCurrentWeek(currentWeek === week ? null : week);
  };

  // Fetch department info from the API
  const fetchInfo = async () => {
    try {
      const response = await axios(singleDeptUrl);
      const data = response.data;
      setInfo(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  // Fetch department files from the API
  const fetchWork = async () => {
    try {
      const response = await axios(deptWork);
      const data = response.data;
      setFiles(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  // Fetch department exams from the API
  const fetchExams = async () => {
    try {
      const response = await axios(deptExam);
      const data = response.data;
      setExams(data);
    } catch (err) {
      console.log('there is an error', err);
    }
  };

  // Force download
  const forceDownload = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Download files
  const DownloadFile = (fileId, filename) => {
    if (!fileId) {
      console.error('No file ID available for download.');
      return;
    }
    
    const url = `${downloadEndpoint}/${fileId}`;
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    }).then(response => {
      if (response.status === 200) {
        forceDownload(response.data, filename);
      } else {
        console.error('Error downloading the file:', response.status, response.data);
      }
    }).catch(err => {
      console.error('There is an error:', err);
    });
  };

  // Fetch data when the component mounts or the ID changes
  useEffect(() => {
    fetchInfo();
    fetchWork();
    fetchExams();
  }, [id]);

  // Filter out exams with status "submitted"
  const filteredExams = exams.filter(exam => exam.status.toLowerCase() !== 'submitted');

  return (
    <div className="physics-container">
      <h2 className="titles">{info.name} Department</h2>
      <div className="description">
        <h3>Welcome Students!</h3>
        <p>
          Click the Insert image icon in the last set of icons above to add your picture, then add a warm note of welcome to your students. You can also add your welcome video here. The purpose is to motivate the students and to sustain their interest in the course, such as how they will use what they learn in the course in their field of work.
        </p>
        
        <ul>
          <li>
            <span>Course Name: {info.name}</span>
            <span>Course Code: {info.code ? info.code : 'Insert code'}</span> 
            <span>Term: {info.term ? info.term : 'Insert current Term'}</span>
          </li>
        </ul>

        <h3 className='head'>Course Facilitators</h3>
        <p>{info.facilitators ? info.facilitators.join(', ') : 'No facilitators listed'}</p> 

        <h3 className='head'>Course Description</h3>
        <p>{info.description ? info.description : 'Add the Course Description here.'}</p> 
      </div>
      
      <div className="week-selector">
        {weeks.map(week => (
          <div className="week-card" key={week}>
            <div className="wrap" onClick={() => toggleWeek(week)}>
              <i className={`bi bi-chevron-compact-down ${currentWeek === week ? 'rotated' : ''}`}></i>
              <span className={`week-button ${currentWeek === week ? 'active' : ''}`}>
                Week {week}
              </span>
            </div>
            <div className={`content ${currentWeek === week ? 'show' : ''}`}>
              <h3>Week {week}</h3>
              <p>Materials and content for Week {week}.</p>
              {files.map(file => (
                file.week === week && (
                  <div key={file.id} className="filedetails mt-3">
                    <p onClick={() => DownloadFile(file.file.id, file.file.name)}>{file.name}</p>
                    <p>{file.description}</p>
                  </div>
                )
              ))}

              {filteredExams.map(exam => (
                exam.week === week && (
                  <div key={exam.id} className="examName mt-2">
                    <p className='text-white bg-primary p-2'><Link to={`/student/exam_page/${exam.id}`} className='text-white'>{exam.name}</Link></p>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Physics;
