import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './page.css';

function Headpages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='headlink'>
      <button className='menu-button-close text-white' onClick={toggleMenu}>
        {isMenuOpen ? (
          <p>
            <i className="bi bi-arrow-right-circle-fill"></i> <span>Close Menu</span>
          </p>
        ) : (
          <p>
            <i className="bi bi-arrow-right-circle-fill"></i> <span>Open Menu</span>
          </p>
        )}
      </button>
      
      <div className={`links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className={location.pathname === '/headTeacher/dashboard' ? 'active' : ''}>
            <Link to='/headTeacher/dashboard'>Dashboard</Link>
          </li>
          <li className={location.pathname === '/headTeacher/staff' ? 'active' : ''}>
            <Link to='/headTeacher/staff'>Staff Management</Link>
          </li>
          <li className={location.pathname === '/headTeacher/student_management' ? 'active' : ''}>
            <Link to='/headTeacher/student_management'>Student Management</Link>
          </li>
          <li className={location.pathname === '/headTeacher/event' ? 'active' : ''}>
            <Link to='/headTeacher/event'>Event Management</Link>
          </li>
          {/* <li className={location.pathname === '/headTeacher/reports' ? 'active' : ''}>
            <Link to='/headTeacher/reports'>Reports</Link>
          </li> */}
        </ul>
      </div>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
}

export default Headpages;
