import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError ,handleSuccess} from '../utils'; // Adjust the import path as necessary
 
function Login() {

    const[loginInfo,setLoginInfo] = useState({
        
        email: "",
        password: ""
    })


const navigate= useNavigate();

    const handleChange = (e) => {
        const{name,value} = e.target;
        console.log(name,value)
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);

    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
          return handleError('All fields are required');
        }
        
        try{
            const url = "http://localhost:8080/auth/login";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });

           const result = await response.json();
           const {success, message ,jwtToken,name,error } = result;
           
           if(success) {
             handleSuccess(message);
             localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
             setTimeout(() => {
             navigate('/Home');
            }, 1000)
        }
        else if(message) {
            const details = error?.details[0].message;
            handleError(message );
           } 
           
            
            
           console.log('result->',result);
        }

        catch(error) {
            handleError('Login failed. Please try again later.');
            console.error('Error during Login:', error);
        }
    };
    
  return (
    <div className="Container"> 
    <h1>Login</h1> 
    <form onSubmit={handleLogin}>
        
        <div>
            <label htmlFor="email">Email:</label>
            <input onChange={handleChange} type="email" name="email" 
             placeholder="Enter your Email" value = {loginInfo.email} />
            </div>
        <div>   
        
       
            <label htmlFor="password">Password:</label>
            <input onChange={handleChange} type="password" name="password" 
             placeholder="Enter your Password"  value = {loginInfo.password}/>
            
        </div>
        <button type="submit">Login</button>
        <span>Don't have an account? <Link to ="/Signup">Signup</Link></span>
    </form>
    
<ToastContainer/>
    </div>
    
    
  )
}

export default Login