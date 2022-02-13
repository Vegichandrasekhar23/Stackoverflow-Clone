import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");  
  let handleEvent = async()=>{
    await axios.post("http://localhost:4002/users/login",{email,password})
    .then(res=> console.log(res.data))
    .catch(err=>console.log(err))
  }

  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center'>      
      <form className="text-area-wrapper login-form">
          <label for="input-email">Email address</label>
          <input type="email" className="input-field" id="input-email" name="login" placeholder="Email Here" required={true} onChange={(e)=>setEmail(e.target.value)}></input>
          <label for="input-password">Password</label>
          <input type="password" className="input-field" name="login" placeholder="Password" id ="input-password" required={true} onChange={(e)=>setPassword(e.target.value)}></input>
          <button className="btn btn-primary login-btn" onClick={handleEvent}>Log in</button>
          <div className="links">
          <Link to="/forgotpassword">
            Forgot Password?
          </Link>
          <br></br>
          <Link to="/register">
              Create new Account?
          </Link>
      </div>  
      </form>      
    </div>  
    </>
  )
}

export default Login