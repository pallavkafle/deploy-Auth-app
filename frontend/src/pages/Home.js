import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const[loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handlelogout = (e) => {
    handleSuccess("loggedout successfully");
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  return (
    
    <div>
        <h1>padna jauu {loggedInUser} exam aisakyoo</h1>
        <img src="https://pngimg.com/uploads/monkey/monkey_PNG18729.png" alt="kya dekh raha haii laudeyy" />

        <button onClick={handlelogout}>Logout</button>
<ToastContainer/>
    </div>
    
  )
}

export default Home