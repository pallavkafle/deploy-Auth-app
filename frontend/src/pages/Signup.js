import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError ,handleSuccess} from '../utils'; // Adjust the import path as necessary
 
function Signup() {

    const[SignupInfo,setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })


const navigate= useNavigate();

    const handleChange = (e) => {
        const{name,value} = e.target;
        console.log(name,value)
        const copySignupInfo = {...SignupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);

    };
    

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = SignupInfo;
        if (!name || !email || !password) {
          return handleError('All fields are required');
        }
        
        try{
            const url = "https://deploy-authapp.onrender.com/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(SignupInfo)
            });

           const result = await response.json();
           const {success, message ,error } = result;
           
           if(success) {
                handleSuccess(message);
          setTimeout(() => {
           navigate('/login');
            }, 1000)
        }
        else if(error) {
            const details = error?.details[0].message;
            handleError(details || message || 'An error occurred');
           } 
           
            
            
           console.log('result->',result);
        }

        catch(error) {
            handleError('Signup failed. Please try again later.');
            console.error('Error during signup:', error);
        }
    };
    
  return (
    <div className="Container"> 
    <h1>Signup</h1> 
    <form onSubmit={handleSignup}>
        <div>
            <label htmlFor="name">Name:</label>
            <input onChange={handleChange} type="text" name="name" 
             placeholder="Enter your Username"  value = {SignupInfo.name} />
            
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input onChange={handleChange} type="email" name="email" 
             placeholder="Enter your Email" value = {SignupInfo.email} />
            </div>
        <div>   
        
       
            <label htmlFor="password">Password:</label>
            <input onChange={handleChange} type="password" name="password" 
             placeholder="Enter your Password"  value = {SignupInfo.password}/>
            
        </div>
        <button type="submit">Signup</button>
        <span>Already have an account? <Link to ="/login">Login</Link></span>
    </form>
    
<ToastContainer/>
    </div>
    
    
  )
}

export default Signup
