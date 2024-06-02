import React from 'react'
import "./Login.css"                                 // This page created yester 
import { useState } from 'react'
import axios from 'axios'
const Login = (props) => {
  const changeBackground={
    backgroundColor : (props.mode === "black")?"#3A3B3C":"white",
  }

  const changeColor={
    color : (props.mode === "black")?"white":"black",
  }

  const [loading,setLoading]=useState(false);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  function sendUserData(){
    const data = {
      email:email,
      password:password
    }
    axios.defaults.withCredentials = true;
    console.log('data is',data)
    axios.post('http://localhost:5000/Login',data).then(()=>{
          setLoading(false);
          // navigate('/');
        }).catch((e)=>{
            setLoading(false);
            alert('An error has happened check console')
            console.log(e)
          });
      }





  return (
    <div>
         <div>
      
      <div className="loginsignup" style={{backgroundColor : (props.mode === "black")?"#042743":"#829bff"}}>
        {/* {console.log(props.mode)} */}
        <div className="loginsignup-container" style={changeBackground} >
          <h1 style={changeColor}>Login Up</h1>

          <div className="loginsignup-fields">
          {/* <input type="text" placeholder='Your Name' /> */}
          <input type='email' id="#email" placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          {}
          <button onClick={sendUserData}>Continue</button>

          <div className="loginsignup-agree">
          {/* <input type="checkbox" /> */}
          <p style={changeColor}>By continuing I agree to the terms of use & privacy policy</p>
          </div>

        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Login
