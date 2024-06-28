import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '@/Context/AuthContext';
import './exam.css';

const postQuestionsUrl = 'http://127.0.0.1:8000/school/post_questions';
const editQuestionUrl = 'http://127.0.0.1:8000/school/edit_question';

function SetExams() {
  const { user, teachers } = useContext(AuthContext);
  const [questions, setQuestions] = useState({
    id: null,
    text: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    option_5: '',
    image: null,
    answer_mode: 'single'
  });

  const [showQuestions, setShowQuestions] = useState([]);
  const navigate = useNavigate();

  const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);

  useEffect(() => {
    axios.get(postQuestionsUrl).then(response => {
      setShowQuestions(response.data);
    });
  }, []);

  const handleInsert = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setQuestions({ ...questions, image: selected });
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageLoaded = document.querySelector('.insertImage');
        imageLoaded.src = e.target.result;
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('text', questions.text);
    formdata.append('option_1', questions.option_1);
    formdata.append('option_2', questions.option_2);
    formdata.append('option_3', questions.option_3);
    formdata.append('option_4', questions.option_4);
    formdata.append('option_5', questions.option_5);
    formdata.append('answer_mode', questions.answer_mode);
    formdata.append('teacher', loggedinTeacher.id);
    if (loggedinTeacher) {
      const departmentId = loggedinTeacher.department.id;
      formdata.append('department', departmentId);
    }

    if (questions.image instanceof File) {
      formdata.append('image', questions.image);
    }

    if (questions.id) {
      axios
        .put(`${editQuestionUrl}/${questions.id}`, formdata)
        .then(response => {
          if (response.status === 202) {
            showSuccessAlert('Question Updated Successfully');
            const updatedQuestions = showQuestions.map(q =>
              q.id === questions.id ? response.data : q
            );
            setShowQuestions(updatedQuestions);
            resetForm();
          }
        })
        .catch(err => {
          console.log('There is a server error', err);
        });
    } else {
      axios
        .post(postQuestionsUrl, formdata)
        .then(response => {
          if (response.status === 201) {
            showSuccessAlert('Question Created Successfully');
            setShowQuestions([...showQuestions, response.data]);
            resetForm();
          }
        })
        .catch(err => {
          console.log('There is a server error', err);
        });
    }
  };

  const handleEdit = id => {
    const questionToEdit = showQuestions.find(q => q.id === id);
    setQuestions({ ...questionToEdit });
  };

  const handleDelete = id => {
    axios
      .delete(`http://127.0.0.1:8000/school/delete_question/${id}`)
      .then(response => {
        if (response.status === 204) {
          showSuccessAlert('Question Deleted Successfully');
          setShowQuestions(showQuestions.filter(q => q.id !== id));
        }
      })
      .catch(err => {
        console.log('There is a server error', err);
      });
  };

  const handleExam = () => {
    navigate('/teacher/exam_details');
  };

  const showSuccessAlert = message => {
    Swal.fire({
      title: message,
      icon: 'success',
      timer: 2000,
      toast: true,
      position: 'top',
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  const resetForm = () => {
    setQuestions({
      id: null,
      text: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      option_5: '',
      image: null,
      answer_mode: 'single'
    });
    const imageLoaded = document.querySelector('.insertImage');
    if (imageLoaded) {
      imageLoaded.src = ''; // Clear the image preview
    }
  };

  return (
    <>
      <div className="exam">
        <h4 className='text-center'>SET STUDENT ASSESSMENTS</h4>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="question" className="col-sm-2 col-form-label">Question</label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="question"
                    name="text"
                    value={questions.text}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <span>Options</span>
              {["option_1", "option_2", "option_3", "option_4", "option_5"].map((option, index) => (
                <div className="row mb-3" key={index}>
                  <label htmlFor={option} className="col-sm-2 col-form-label">{`Option ${index + 1}`}</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id={option}
                      name={option}
                      value={questions[option]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
              <div className="row mb-3">
                <label htmlFor="image" className="col-sm-2 col-form-label">Image</label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept='image/*'
                    onChange={handleInsert}
                  />
                  <div>
                    <img
                      src={questions.image instanceof File ? URL.createObjectURL(questions.image) : questions.image}
                      className="insertImage"
                      alt="Preview"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="answer_mode" className="col-sm-2 col-form-label">Answer Mode</label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    id="answer_mode"
                    name="answer_mode"
                    value={questions.answer_mode}
                    onChange={handleChange}
                  >
                    <option value="single">Single</option>
                    <option value="multiple">Multiple</option>
                  </select>
                </div>
              </div>
              <div className="btns">
                <button type="submit" className="btn btn-primary">{questions.id ? "Update Question" : "Save and Add Another"}</button>
              </div>
            </form>
          </div>

          <div className="col-md-6 col-sm-12 bg-white qtns">
            <h4>Your Questions Appear Here</h4>

            <ul>
              {showQuestions.map((qnt, index) => (
                <li key={index} className='d-flex showqnts'>
                  <p>{index + 1}. {qnt.text}</p>
                  <span>
                    <i className="bi bi-archive text-danger" onClick={() => handleDelete(qnt.id)}></i>
                    <i className="bi bi-pen-fill text-primary" onClick={() => handleEdit(qnt.id)}></i>
                  </span>
                </li>
              ))}
            </ul>

            <button type="button" className="btn btn-primary review" disabled={showQuestions.length > 0 ? false : true} onClick={handleExam}>Review</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetExams;
