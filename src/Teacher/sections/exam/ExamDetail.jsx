import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { AuthContext } from '@/Context/AuthContext';

const postExams = 'http://127.0.0.1:8000/school/post_exam';

function ExamDetail() {
    const { user, teachers } = useContext(AuthContext);
    const [examDetails, setExamDetails] = useState({ name: "", duration: "", date: "", description: "", week: "", examSession: "Beginning Term" });
    const [teacherQuestions, setTeacherQuestions] = useState([]);

    const loggedinTeacher = teachers.find(teacher => teacher.user === user.user_id);
    const departmentId = loggedinTeacher.department.id;

    const questionView = `http://127.0.0.1:8000/school/get_teacher_questions/${loggedinTeacher.id}/${departmentId}`;

    const getTeacherQuestions = async () => {
        try {
            const response = await axios.get(questionView);
            const data = response.data;
            setTeacherQuestions(data);
        } catch (err) {
            console.log('there is server issue', err);
        }
    };

    useEffect(() => {
        getTeacherQuestions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails({ ...examDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const examData = {
            name: examDetails.name,
            questions: teacherQuestions.map(q => q.id),
            department: departmentId,
            duration: examDetails.duration,
            date: examDetails.date,
            description: examDetails.description,
            week: examDetails.week,
            examSession: examDetails.examSession
        };

        axios.post(postExams, examData)
            .then(response => {
                if (response.status === 201) {
                    showSuccessAlert("Exam Has Been Posted");
                    setExamDetails({ name: "", duration: "", date: "", description: "", week: "", examSession: "Beginning Term" });
                }
            }).catch(err => {
                console.log('there is a server error', err);
            });
    };

    const showSuccessAlert = (message) => {
        Swal.fire({
            title: message,
            icon: "success",
            timer: 2000,
            position: "center",
            toast: false,
            timerProgressBar: true,
            showConfirmButton: true,
            customClass: {
                popup: 'swal2-high-zindex'
            }
        });
    };

    return (
        <>
            <div className="exam">
                <h4 className='text-center'>VIEW EXAM DETAILS</h4>

                <form className='mt-3' onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Exam Name
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail3"
                                name='name'
                                value={examDetails.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Description
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail3"
                                name='description'
                                value={examDetails.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Week
                        </label>
                        <p className='text-secondary'>Enter in number format (1,2,3....)</p>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                id="inputEmail3"
                                name='week'
                                value={examDetails.week}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Exam Duration
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail3"
                                name='duration'
                                value={examDetails.duration}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Exam Date
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="date"
                                className="form-control"
                                id="inputEmail3"
                                name='date'
                                value={examDetails.date}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="answer_mode" className="col-sm-2 col-form-label">Exam Session</label>
                        <div className="col-sm-10">
                            <select
                                className="form-control"
                                id="answer_mode"
                                name="examSession"
                                value={examDetails.examSession}
                                onChange={handleChange}
                            >
                                <option value="Beginning Term">Beginning Term</option>
                                <option value="Mid-Term">Mid-Term</option>
                                <option value="End-Term">End-Term</option>
                            </select>
                        </div>
                    </div>

                    <button type='submit' className='btn bg-primary text-white text-center'>Submit Exam</button>
                </form>

                <p className='text-center mt-3'>AVAILABLE QUESTIONS</p>
                <ul className="list-group">
                    {teacherQuestions.map((qtns, index) => {
                        const { id, text } = qtns;
                        return (
                            <>
                                <li key={id} className='d-flex showqnts list-group-item d-flex justify-content-between align-items-center'>
                                    <p>{index + 1}. {text}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default ExamDetail;
