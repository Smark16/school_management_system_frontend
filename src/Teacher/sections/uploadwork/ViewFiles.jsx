import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '@/Context/AuthContext';
import nofiles from './img/nofiles.png';

const downloadEndpoint = 'https://school-management-system-backend-u6m8.onrender.com/school/download_file';

function ViewFiles() {
  const { user, teachers } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
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
      const deptFiles = `https://school-management-system-backend-u6m8.onrender.com/school/department_files/${deptID}`;

      const fetchFiles = async () => {
        try {
          setLoading(true);
          const response = await axios.get(deptFiles);
          const data = response.data;
          setFiles(data);
          setLoading(false);
        } catch (err) {
          console.log('there was an error', err);
          setLoading(false);
        }
      };
      fetchFiles();
    }
  }, [deptID]);

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

  return (
    <>
      {files.length === 0 ? (
        <>
          <h5 className='text-center'>No Uploaded Files</h5>
          <img src={nofiles} alt='No files' className='no_files'/>
        </>
      ) : (
        <>
          {loading ? (<span className="menuloader"></span>) : (
            <>
              <h4 className='text-center'>VIEW UPLOADED FILES</h4>
              <div className="contained mt-5">
                <table id="myTable" className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Department</th>
                      <th scope="col">File Name</th>
                      <th scope="col">Uploaded_at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((uploaded) => (
                      <tr key={uploaded.id}>
                        <td>{uploaded.department.name}</td>
                        <td onClick={() => DownloadFile(uploaded.file.id, uploaded.file.name)} className='downed'>
                          {uploaded.file.name}
                        </td>
                        <td>{uploaded.uploaded_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ViewFiles;
