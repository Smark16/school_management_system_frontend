import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/Context/AuthContext';

const new_resultUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/new_results'
const examUrl = 'https://school-management-system-backend-u6m8.onrender.com/school/exams'

import axios from 'axios'
import './student.css';
import Swal from 'sweetalert2';

function Questions() {
    const { questionAns, studentInfo, examArray,departmentInfo } = useContext(AuthContext);
    const [results, setResults] = useState({marks:"", feedback:""})
    const [exam, setExam] = useState([])

    const fetchExam = async()=>{
        try{
          const response = await axios(examUrl)
          const data = response.data
          setExam(data.find((exams)=> exams.id === examArray.id))
        }catch(err){
            console.log('there is an error', err)
        }
    }
    console.log(exam)
    
    useEffect(()=>{
       fetchExam()
    }, [])
    

    const handleChange = (e)=>{
       const {name, value} = e.target
       setResults({...results, [name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("student", parseInt(studentInfo.id))
        formdata.append("exam", exam.id) 
        formdata.append("exam_name", exam.name)
        formdata.append("current_year", new Date().getFullYear())
        formdata.append("exam_session", exam.examSession)
        formdata.append("current_term", exam.get_current_term)
        formdata.append("department", departmentInfo.id)
        formdata.append("marks", results.marks)
        formdata.append("feedback", results.feedback)

        axios.post(new_resultUrl, formdata)
        .then(response =>{
            if(response.status === 201){
          showSuccessAlert('Results Posted SuccessFully')
            }
        }).catch(err =>{
            console.log("there is an error", err)
        })
    }  

    
// success Alert
const  showSuccessAlert =(message)=>{
    Swal.fire({
        title: message,
        icon: "success",
        timer: 2000,
      });
    };
    return (
        <>
        <div className="container">
            <h5 className='text-center'><span>{studentInfo.name}</span> {studentInfo.reg_no}</h5>
            <div>
                {questionAns.map((ans, index) => (
                    <div className="question-card" key={index}>
                        <p>{ans.text}</p>
                        <ul>
                            <li>
                                <span>Ans:</span>
                                <h6>{ans.ans}</h6>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>


        <div className="grade">
            {/* form submission */}
         <form className='mt-3' onSubmit={handleSubmit}>
         <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
           Enter Grade:
      </label>
    <div className="col-sm-10">
      <input 
      type="number" 
      className="form-control" 
      id="inputEmail3"
      name='marks'
      value={results.marks}
      onChange={handleChange} 
      />
    </div>
  </div>

  <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
         FeedBack
      </label>
    <div className="col-sm-10">
      <input 
      type="text" 
      className="form-control" 
      id="inputEmail3" 
      name='feedback'
      value={results.feedback}
      onChange={handleChange}/>
    </div>
  </div>

  <button type='submit' className='btn bg-primary text-white text-center'>Submit</button>
        </form>
        </div>
        </>
    );
}


export default Questions;
