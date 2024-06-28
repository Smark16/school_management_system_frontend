import React, { useState, useEffect, useContext } from 'react';
import './HeadReport.css';
import logo from '@/HeadTeacher/sections/Reports/imgs/kampala.png';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AuthContext } from '@/Context/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function CircularWithValueLabel({ value }) {
  return <CircularProgressWithLabel value={value} />;
}

function HeadReport() {
  const { teachers, events, students, departments } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const data = await Promise.all(departments.map(async (dept) => {
        const response = await fetch(`http://127.0.0.1:8000/school/department_perfomance/${dept.id}`);
        const result = await response.json();
        return { id: dept.id, name: dept.name, performance: result.percentage };
      }));
      setPerformanceData(data);
    };

    fetchPerformanceData();
  }, [departments]);

  const downloadReport = () => {
    const input = document.querySelector('.report_container');
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

  return (
    <>
      <div className="report_container">
        <header className="header_event">
          <img src={logo} alt="School Logo" className="logo" />
          <div className="intro">
            <h1 className="text-center">School Performance and Events Report</h1>
            <p>Download a detailed report of school performance and upcoming events.</p>
            <span className="alert alert-info text-center">Academic Year {currentYear}-{currentYear + 1}</span>
          </div>
        </header>
        <button className="bg-primary text-white text-center" onClick={downloadReport}>
          Download PDF Report
        </button>
        <div className="report" id="report-content">
          <div className="_report">
            <h2 className="text-center">Term Overview</h2>
            <ul>
              <li>
                <span>Payment Overview</span>
                <CircularWithValueLabel value={60} />
              </li>
              <li>
                <span>Removed Students</span>
                <CircularWithValueLabel value={60} />
              </li>
              <li>
                <span>New Students</span>
                <CircularWithValueLabel value={60} />
              </li>
            </ul>
            <div className="row p-3">
              <div className="col-md-12 col-sm-12 deptPerfomance bg-white p-2">
                <div className="perfo">
                  <div className="dept">
                    <h5 className="text-primary text-center">Department Performances</h5>
                    {performanceData.map((dept) => (
                      <div key={dept.id} className="dept">
                        <span>{dept.name}</span>
                        <div className="dept_info">
                        <div className="outerDiv">
                          <div className="innerDiv bg-primary" style={{ width: `${dept.performance}%` }}></div>
                        </div>
                        <span>{dept.performance.toFixed(2)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="moreinformation bg-white">
                    <h5 className="text-center">School Structure</h5>
                    <ul>
                      <li>
                        <span>Total Teachers: </span>
                        <h4>{teachers.length}</h4>
                      </li>
                      <li>
                        <span>Total Departments: </span>
                        <h4>{departments.length}</h4>
                      </li>
                      <li>
                        <span>Total Students: </span>
                        <h4>{students.length}</h4>
                      </li>
                      <li>
                        <span>Total Events: </span>
                        <h4>{events.length}</h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 termEvents bg-white p-2">
                <h5 className="text-primary text-center">Term Events</h5>
                {events.map((event, index) => (
                  <div key={index} className="event">
                    <ul>
                      <li>
                        <div className="eventtite">
                          <h5>{event.name}</h5>
                          <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
                        </div>
                        <div className="dte">
                          <span>{event.startDate && event.endDate ? `${event.startDate} - ${event.endDate}` : ''}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadReport;
