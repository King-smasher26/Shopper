import React, { useContext, useState, useEffect } from 'react';
import "./Navbar.css";
import logo from "../Images/logo.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IoCartSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import Cookies from 'js-cookie';
const Navbar = (props) => {
  const { cartArrayLength, profileData } = useContext(ShopContext);
  const [mode, setMode] = useState("black");
  const [val, setVal] = useState("shop");
  const [res_nav, setRes_Nav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  let path = useLocation().pathname;

  // Set active tab based on current path when component mounts
  useEffect(() => {
    if (path === '/') setVal('shop');
    else if (path === '/mens') setVal('men');
    else if (path === '/womens') setVal('women');
    else if (path === '/kids') setVal('kids');
  }, [path]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener('click', closeDropdown);
    }
    return () => document.removeEventListener('click', closeDropdown);
  }, [showDropdown]);

  // Check if we should hide the navbar
  const isAdminPage = path === "/admin" || path === "/admin/analyze";
  if (isAdminPage) {
    return null;
  }

  // Check if user is logged in based on profile data
  const isLoggedIn = profileData && profileData._id;
  const userName = isLoggedIn ? profileData.name || 'User' : '';
  // Get first name only for display
  const firstName = userName.split(' ')[0];
  
  // Get first letter of name for avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : '';

  // Toggle user dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };
  function LogOut(){
    console.log('logout clicked')
    Cookies.remove('access-token')
    Cookies.remove('access-token', { path: '/' });
    window.location.reload();
  }

  return (
    <>
      <div className="navbar" style={{ backgroundColor: mode === "black" ? "white" : "black" }}>
        <Link to="/">
          <div className="nav-logo">
            <img src={logo} alt="navbar logo" />
            <p style={{ color: (mode === "white") ? "yellow" : "black" }}>Ecomm</p>
          </div>
        </Link>

        <div className="nav-menu">
          <li onClick={() => { setVal("shop") }}> 
            <Link style={{ 
              color: (mode === "white") ? "yellow" : "black", 
              textDecoration: "none", 
              borderBottom: (val === "shop") ? "2px solid red" : "" 
            }} to="/"> Shop </Link> 
          </li>
          <li onClick={() => { setVal("men") }}> 
            <Link style={{ 
              color: (mode === "white") ? "yellow" : "black", 
              textDecoration: "none", 
              borderBottom: (val === "men") ? "2px solid red" : "" 
            }} to="/mens"> Men </Link> 
          </li>
          <li onClick={() => { setVal("women") }}> 
            <Link style={{ 
              color: (mode === "white") ? "yellow" : "black", 
              textDecoration: "none", 
              borderBottom: (val === "women") ? "2px solid red" : "" 
            }} to="/womens"> Women </Link> 
          </li>
          <li onClick={() => { setVal("kids") }}> 
            <Link style={{ 
              color: (mode === "white") ? "yellow" : "black", 
              textDecoration: "none", 
              borderBottom: (val === "kids") ? "2px solid red" : "" 
            }} to="/kids"> Kids </Link> 
          </li>
        </div>

        <div className="nav-login-cart">
          {isLoggedIn ? (
            // User profile dropdown when logged in
            <div className="user-profile-container" style={{ position: 'relative' }}>
              <div 
                className="user-profile" 
                onClick={toggleDropdown}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  color: (mode === "white") ? "yellow" : "black"
                }}
              >
                <div 
                  className="user-avatar" 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: (mode === "white") ? "#FFD700" : "#4B0082",
                    color: (mode === "white") ? "black" : "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  {userInitial}
                </div>
                <span style={{ marginRight: '4px' }}>{firstName}</span>
                <IoMdArrowDropdown />
              </div>
              
              {/* User dropdown menu */}
              {showDropdown && (
                <div 
                  className="user-dropdown" 
                  style={{ 
                    position: 'absolute', 
                    top: '40px', 
                    right: '0',
                    backgroundColor: mode === "black" ? "white" : "#1A1A1A",
                    color: mode === "black" ? "black" : "white",
                    padding: '8px 0',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    zIndex: 10,
                    minWidth: '150px'
                  }}
                >
                  <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    <Link to="/profile" style={{ textDecoration: 'none', color: mode === "black" ? "black" : "white", display: 'block' }}>
                      My Profile
                    </Link>
                  </div>
                  <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    <Link to="/orders" style={{ textDecoration: 'none', color: mode === "black" ? "black" : "white", display: 'block' }}>
                      My Orders
                    </Link>
                  </div>
                  <div className="dropdown-divider" style={{ height: '1px', backgroundColor: mode === "black" ? "#e0e0e0" : "#333", margin: '4px 0' }}></div>
                  <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                  <button onClick={LogOut} className='logout-btn' style={{ color: "red" }}>
              Logout
            </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login button when not logged in
            <Link to="/login">
              <button style={{ 
                backgroundColor: (mode === "white") ? "yellow" : "white",
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>LOG IN</button>
            </Link>
          )}
          
          {/* Cart icon with badge */}
          <Link to="/cart"> 
            <div style={{ position: 'relative' }}>
              <IoCartSharp style={{ 
                color: (mode === "white") ? "yellow" : "black", 
                fontSize: "1.5rem" 
              }} />
              {/* <div className="nav-cart-count"> {cartArrayLength()} </div> */}
            </div>
          </Link>
        </div>

        <div className="nav_last_icon" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <DarkModeIcon 
            onClick={() => {
              if (mode === "black") {
                setMode("white");
                props.toggleMode(mode);
              }
              else if (mode === "white") {
                setMode("black");
                props.toggleMode(mode);
              }
            }} 
            style={{ 
              color: (mode === "white") ? "yellow" : "black",
              cursor: 'pointer'
            }}
          />

          <div 
            className="hamburgerMenu" 
            onClick={() => { setRes_Nav(!res_nav) }}
            style={{ cursor: 'pointer' }}
          >
            <GiHamburgerMenu style={{ color: (mode === "black") ? "black" : "yellow" }} />
          </div>
        </div>
      </div>

      {/* Responsive navigation */}
      <div 
        className="resp_nav" 
        style={{ 
          display: (res_nav) ? "flex" : "none", 
          backgroundColor: (mode === "black") ? "white" : "#042743" 
        }}
      >
        <Link to="/" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Shop</li></Link>
        <Link to="mens" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Men</li></Link>
        <Link to="womens" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Women</li></Link>
        <Link to="kids" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Kids</li></Link>
        
        {!isLoggedIn && (
          <Link to="login" className='link login' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Login</li></Link>
        )}
        
        {isLoggedIn && (
          <>
            <Link to="/profile" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}>
              <li>My Profile</li>
            </Link>
            <Link to="/orders" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}>
              <li>My Orders</li>
            </Link>
            <button onClick={LogOut} className='logout-btn' style={{ color: "red" }}>
          Logout
            </button>
          </>
        )}
        
        <Link to="cart" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Cart</li></Link>
      </div>
    </>
  );
};

export default Navbar;