import React from 'react'
import { Link } from 'react-router-dom'
import "./Signup.css"
import { useState } from 'react'
import axios from 'axios'
const Signup = (props) => {
  const changeBackground = {
    backgroundColor : (props.mode==="black")?"#212124":"white",
  }

  const changeColor={
    color : (props.mode==="black")?"white":"black"
  }

  const [loading,setLoading]=useState(false);
  const [email,setEmail]=useState();
  const [name,setName]=useState();
  const [password,setPassword]=useState();
  
  function sendUserData(){
    const data = {
      name:name,
      email:email,
      password:password
    }
    axios.defaults.withCredentials = true;
    console.log('data is',data)
    axios.post('http://localhost:5000/registration',data).then((res)=>{
          setLoading(false);
          console.log(res)
          // navigate('/');
        }).catch((e)=>{
            setLoading(false);
            alert('An error has happened check console')
            console.log(e)
          });
      }


      const validateEmail = (email) => {
        console.log(email.slice(-7))
          if(email.slice(-4) === ".com" || email.slice(-7) === ".org.in" || email.slice(-4) === ".net" || false ){
            console.log("Correct Email Address")
          }
          else{
            alert("Please Enter The Valid Email Address")
          }
          
          const emailPattern =  
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const isValid = emailPattern.test(email); 

          if(isValid === false){
            alert("Please Enter the Valid Email Address");
          }
      };


      {console.log(email)}
  return (
    <div>
      
      <div className="signupPage" style={{backgroundColor : (props.mode==="black")?"#404040":"#fce3fe"}}>
        <div className="signupPage-container" style={changeBackground}>
          <h1 style={changeColor}>Sign Up</h1>
          <div className="signupPage-fields">
          <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)}/>
          <input type='email' placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value);  validateEmail(email)}}/>
          </div>

          <button onClick={()=>{
            sendUserData();
          }}>Continue</button>
          <p className='signupPage-login' style={changeColor}>Already have an account ? <Link to="/login"> <span> Login Here </span> </Link> </p>

          <div className="signupPage-agree">
          {/* <input type="checkbox" /> */}
          <p style={{color : (props.mode === "black")?"white":""}}>By continuing I agree to the terms of use & privacy policy</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup
