import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './examPage.css';
import { AuthContext } from '@/Context/AuthContext';

function ExamQtn() {
  const { id } = useParams();
  const { user, students } = useContext(AuthContext);
  const navigate = useNavigate();
  const deptExamUrl = `http://127.0.0.1:8000/school/exam_questions/${id}`;
  const updateStatus = `http://127.0.0.1:8000/school/update_status/${id}`;
  const updateExam = `http://127.0.0.1:8000/school/updateExam/${id}`;
  const updateQuestion = `http://127.0.0.1:8000/school/update_question/${id}`;
  const updateAnswerUrl = `http://127.0.0.1:8000/school/update_answer`;

  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [studentId, setStudentId] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [qtnNumber, setQtnNumber] = useState(1);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(deptExamUrl);
        setExamData(response.data);

        const storedTimeLeft = localStorage.getItem(`timeLeft_${id}`);
        if (storedTimeLeft) {
          setTimeLeft(parseInt(storedTimeLeft, 10));
        } else {
          const duration = parseDuration(response.data.duration);
          setTimeLeft(duration);
          localStorage.setItem(`timeLeft_${id}`, duration);
        }
      } catch (err) {
        console.error('Error fetching exam data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  useEffect(() => {
    const loggedInStudent = students.find(student => student.user === user.user_id);
    if (loggedInStudent) {
      setStudentId(loggedInStudent.id);
    }
  }, [students, user.user_id]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        const newTimeLeft = prev - 1;
        localStorage.setItem(`timeLeft_${id}`, newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, id]);

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleAnswerChange = async (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    try {
      await axios.patch(`${updateAnswerUrl}/${questionId}`, { ans: answer });
    } catch (err) {
      console.error("Error updating answer", err);
    }

    setExamData((prevData) => {
      const updatedQuestions = prevData.questions.map((question) =>
        question.id === questionId ? { ...question, ans: answer } : question
      );
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const QuestionUpdate = async () => {
    const questionsList = examData.questions.map(qtn => qtn.id);

    try {
      const response = await axios.patch(updateQuestion, { questions: questionsList });
      console.log(response.data);
    } catch (err) {
      console.error('Error updating questions', err);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQtnNumber(qtnNumber + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQtnNumber(qtnNumber - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!examData || !examData.questions) {
      console.error('Exam data or questions are not available.');
      return;
    }

    await QuestionUpdate();

    const formData = {
      date: examData.date,
      department: examData.department.id,
      duration: examData.duration,
      name: examData.name,
      student: studentId,
      questions: examData.questions.map(qtn => qtn.id),
      examSession : examData.examSession
    };

    try {
      await axios.patch(updateStatus, { status: 'Submitted' });
      const response = await axios.put(updateExam, formData);
      console.log(response);
      localStorage.removeItem(`timeLeft_${id}`);
      navigate('/student/dashboard'); // Navigate to the next page after successful submission
    } catch (err) {
      console.error('Error submitting the exam', err);
    }
  };

  if (loading) {
    return <div className="menuloader"></div>;
  }

  if (!examData || !examData.questions || examData.questions.length === 0) {
    return <div>No exam data available.</div>;
  }

  const currentQuestion = examData.questions[currentQuestionIndex];

  return (
    <div className="exam-qtn-container">
      <h1>{examData.name} Exam</h1>

      <div className="row">
        <div className="col-md-8 col-sm-12 section">
          <div className="row">
            <div className="col-md-12">
              <p>{qtnNumber}. {currentQuestion.text}</p>
              {currentQuestion.image && (
                <img src={`http://127.0.0.1:8000/${currentQuestion.image}`} alt="Question" className="question-image" />
              )}

              <div className="options">
                {['option_1', 'option_2', 'option_3', 'option_4', 'option_5'].map((option) => (
                  currentQuestion[option] && (
                    <label key={option} className='lbl'>
                      <input
                        type={currentQuestion.answer_mode === 'single' ? 'radio' : 'checkbox'}
                        name={`question-${currentQuestion.id}`}
                        value={currentQuestion[option]}
                        checked={answers[currentQuestion.id] === currentQuestion[option]}
                        onChange={() => handleAnswerChange(currentQuestion.id, currentQuestion[option])}
                      />
                      {currentQuestion[option]}
                    </label>
                  )
                ))}
              </div>

            </div>

            <div className="col-md-12">

              <div className="navigation-buttons">
                <button disabled={currentQuestionIndex === 0} onClick={handlePrevious} className='bg-primary text-white text-center'>
                  Previous
                </button>

                {currentQuestionIndex === examData.questions.length - 1 ? (
                  <button onClick={handleSubmit} className='bg-primary text-white text-center'>Finish</button>
                ) : (
                  <button
                    onClick={handleNext}
                    className='bg-primary text-white text-center'
                  >
                    Next
                  </button>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* timer column */}
        <div className="col-md-4 col-sm-12 qtn_indi">
          <div className={timeLeft <= 60 ? 'timer bg-white p-3' : 'still bg-white p-3'}>
            Time Left: {new Date(timeLeft * 1000).toISOString().substr(11, 8)}
          </div>

          <div className="question-indicators">
            {examData.questions.map((question, index) => (
              <span
                key={question.id}
                className={`indicator ${answers[question.id] ? 'answered mt-2' : ''}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </span>
            ))}
          </div>

          <p className='mt-3 color-alert alert-danger p-2 warning'>This Exam Will Automatically Submit its self when the Time is done So When You Are Attempting this exam be time-conscious
            So that you can be able to attempt every question
          </p>
        </div>
      </div>

    </div>
  );
}

export default ExamQtn;
