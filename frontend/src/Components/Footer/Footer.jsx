import React from 'react'
import "./Footer.css" 
import logo from "../Images/logo.png"
import { Link, useLocation } from 'react-router-dom'

 

const Footer = (props) => {

    const changeTheme = {
        color : (props.mode === "black")?"white":"",
    }

    let path = useLocation().pathname;

    if(path === "/admin" || path === "/admin/analyze" || false){
        return null;
    }
    
  return (
    <>

        <div className="footer" style={changeTheme}>

        <div className="panel">
            <div className="panel_upper">
                <img src={logo} alt="ecommerce_logo" />
                <h4 style={{fontWeight: "bolder"}}>Ecomm</h4>
            </div>
            <div className="panel_lower">
               <p > Wear the premium tshirts, hoddies, sweatshirts, zipper and apparals </p>
            </div>
        </div>

        <div className="panel">
            <h4 style={{fontWeight: "bolder"}}> Shop </h4>
            <p>SweatShirts</p>
            <p>Hoddies</p>
            <p>Zipper Hoddies</p>
        </div>

        <div className="panel">
            <h4 style={{fontWeight: "bolder"}}> CUSTOMER SERVICE </h4>
            <p>Contact US</p>
            <p>About Us</p>
            <p>Return Policy</p>
        </div>

        <div className="panel">
            <h4 style={{fontWeight: "bolder"}}> POLICY </h4>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>Reserved All Right</p>
        </div>

    </div>

    <div className="copyright" style={changeTheme}>
        Copyright &copy;  2023  -  All Right Reserved 
    </div>
      
    </>
  )
}

export default Footer