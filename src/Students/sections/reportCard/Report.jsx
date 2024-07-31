import React, { useEffect, useState } from 'react';
import './report.css';
import useCustomHook from '../customHook';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const sessionUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/exam_session';

function Report() {
  const { loggedStudent } = useCustomHook();
  const [report, setReport] = useState([]);
  const [reportDetail, setReportDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (studentId) => {
    const studentResultsUrl = `https://school-management-system-backend-u6m8.onrender.com/school/get_report/${studentId}`;
    try {
      setLoading(true);
      const response = await axios.get(studentResultsUrl);
      setReport(response.data);
      setLoading(false);
    } catch (err) {
      console.log('There is an error', err);
      setLoading(false);
    }
  };

  const fetchSession = async () => {
    try {
      const response = await axios.get(sessionUrl);
      const data = response.data;

      // Filter report based on session details
      const filteredReport = report.filter(res =>
        data.some(session =>
          session.name === res.exam.examSession &&
          session.get_current_term === res.exam.get_current_term &&
          session.year === res.exam.current_year
        )
      );

      setReportDetail(filteredReport);
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  const generatePdf = () => {
    const input = document.querySelector('.wrap_up');
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
      pdf.save('report.pdf');
    });
  };

  //grading logic
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

  useEffect(() => {
    if (loggedStudent) {
      fetchReport(loggedStudent);
    }
  }, [loggedStudent]);

  useEffect(() => {
    if (report.length > 0) {
      fetchSession();
    }
  }, [report]);

  return (
    <>
      <h4>GENERATE YOUR REPORT CARD</h4>

      {loading ? (
        <span className='menuloader'></span>
      ) : reportDetail.length === 0 ? (
        <h4>No Activities Yet!!</h4>
      ) : (
        <>
          <button className='bg-primary text-white text-center' onClick={generatePdf}>Generate PDF</button>
          <div className="wrap_up">
          <div className="moreinfo">
            <ul className='p-3'>
              <li>
                <h5>Name:</h5>
                <span>{reportDetail[0]?.student.name}</span>
              </li>
              <li>
                <h5>Registration Number:</h5>
                <span>{reportDetail[0]?.student.reg_no}</span>
              </li>
              <li>
                <h5>Year:</h5>
                <span>{reportDetail[0]?.current_year}</span>
              </li>
              <li>
                <h5>Term:</h5>
                <span>{reportDetail[0]?.current_term}</span>
              </li>
            </ul>
          </div>
          <div className="container">
            <h5>{reportDetail[0]?.current_year} {reportDetail[0]?.current_term} {reportDetail[0]?.exam_session} RESULTS</h5>
            <table className="table_result">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {reportDetail.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.exam_name}</td>
                    <td>{item.marks}</td>
                    <td>{computeGrade(item.marks)}</td>
                    <td>{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
         
        </>
      )}
    </>
  );
}

export default Report;
