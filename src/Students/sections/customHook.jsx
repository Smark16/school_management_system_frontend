import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { AuthContext } from '@/Context/AuthContext';

function useCustomHook() {
  const { user } = useContext(AuthContext);
  const currentStudent = `http://127.0.0.1:8000/school/get_student_user/${user.user_id}`;
  const [loggedStudent, setLoggedStudent] = useState('');
  const [loggedDetail, setLoggedDetail] = useState('')

  const fetchUser = async () => {
    try {
      const response = await axios.get(currentStudent);
      setLoggedStudent(response.data.id);
      setLoggedDetail(response.data)
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { loggedStudent, loggedDetail };
}

export default useCustomHook;
