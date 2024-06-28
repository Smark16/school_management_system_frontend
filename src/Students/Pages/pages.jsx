import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '@/Context/AuthContext';
import './pages.css';

function StudentPages() {
  const {departments} = useContext(AuthContext)
  console.log(departments)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropped, setDropped] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggledDropdown = ()=>{
     setDropped(!dropped)
  }

  return (
    <>
      <div className='sidelist'>
        <ul className='stud_list'>
          <li>
            <i className="bi bi-activity"></i>
            <p><Link to='/student/dashboard'>DashBoard</Link></p>
          </li>


 <div className={`dropdown ${dropped ? 'open' : ''}`}>
            <div className="lite" onClick={toggledDropdown}>
              <li>
              <i className="bi bi-person-circle"></i>
                <p className='text-black'>Student Profile</p>
              </li>
              <i className={`text-black bi bi-chevron-down ${dropped ? 'rotate' : ''}`}></i>
            </div>
            <div className="submenu">
              <ul>
                  <li>
                  <p><Link to='/student/profile'>Profile</Link></p>
                  </li>
              </ul>
            </div>
          </div>

          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <div className="lite" onClick={toggleDropdown}>
              <li>
              <i className="bi bi-house-fill"></i>
                <p className='text-black'>Departments</p>
              </li>
              <i className={`text-black bi bi-chevron-down ${dropdownOpen ? 'rotate' : ''}`}></i>
            </div>
            <div className="submenu">
              <ul>
              {departments.map(dept =>{
                const {id, name} = dept
                return (
                  <>
                  <li key={id}>
                  <p><Link to={`/student/department/${id}`}>{name}</Link></p>
                  </li>
                  </>
                )
              })}
              </ul>
              
            </div>
          </div>

          <li>
          <i className="bi bi-layers-fill"></i>
            <p><Link to='/student/results'>Results</Link></p>
          </li>

          <li>
          <i className="bi bi-flag-fill"></i>
            <p><Link to='/student/report'>Report Card</Link></p>
          </li>

          <li>
          <i className="bi bi-fast-forward-circle"></i>
            <p><Link to='/student/faqs'>FAQs</Link></p>
          </li>


          <li>
            <i className="bi bi-box-arrow-right"></i>
            <p><Link to='/student/logout'>Logout</Link></p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default StudentPages;
