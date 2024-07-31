import React from 'react';
import './styles/bootstrap4/bootstrap.min.css'
import './styles/responsive.css'
import './plugins/fontawesome-free-5.0.1/css/fontawesome-all.css'
import './plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import './plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import './plugins/OwlCarousel2-2.2.1/animate.css'
import './styles/main_styles.css'
// import './styles/contact_responsive.css'
// import './styles/contact_styles.css'
// import './styles/courses_responsive.css'
// import './styles/courses_styles.css'
// import './styles/elements_responsive.css'
// import './styles/elements_styles.css'
// import './styles/news_post_responsive.css'
// import './styles/news_post_styles.css'
// import './styles/news_responsive.css'
// import './styles/news_styles.css'
// import './styles/teachers_responsive.css'
// import './styles/teachers_styles.css'

// js imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Import jQuery and other scripts
import 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Link } from 'react-router-dom';

// images
import logo from './images/logo.png'
import phone_call from './images/phone-call.svg'
import earth_globe from './images/earth-globe.svg'
import books from './images/books.svg'
import professor from './images/professor.svg'
import course_1 from './images/course_1.jpg'
import course_2 from './images/course_2.jpg'
import course_3 from './images/course_3.jpg'
import author from './images/author.jpg'
import exam from './images/exam.svg'
import blackboard from './images/blackboard.svg'
import motarboard from './images/mortarboard.svg'
import testimonials_user from './images/testimonials_user.jpg'
import event_1 from './images/event_1.jpg'
import event_2 from './images/event_2.jpg'
import event_3 from './images/event_3.jpg'
import placeholder from './images/placeholder.svg'
import smart_phone from './images/smartphone.svg'
import envelope from './images/envelope.svg'
import background_Image from './images/slider_background.jpg'

function Index() {
	
  return (
	<>
<div className="super_container">
  {/* Header */}
  <header className="nav_header d-flex flex-row mt-3">
    <div className="header_content d-flex flex-row align-items-center">
      {/* Logo */}
      <div className="logo_container">
   
          <img src={logo} alt="" className='mt-3 text-center'/>
        
      </div>
      {/* Main Navigation */}
      <nav className="main_nav_container">
        <div className="main_nav">
          <ul className="main_nav_list">
            <li className="main_nav_item">
              <Link to="/index">home</Link>
            </li>
            <li className="main_nav_item">
              <Link to='#'>about us</Link>
            </li>
            <li className="main_nav_item">
              <Link to="/courses">courses</Link>
            </li>
            <li className="main_nav_item">
              <Link to="/elements">elements</Link>
            </li>
            <li className="main_nav_item">
              <Link to="/news">news</Link>
            </li>
            <li className="main_nav_item">
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div className="header_side d-flex flex-row justify-content-center align-items-center">
      <img src={phone_call } alt="" />
      <span>+43 4566 7788 2457</span>
    </div>
    {/* Hamburger */}
    <div className="hamburger_container">
      <i className="fas fa-bars trans_200" />
    </div>
  </header>
  {/* Menu */}
  <div className="menu_container menu_mm">
    {/* Menu Close Button */}
    <div className="menu_close_container">
      <div className="menu_close" />
    </div>
   
  </div>
  {/* Home */}
  <div className="home">
    {/* Hero Slider */}
    <div className="hero_slider_container">
      <div className="hero_slider owl-carousel">
        {/* Hero Slide */}
        <div className="hero_slide">
          <div
            className="hero_slide_background"
          
          />
          
          <div className="hero_slide_container d-flex flex-column align-items-center justify-content-center">
            <div className="hero_slide_content text-center">
              <h1
                data-animation-in="fadeInUp"
                data-animation-out="animate-out fadeOut"
              >
                Get your <span>Education</span> today!
              </h1>
            </div>
          </div>
        </div>
        {/* Hero Slide */}
        <div className="hero_slide">
          <div
            className="hero_slide_background"
           
          />
          <div className="hero_slide_container d-flex flex-column align-items-center justify-content-center">
            <div className="hero_slide_content text-center">
              <h1
                data-animation-in="fadeInUp"
                data-animation-out="animate-out fadeOut"
              >
                Get your <span>Education</span> today!
              </h1>
            </div>
          </div>
        </div>
        {/* Hero Slide */}
        <div className="hero_slide">
          <div
            className="hero_slide_background"
           
          />
          <div className="hero_slide_container d-flex flex-column align-items-center justify-content-center">
            <div className="hero_slide_content text-center">
              <h1
                data-animation-in="fadeInUp"
                data-animation-out="animate-out fadeOut"
              >
                Get your <span>Education</span> today!
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hero_slider_left hero_slider_nav trans_200">
        <span className="trans_200">prev</span>
      </div>
      <div className="hero_slider_right hero_slider_nav trans_200">
        <span className="trans_200">next</span>
      </div> */}
    </div>
  </div>
  <div className="hero_boxes">
    <div className="hero_boxes_inner">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 hero_box_col">
            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
              <img src={earth_globe} className="svg" alt="" />
              <div className="hero_box_content">
                <h2 className="hero_box_title">Online Courses</h2>
                <Link to="/courses" className="hero_box_link">
                  view more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 hero_box_col">
            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
              <img src={books} className="svg" alt="" />
              <div className="hero_box_content">
                <h2 className="hero_box_title">Our Library</h2>
                <Link to="/courses" className="hero_box_link">
                  view more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 hero_box_col">
            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
              <img src={professor} className="svg" alt="" />
              <div className="hero_box_content">
                <h2 className="hero_box_title">Our Teachers</h2>
                <Link to="/teachers" className="hero_box_link">
                  view more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Popular */}
  <div className="popular page_section">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title text-center">
            <h1>Popular Courses</h1>
          </div>
        </div>
      </div>
      <div className="row course_boxes">
        {/* Popular Course Item */}
        <div className="col-lg-4 course_box">
          <div className="card">
            <img
              className="card-img-top"
              src={course_1}
              alt="https://unsplash.com/@kellybrito"
            />
            <div className="card-body text-center">
              <div className="card-title">
                <a href="courses.html">A complete guide to design</a>
              </div>
              <div className="card-text">
                Adobe Guide, Layes, Smart Objects etc...
              </div>
            </div>
            <div className="price_box d-flex flex-row align-items-center">
              <div className="course_author_image">
                <img
                  src={author}
                  alt="https://unsplash.com/@mehdizadeh"
                />
              </div>
              <div className="course_author_name">
                Michael Smith, <span>Author</span>
              </div>
              <div className="course_price d-flex flex-column align-items-center justify-content-center">
                <span>$29</span>
              </div>
            </div>
          </div>
        </div>
        {/* Popular Course Item */}
        <div className="col-lg-4 course_box">
          <div className="card">
            <img
              className="card-img-top"
              src={course_2}
              alt="https://unsplash.com/@cikstefan"
            />
            <div className="card-body text-center">
              <div className="card-title">
                <Link to="/courses">Beginners guide to HTML</Link>
              </div>
              <div className="card-text">
                Adobe Guide, Layes, Smart Objects etc...
              </div>
            </div>
            <div className="price_box d-flex flex-row align-items-center">
              <div className="course_author_image">
                <img
                  src={author}
                  alt="https://unsplash.com/@mehdizadeh"
                />
              </div>
              <div className="course_author_name">
                Michael Smith, <span>Author</span>
              </div>
              <div className="course_price d-flex flex-column align-items-center justify-content-center">
                <span>$29</span>
              </div>
            </div>
          </div>
        </div>
        {/* Popular Course Item */}
        <div className="col-lg-4 course_box">
          <div className="card">
            <img
              className="card-img-top"
              src={course_3}
              alt="https://unsplash.com/@dsmacinnes"
            />
            <div className="card-body text-center">
              <div className="card-title">
                <Link to="/courses">Advanced Photoshop</Link>
              </div>
              <div className="card-text">
                Adobe Guide, Layes, Smart Objects etc...
              </div>
            </div>
            <div className="price_box d-flex flex-row align-items-center">
              <div className="course_author_image">
                <img
                  src={author}
                  alt="https://unsplash.com/@mehdizadeh"
                />
              </div>
              <div className="course_author_name">
                Michael Smith, <span>Author</span>
              </div>
              <div className="course_price d-flex flex-column align-items-center justify-content-center">
                <span>$29</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Register */}
  <div className="register">
    <div className="container-fluid">
      <div className="row row-eq-height">
        <div className="col-lg-6 nopadding">
          {/* Register */}
          <div className="register_section d-flex flex-column align-items-center justify-content-center">
            <div className="register_content text-center">
              <h1 className="register_title">
                Register now and get a discount <span>50%</span> discount until
                1 January
              </h1>
              <p className="register_text">
                In aliquam, augue a gravida rutrum, ante nisl fermentum nulla,
                vitae tempor nisl ligula vel nunc. Proin quis mi malesuada,
                finibus tortor fermentum. Aliquam, augue a gravida rutrum, ante
                nisl fermentum nulla, vitae tempo.
              </p>
              <div className="button button_1 register_button mx-auto trans_200">
                <Link to="/login">Login now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 nopadding">
          {/* Search */}
          <div className="search_section d-flex flex-column align-items-center justify-content-center">
            <div
              className="search_background"
              style={{ backgroundImage: "url(images/search_background.jpg)" }}
            />
            <div className="search_content text-center">
              <h1 className="search_title">Search for your course</h1>
              <form id="search_form" className="search_form" action="post">
                <input
                  id="search_form_name"
                  className="input_field search_form_name"
                  type="text"
                  placeholder="Course Name"
                  required="required"
                  data-error="Course name is required."
                />
                <input
                  id="search_form_category"
                  className="input_field search_form_category"
                  type="text"
                  placeholder="Category"
                />
                <input
                  id="search_form_degree"
                  className="input_field search_form_degree"
                  type="text"
                  placeholder="Degree"
                />
                <button
                  id="search_submit_button"
                  type="submit"
                  className="search_submit_button trans_200"
                  value="Submit"
                >
                  search course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Services */}
  <div className="services page_section">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title text-center">
            <h1>Our Services</h1>
          </div>
        </div>
      </div>
      <div className="row services_row">
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={earth_globe} alt="" className='ser_img' />
          </div>
          <h3>Online Courses</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={exam} alt="" className='ser_img'/>
          </div>
          <h3>Indoor Courses</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={books} alt="" className='ser_img'/>
          </div>
          <h3>Amazing Library</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={professor} alt="" className='ser_img'/>
          </div>
          <h3>Exceptional Professors</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={blackboard} alt="" className='ser_img'/>
          </div>
          <h3>Top Programs</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
        <div className="col-lg-4 service_item text-left d-flex flex-column align-items-start justify-content-start">
          <div className="icon_container d-flex flex-column justify-content-end">
            <img src={motarboard} alt=""className='ser_img'/>
          </div>
          <h3>Graduate Diploma</h3>
          <p>
            In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
            tempor nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor
            fermentum.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Testimonials */}
  <div className="testimonials page_section">
    {/* <div class="testimonials_background" style="background-image:url(images/testimonials_background.jpg)"></div> */}
    <div className="testimonials_background_container prlx_parent">
      <div
        className="testimonials_background prlx"
        style={{ backgroundImage: "url(images/testimonials_background.jpg)" }}
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title text-center">
            <h1>What our students say</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="testimonials_slider_container">
            {/* Testimonials Slider */}
            <div className="owl-carousel owl-theme testimonials_slider">
              {/* Testimonials Item */}
              <div className="owl-item">
                <div className="testimonials_item text-center">
                  <div className="quote">“</div>
                  <p className="testimonials_text">
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor fermentum.In aliquam, augue a
                    gravida rutrum, ante nisl fermentum nulla, vitae tempor nisl
                    ligula vel nunc. Proin quis mi malesuada, finibus tortor
                    fermentum.
                  </p>
                  <div className="testimonial_user">
                    <div className="testimonial_image mx-auto">
                      <img src={testimonials_user} alt="" />
                    </div>
                    <div className="testimonial_name">james cooper</div>
                    <div className="testimonial_title">Graduate Student</div>
                  </div>
                </div>
              </div>
              {/* Testimonials Item */}
              <div className="owl-item">
                <div className="testimonials_item text-center">
                  <div className="quote">“</div>
                  <p className="testimonials_text">
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor fermentum.In aliquam, augue a
                    gravida rutrum, ante nisl fermentum nulla, vitae tempor nisl
                    ligula vel nunc. Proin quis mi malesuada, finibus tortor
                    fermentum.
                  </p>
                  <div className="testimonial_user">
                    <div className="testimonial_image mx-auto">
                      <img src={testimonials_user} alt="" />
                    </div>
                    <div className="testimonial_name">james cooper</div>
                    <div className="testimonial_title">Graduate Student</div>
                  </div>
                </div>
              </div>
              {/* Testimonials Item */}
              <div className="owl-item">
                <div className="testimonials_item text-center">
                  <div className="quote">“</div>
                  <p className="testimonials_text">
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor fermentum.In aliquam, augue a
                    gravida rutrum, ante nisl fermentum nulla, vitae tempor nisl
                    ligula vel nunc. Proin quis mi malesuada, finibus tortor
                    fermentum.
                  </p>
                  <div className="testimonial_user">
                    <div className="testimonial_image mx-auto">
                      <img src={testimonials_user} alt="" />
                    </div>
                    <div className="testimonial_name">james cooper</div>
                    <div className="testimonial_title">Graduate Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Events */}
  <div className="events page_section">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title text-center">
            <h1>Upcoming Events</h1>
          </div>
        </div>
      </div>
      <div className="event_items">
        {/* Event Item */}
        <div className="row event_item">
          <div className="col">
            <div className="row d-flex flex-row align-items-end">
              <div className="col-lg-2 order-lg-1 order-2">
                <div className="event_date d-flex flex-column align-items-center justify-content-center">
                  <div className="event_day">07</div>
                  <div className="event_month">January</div>
                </div>
              </div>
              <div className="col-lg-6 order-lg-2 order-3">
                <div className="event_content">
                  <div className="event_name">
                    <a className="trans_200" href="#">
                      Student Festival
                    </a>
                  </div>
                  <div className="event_location">Grand Central Park</div>
                  <p>
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 order-lg-3 order-1">
                <div className="event_image">
                  <img
                    src={event_1}
                    alt="https://unsplash.com/@theunsteady5"
                    className='img_event'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Event Item */}
        <div className="row event_item">
          <div className="col">
            <div className="row d-flex flex-row align-items-end">
              <div className="col-lg-2 order-lg-1 order-2">
                <div className="event_date d-flex flex-column align-items-center justify-content-center">
                  <div className="event_day">07</div>
                  <div className="event_month">January</div>
                </div>
              </div>
              <div className="col-lg-6 order-lg-2 order-3">
                <div className="event_content">
                  <div className="event_name">
                    <a className="trans_200" href="#">
                      Open day in the Univesrsity campus
                    </a>
                  </div>
                  <div className="event_location">Grand Central Park</div>
                  <p>
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 order-lg-3 order-1">
                <div className="event_image">
                  <img
                    src={event_2}
                    alt="https://unsplash.com/@claybanks1989"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Event Item */}
        <div className="row event_item">
          <div className="col">
            <div className="row d-flex flex-row align-items-end">
              <div className="col-lg-2 order-lg-1 order-2">
                <div className="event_date d-flex flex-column align-items-center justify-content-center">
                  <div className="event_day">07</div>
                  <div className="event_month">January</div>
                </div>
              </div>
              <div className="col-lg-6 order-lg-2 order-3">
                <div className="event_content">
                  <div className="event_name">
                    <a className="trans_200" href="#">
                      Student Graduation Ceremony
                    </a>
                  </div>
                  <div className="event_location">Grand Central Park</div>
                  <p>
                    In aliquam, augue a gravida rutrum, ante nisl fermentum
                    nulla, vitae tempor nisl ligula vel nunc. Proin quis mi
                    malesuada, finibus tortor.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 order-lg-3 order-1">
                <div className="event_image">
                  <img
                    src={event_3}
                    alt="https://unsplash.com/@juanmramosjr"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer */}
  <footer className="footer">
    <div className="container">
      {/* Newsletter */}
      <div className="newsletter">
        <div className="row">
          <div className="col">
            <div className="section_title text-center">
              <h1>Subscribe to newsletter</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="newsletter_form_container mx-auto">
              <form action="post">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-center">
                  <input
                    id="newsletter_email"
                    className="newsletter_email"
                    type="email"
                    placeholder="Email Address"
                    required="required"
                    data-error="Valid email is required."
                  />
                  <button
                    id="newsletter_submit"
                    type="submit"
                    className="newsletter_submit_btn trans_300"
                    value="Submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer_content">
        <div className="row">
          {/* Footer Column - About */}
          <div className="col-lg-3 footer_col">
            {/* Logo */}
            <div className="logo_container">
              <div className="logo">
                <img src={logo} alt="" />
                <span>course</span>
              </div>
            </div>
            <p className="footer_about_text">
              In aliquam, augue a gravida rutrum, ante nisl fermentum nulla,
              vitae tempor nisl ligula vel nunc. Proin quis mi malesuada,
              finibus tortor fermentum, tempor lacus.
            </p>
          </div>
          {/* Footer Column - Menu */}
          <div className="col-lg-3 footer_col">
            <div className="footer_column_title">Menu</div>
            <div className="footer_column_content">
              <ul>
                <li className="footer_list_item">
                  <Link to="/index">Home</Link>
                </li>
                <li className="footer_list_item">
                  <Link to="#">About Us</Link>
                </li>
                <li className="footer_list_item">
                  <Link to="/courses">Courses</Link>
                </li>
                <li className="footer_list_item">
                  <Link to="/news">News</Link>
                </li>
                <li className="footer_list_item">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Column - Usefull Links */}
          <div className="col-lg-3 footer_col">
            <div className="footer_column_title">Usefull Links</div>
            <div className="footer_column_content">
              <ul>
                <li className="footer_list_item">
                  <a href="#">Testimonials</a>
                </li>
                <li className="footer_list_item">
                  <a href="#">FAQ</a>
                </li>
                <li className="footer_list_item">
                  <a href="#">Community</a>
                </li>
                <li className="footer_list_item">
                  <a href="#">Campus Pictures</a>
                </li>
                <li className="footer_list_item">
                  <a href="#">Tuitions</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Column - Contact */}
          <div className="col-lg-3 footer_col">
            <div className="footer_column_title">Contact</div>
            <div className="footer_column_content">
              <ul>
                <li className="footer_contact_item">
                  <div className="footer_contact_icon">
                    <img
                      src={placeholder}
                      alt="https://www.flaticon.com/authors/lucy-g"
                    />
                  </div>
                  Blvd Libertad, 34 m05200 Arévalo
                </li>
                <li className="footer_contact_item">
                  <div className="footer_contact_icon">
                    <img
                      src={smart_phone}
                      alt="https://www.flaticon.com/authors/lucy-g"
                    />
                  </div>
                  0034 37483 2445 322
                </li>
                <li className="footer_contact_item">
                  <div className="footer_contact_icon">
                    <img
                      src={envelope}
                      alt="https://www.flaticon.com/authors/lucy-g"
                    />
                  </div>
                  hello@company.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Copyright */}
      <div className="footer_bar d-flex flex-column flex-sm-row align-items-center">
        <div className="footer_copyright">
          <span>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            Copyright © All rights reserved | This template is made with{" "}
            <i className="fa fa-heart" aria-hidden="true" /> by{" "}
            <a href="https://colorlib.com" target="_blank">
              Colorlib
            </a>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          </span>
        </div>
        <div className="footer_social ml-sm-auto">
          <ul className="menu_social">
            <li className="menu_social_item">
              <a href="#">
                <i className="fab fa-pinterest" />
              </a>
            </li>
            <li className="menu_social_item">
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a>
            </li>
            <li className="menu_social_item">
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li className="menu_social_item">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li className="menu_social_item">
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>

	</>
  )
}

export default Index
