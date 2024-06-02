import React from 'react'
import "./Footer.css" 
import logo from "../Images/logo.png"
import { useLocation } from 'react-router-dom'
 

const Footer = (props) => {

    const changeTheme = {
        color : (props.mode === "black")?"white":"",
    }

    if(useLocation().pathname === "/cart"){
        return null;
    }
    
  return (
    <>

        <div className="footer" style={changeTheme}>

        <div className="panel">
            <div className="panel_upper">
                <img src={logo} alt="ecommerce_logo" />
                <h4 >Ecomm</h4>
            </div>
            <div className="panel_lower">
               <p > Wear the premium tshirts, hoddies, sweatshirts, zipper and apparals </p>
            </div>
        </div>

        <div className="panel">
            <h4> Shop </h4>
            <p>SweatShirts</p>
            <p>Hoddies</p>
            <p>Zipper Hoddies</p>
        </div>

        <div className="panel">
            <h4> CUSTOMER SERVICE </h4>
            <p>Contact US</p>
            <p>About Us</p>
            <p>Return Policy</p>
        </div>

        <div className="panel">
            <h4> POLICY </h4>
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
