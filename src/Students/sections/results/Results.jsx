import React, { useContext, useState, useEffect } from 'react';
import './Results.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useCustomHook from '../customHook';


const Results = () => {
  const { loggedStudent } = useCustomHook();
  const [sessionResults, setSessionResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (studentId) => {
    const studentresults = `https://school-management-system-backend-u6m8.onrender.com/school/student_results/${studentId}`;
    try {
      setLoading(true);
      const response = await axios.get(studentresults);
      setSessionResults(response.data);
      setLoading(false);
    } catch (err) {
      console.log('There is an error', err);
      setLoading(false);
    }
  };
  
 
  useEffect(() => {
    if (loggedStudent) {
      fetchResults(loggedStudent);
    }
  }, [loggedStudent]);

  const computeGrade = (marks) => {
    if (marks >= 0 && marks <= 39) {
      return 'F';
    } else if (marks >= 40 && marks <= 49) {
      return 'E';
    } else if (marks >= 50 && marks <= 59) {
      return 'D';
    } else if (marks >= 60 && marks <= 69) {
      return 'C';
    } else if (marks >= 70 && marks <= 79) {
      return 'B';
    } else {
      return 'A';
    }
  };

  const generatePdf = () => {
    const input = document.getElementById('results-container');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
      });
      const imgWidth = 595; // A4 width in pixels at 72 DPI
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 10, imgWidth, imgHeight);
      pdf.save('results.pdf');
    });
  };

  return (
    <>
      <h4 className='text-center'>VIEW YOUR RESULTS</h4>
      <button className='bg-primary text-white' onClick={generatePdf}>
        GENERATE PDF
      </button>
      {loading ? (
        <span className='menuloader'></span>
      ) : sessionResults.length === 0 ? (
        <h4>NO RESULTS TO SHOW</h4>
      ) : (
        <div id='results-container'>
          {sessionResults.map((session, index) => (
            <div key={index} className='mt-3'>
              <h5>{`${session.year} ${session.term} ${session.name} RESULTS`}</h5>
              {session.results.length === 0 ? (
                <p>No results for this session</p>
              ) : (
                <table className='table_result mt-4'>
                  <thead>
                    <tr>
                      <th scope='col text-white'>Subject</th>
                      <th scope='col'>Marks</th>
                      <th scope='col'>Grade</th>
                      <th scope='col'>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.results.map((result) => (
                      <tr key={result.id}>
                        <th scope='row'>{result.exam_name}</th>
                        <td>{result.marks}</td>
                        <td>{computeGrade(result.marks)}</td>
                        <td>{result.feedback}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Results;
