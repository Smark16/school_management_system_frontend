import React, { useContext, useState } from 'react';
import '../Authenticate/css/boxicon.css';
import '../Authenticate/css/core.css';
import '../Authenticate/css/theme_default.css';
import '../Authenticate/css/demo.css';
import '../Authenticate/css/scroll.css';
import '../Authenticate/css/page_auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  const { loginUser,noActiveAccount } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoader(false)
    e.preventDefault();
    if (loginUser) {
      const username = credentials.username
      const password = credentials.password
      console.log(username, password)
      loginUser(username, password);
      setLoader(true)
    }
  };

  return (
    <div className="container-xxl mt-5">
     
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              {/* Logo */}
              <p className='alert alert-info'>NOTE: Login in as headteacher so that you can register students and teachers then view there dashboard(
        "headteacher_username" = "headmaster@gmail.com",
         "headteacher_password" = "head@12345",
        )</p>
              <div className="app-brand justify-content-center">
            
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-text demo text-body fw-bolder">
                    KAMPALA INFANT SCHOOL
                  </span>
                </a>
              </div>
              {/* /Logo */}
              <h4 className="mb-2">Welcome back! 👋</h4>
              <p className="mb-4">
                Please sign-in to your account and start the adventure
              </p>
              <form id="formAuthentication" className="mb-3"  onSubmit={handleSubmit}>
                <div className="mb-3">
                 {noActiveAccount && (<p className='alert alert-danger'>{noActiveAccount}</p>)} 
                  <label htmlFor="email" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="username"
                    value={credentials.username}
                    placeholder="Enter your email or username"
                    autoFocus
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      placeholder="············"
                      aria-describedby="password"
                      onChange={handleChange}
                    />
                    <span className="input-group-text cursor-pointer">
                      <i className="bx bx-hide" />
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  {/* Uncomment if needed
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      Remember Me
                    </label>
                  </div>
                  */}
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">
                    {loader ? (<>
                    Signing in...
                    </>) : (<>
                        Sign in
                    </>)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
