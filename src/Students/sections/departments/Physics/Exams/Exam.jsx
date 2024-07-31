import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './examPage.css';
import { AuthContext } from '@/Context/AuthContext';
import axios from 'axios';

function Exam() {
  const { id } = useParams();
  const { exams } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deptexams, setDeptExams] = useState('');

  const singleExam = `https://school-management-system-backend-u6m8.onrender.com/school/exam_questions/${parseInt(id)}`;
console.log(singleExam)
  const fetchSingle = async () => {
    try {
      const response = await axios(singleExam);
      const data = response.data;
      setDeptExams(data);
    } catch (err) {
      console.log('there is an err', err);
    }
  };
console.log(deptexams)
  const getExams = (id) => {
    navigate(`/student/exam_questions/${id}`);
  };

  useEffect(() => {
    fetchSingle();
  }, []);

  return (
    <>
      <div className='exam_container'>
        <h4 className='exam_head'>Click The Button Below To Start Exam</h4>
        {deptexams.description ? (
          <>
            <h3 className='text-center'>Exam Description</h3>
            <p>{deptexams.description}</p>
          </>
        ) : (
          <span>No Exam Descriptions</span>
        )}
      </div>
      <button
        className='exam_btn btn-primary p-2 mt-2'
        onClick={() => getExams(deptexams.id)}
      >
        Attempt Test
      </button>
    </>
  );
}

export default Exam;
