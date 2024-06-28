import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

function Pages() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className='sidelists'>
        <ul className='sided'>

          <li>
            <i className="bi bi-activity"></i>
            <p><Link to='/teacher/dashboard'>DashBoard</Link></p>
          </li>

          <li>
            <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div className="lite d-flex align-center" onClick={toggleDropdown}>
                <span>
                <i className="bi bi-person-circle"></i>
                <p className='text-white'>Teacher Profile</p>
                </span>
                
                <i className={`bi bi-chevron-down ${dropdownOpen ? 'rotate' : ''}`}></i>
              </div>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <p><Link to='/teacher/profile'>Profile</Link></p>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <i className="bi bi-newspaper"></i>
            <p><Link to='/teacher/set_exam'>Set Exam</Link></p>
          </li>

          <li>
            <i className="bi bi-plus-slash-minus"></i>
            <p><Link to='/teacher/upload_work'>Learning Materials</Link></p>
          </li>

          <li>
            <i className="bi bi-person-arms-up"></i>
            <p><Link to='/teacher/perfomance'>Perfomance</Link></p>
          </li>

          <li>
            <i className="bi bi-life-preserver"></i>
            <p><Link to='/teacher/student_list'>Submissions</Link></p>
          </li>

          <li>
            <i className="bi bi-box-arrow-right"></i>
            <p><Link to='/teacher/logout'>Logout</Link></p>
          </li>

        </ul>
      </div>
    </>
  );
}

export default Pages;
