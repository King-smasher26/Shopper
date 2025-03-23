// import React, { useContext, useState, useEffect } from 'react';
// import "./Navbar.css";
// import logo from "../Images/logo.png";
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { IoCartSharp } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useLocation } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import Cookies from 'js-cookie';
// const Navbar = (props) => {
//   const { cartArrayLength, profileData } = useContext(ShopContext);
//   const [mode, setMode] = useState("black");
//   const [val, setVal] = useState("shop");
//   const [res_nav, setRes_Nav] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   let path = useLocation().pathname;

//   // Set active tab based on current path when component mounts
//   useEffect(() => {
//     if (path === '/') setVal('shop');
//     else if (path === '/mens') setVal('men');
//     else if (path === '/womens') setVal('women');
//     else if (path === '/kids') setVal('kids');
//   }, [path]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const closeDropdown = () => setShowDropdown(false);
//     if (showDropdown) {
//       document.addEventListener('click', closeDropdown);
//     }
//     return () => document.removeEventListener('click', closeDropdown);
//   }, [showDropdown]);

//   // Check if we should hide the navbar
//   const isAdminPage = path === "/admin" || path === "/admin/analyze";
//   if (isAdminPage) {
//     return null;
//   }

//   // Check if user is logged in based on profile data
//   const isLoggedIn = profileData && profileData._id;
//   const userName = isLoggedIn ? profileData.name || 'User' : '';
//   // Get first name only for display
//   const firstName = userName.split(' ')[0];
  
//   // Get first letter of name for avatar
//   const userInitial = userName ? userName.charAt(0).toUpperCase() : '';

//   // Toggle user dropdown
//   const toggleDropdown = (e) => {
//     e.stopPropagation();
//     setShowDropdown(!showDropdown);
//   };
//   function LogOut(){
//     console.log('logout clicked')
//     Cookies.remove('access-token')
//     Cookies.remove('access-token', { path: '/' });
//     window.location.reload();
//   }

//   return (
//     <>
//       <div className="navbar" style={{ backgroundColor: mode === "black" ? "white" : "black" }}>
//         <Link to="/">
//           <div className="nav-logo">
//             <img src={logo} alt="navbar logo" />
//             <p style={{ color: (mode === "white") ? "yellow" : "black" }}>Ecomm</p>
//           </div>
//         </Link>

//         <div className="nav-menu">
//           <li onClick={() => { setVal("shop") }}> 
//             <Link style={{ 
//               color: (mode === "white") ? "yellow" : "black", 
//               textDecoration: "none", 
//               borderBottom: (val === "shop") ? "2px solid red" : "" 
//             }} to="/"> Shop </Link> 
//           </li>
//           <li onClick={() => { setVal("men") }}> 
//             <Link style={{ 
//               color: (mode === "white") ? "yellow" : "black", 
//               textDecoration: "none", 
//               borderBottom: (val === "men") ? "2px solid red" : "" 
//             }} to="/mens"> Men </Link> 
//           </li>
//           <li onClick={() => { setVal("women") }}> 
//             <Link style={{ 
//               color: (mode === "white") ? "yellow" : "black", 
//               textDecoration: "none", 
//               borderBottom: (val === "women") ? "2px solid red" : "" 
//             }} to="/womens"> Women </Link> 
//           </li>
//           <li onClick={() => { setVal("kids") }}> 
//             <Link style={{ 
//               color: (mode === "white") ? "yellow" : "black", 
//               textDecoration: "none", 
//               borderBottom: (val === "kids") ? "2px solid red" : "" 
//             }} to="/kids"> Kids </Link> 
//           </li>
//         </div>

//         <div className="nav-login-cart">
//           {isLoggedIn ? (
//             // User profile dropdown when logged in
//             <div className="user-profile-container" style={{ position: 'relative' }}>
//               <div 
//                 className="user-profile" 
//                 onClick={toggleDropdown}
//                 style={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   cursor: 'pointer',
//                   color: (mode === "white") ? "yellow" : "black"
//                 }}
//               >
//                 <div 
//                   className="user-avatar" 
//                   style={{ 
//                     width: '32px', 
//                     height: '32px', 
//                     borderRadius: '50%', 
//                     backgroundColor: (mode === "white") ? "#FFD700" : "#4B0082",
//                     color: (mode === "white") ? "black" : "white",
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginRight: '8px',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   {userInitial}
//                 </div>
//                 <span style={{ marginRight: '4px' }}>{firstName}</span>
//                 <IoMdArrowDropdown />
//               </div>
              
//               {/* User dropdown menu */}
//               {showDropdown && (
//                 <div 
//                   className="user-dropdown" 
//                   style={{ 
//                     position: 'absolute', 
//                     top: '40px', 
//                     right: '0',
//                     backgroundColor: mode === "black" ? "white" : "#1A1A1A",
//                     color: mode === "black" ? "black" : "white",
//                     padding: '8px 0',
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
//                     zIndex: 10,
//                     minWidth: '150px'
//                   }}
//                 >
//                   <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
//                     <Link to="/profile" style={{ textDecoration: 'none', color: mode === "black" ? "black" : "white", display: 'block' }}>
//                       My Profile
//                     </Link>
//                   </div>
//                   <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
//                     <Link to="/orders" style={{ textDecoration: 'none', color: mode === "black" ? "black" : "white", display: 'block' }}>
//                       My Orders
//                     </Link>
//                   </div>
//                   <div className="dropdown-divider" style={{ height: '1px', backgroundColor: mode === "black" ? "#e0e0e0" : "#333", margin: '4px 0' }}></div>
//                   <div className="dropdown-item" style={{ padding: '8px 16px', cursor: 'pointer' }}>
//                   <button onClick={LogOut} className='logout-btn' style={{ color: "red" }}>
//               Logout
//             </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             // Login button when not logged in
//             <Link to="/login">
//               <button style={{ 
//                 backgroundColor: (mode === "white") ? "yellow" : "white",
//                 padding: '8px 16px',
//                 borderRadius: '4px',
//                 border: 'none',
//                 fontWeight: 'bold',
//                 cursor: 'pointer'
//               }}>LOG IN</button>
//             </Link>
//           )}
          
//           {/* Cart icon with badge */}
//           <Link to="/cart"> 
//             <div style={{ position: 'relative' }}>
//               <IoCartSharp style={{ 
//                 color: (mode === "white") ? "yellow" : "black", 
//                 fontSize: "1.5rem" 
//               }} />
//               {/* <div className="nav-cart-count"> {cartArrayLength()} </div> */}
//             </div>
//           </Link>
//         </div>

//         <div className="nav_last_icon" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//           <DarkModeIcon 
//             onClick={() => {
//               if (mode === "black") {
//                 setMode("white");
//                 props.toggleMode(mode);
//               }
//               else if (mode === "white") {
//                 setMode("black");
//                 props.toggleMode(mode);
//               }
//             }} 
//             style={{ 
//               color: (mode === "white") ? "yellow" : "black",
//               cursor: 'pointer'
//             }}
//           />

//           <div 
//             className="hamburgerMenu" 
//             onClick={() => { setRes_Nav(!res_nav) }}
//             style={{ cursor: 'pointer' }}
//           >
//             <GiHamburgerMenu style={{ color: (mode === "black") ? "black" : "yellow" }} />
//           </div>
//         </div>
//       </div>

//       {/* Responsive navigation */}
//       <div 
//         className="resp_nav" 
//         style={{ 
//           display: (res_nav) ? "flex" : "none", 
//           backgroundColor: (mode === "black") ? "white" : "#042743" 
//         }}
//       >
//         <Link to="/" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Shop</li></Link>
//         <Link to="mens" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Men</li></Link>
//         <Link to="womens" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Women</li></Link>
//         <Link to="kids" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Kids</li></Link>
        
//         {!isLoggedIn && (
//           <Link to="login" className='link login' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Login</li></Link>
//         )}
        
//         {isLoggedIn && (
//           <>
//             <Link to="/profile" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}>
//               <li>My Profile</li>
//             </Link>
//             <Link to="/orders" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}>
//               <li>My Orders</li>
//             </Link>
//             <button onClick={LogOut} className='logout-btn' style={{ color: "red" }}>
//           Logout
//             </button>
//           </>
//         )}
        
//         <Link to="cart" className='link' style={{ color: (mode === "black") ? "black" : "yellow" }}><li>Cart</li></Link>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IoCartSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from 'react-icons/io';
import Cookies from 'js-cookie';
import logo from "../Images/logo.png";
import "./Navbar.css";

const Navbar = (props) => {
  const { cartArrayLength, profileData } = useContext(ShopContext);
  const [mode, setMode] = useState(props.mode || "light");
  const [val, setVal] = useState("shop");
  const [res_nav, setRes_Nav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  let path = useLocation().pathname;

  // Check if we should hide the navbar
  const isAdminPage = path === "/admin" || path === "/admin/analyze";
  
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
  
  // Set the mode from props
  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);

  // Function that actually returns the component or null
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

  // Toggle dark/light mode
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    props.toggleMode(newMode);
  };

  function LogOut() {
    console.log('logout clicked');
    Cookies.remove('access-token');
    Cookies.remove('access-token', { path: '/' });
    window.location.reload();
  }

  // Define theme colors based on current mode
  const themeColors = {
    background: mode === "light" ? "#ffffff" : "#121212",
    text: mode === "light" ? "#333333" : "#f0f0f0",
    accent: mode === "light" ? "#ff4757" : "#ff6b81",
    navBackground: mode === "light" ? "#ffffff" : "#1a1a1a",
    buttonBg: mode === "light" ? "#ff4757" : "#ff6b81",
    buttonText: "#ffffff",
    dropdownBg: mode === "light" ? "#ffffff" : "#2a2a2a",
    dropdownText: mode === "light" ? "#333333" : "#f0f0f0",
    dropdownShadow: mode === "light" ? "0 2px 10px rgba(0,0,0,0.1)" : "0 2px 10px rgba(0,0,0,0.5)",
    avatarBg: mode === "light" ? "#ff4757" : "#ff6b81",
    avatarText: "#ffffff",
    hoverBg: mode === "light" ? "#f5f5f5" : "#2c2c2c",
    divider: mode === "light" ? "#e0e0e0" : "#444444",
    activeBorder: "#ff4757"
  };

  return (
    <>
      <div className="navbar" style={{ 
        backgroundColor: themeColors.navBackground,
        color: themeColors.text,
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.3s ease"
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="nav-logo" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem" 
          }}>
            <img src={logo} alt="Ecomm logo" style={{ height: "40px" }} />
            <p style={{ 
              color: themeColors.text, 
              fontWeight: "bold",
              fontSize: "1.5rem",
              margin: 0
            }}>Ecomm</p>
          </div>
        </Link>

        <div className="nav-menu" style={{ 
          display: "flex", 
          gap: "2rem", 
          listStyle: "none", 
          margin: 0,
          padding: 0
        }}>
          <li onClick={() => { setVal("shop") }}> 
            <Link style={{ 
              color: themeColors.text, 
              textDecoration: "none", 
              padding: "0.5rem 0",
              display: "block",
              borderBottom: val === "shop" ? `2px solid ${themeColors.activeBorder}` : "2px solid transparent",
              transition: "all 0.3s ease"
            }} to="/"> Shop </Link> 
          </li>
          <li onClick={() => { setVal("men") }}> 
            <Link style={{ 
              color: themeColors.text, 
              textDecoration: "none", 
              padding: "0.5rem 0",
              display: "block",
              borderBottom: val === "men" ? `2px solid ${themeColors.activeBorder}` : "2px solid transparent",
              transition: "all 0.3s ease"
            }} to="/mens"> Men </Link> 
          </li>
          <li onClick={() => { setVal("women") }}> 
            <Link style={{ 
              color: themeColors.text, 
              textDecoration: "none", 
              padding: "0.5rem 0",
              display: "block",
              borderBottom: val === "women" ? `2px solid ${themeColors.activeBorder}` : "2px solid transparent",
              transition: "all 0.3s ease"
            }} to="/womens"> Women </Link> 
          </li>
          <li onClick={() => { setVal("kids") }}> 
            <Link style={{ 
              color: themeColors.text, 
              textDecoration: "none", 
              padding: "0.5rem 0",
              display: "block",
              borderBottom: val === "kids" ? `2px solid ${themeColors.activeBorder}` : "2px solid transparent",
              transition: "all 0.3s ease"
            }} to="/kids"> Kids </Link> 
          </li>
        </div>

        <div className="nav-login-cart" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1.5rem" 
        }}>
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
                  color: themeColors.text,
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: themeColors.hoverBg
                  }
                }}
              >
                <div 
                  className="user-avatar" 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: themeColors.avatarBg,
                    color: themeColors.avatarText,
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
                    top: '45px', 
                    right: '0',
                    backgroundColor: themeColors.dropdownBg,
                    color: themeColors.dropdownText,
                    padding: '8px 0',
                    borderRadius: '8px',
                    boxShadow: themeColors.dropdownShadow,
                    zIndex: 10,
                    minWidth: '180px',
                    animation: "fadeIn 0.2s ease-in-out",
                    overflow: "hidden"
                  }}
                >
                  <div 
                    className="dropdown-item" 
                    style={{ 
                      padding: '10px 16px', 
                      cursor: 'pointer',
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: themeColors.hoverBg
                      }
                    }}
                  >
                    <Link to="/profile" style={{ textDecoration: 'none', color: themeColors.dropdownText, display: 'block' }}>
                      My Profile
                    </Link>
                  </div>
                  <div 
                    className="dropdown-item" 
                    style={{ 
                      padding: '10px 16px', 
                      cursor: 'pointer',
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: themeColors.hoverBg
                      }
                    }}
                  >
                    <Link to="/orders" style={{ textDecoration: 'none', color: themeColors.dropdownText, display: 'block' }}>
                      My Orders
                    </Link>
                  </div>
                  <div className="dropdown-divider" style={{ height: '1px', backgroundColor: themeColors.divider, margin: '4px 0' }}></div>
                  <div 
                    className="dropdown-item" 
                    style={{ 
                      padding: '10px 16px', 
                      cursor: 'pointer',
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: themeColors.hoverBg
                      }
                    }}
                  >
                    <button 
                      onClick={LogOut} 
                      className='logout-btn' 
                      style={{ 
                        color: "#ff4757", 
                        background: "none", 
                        border: "none", 
                        padding: 0, 
                        cursor: "pointer", 
                        width: "100%", 
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login button when not logged in
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{ 
                backgroundColor: themeColors.buttonBg,
                color: themeColors.buttonText,
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: "0.9"
                }
              }}>
                LOG IN
              </button>
            </Link>
          )}
          
          {/* Cart icon with badge */}
          <Link to="/cart" style={{ 
            color: themeColors.text,
            textDecoration: "none",
            position: "relative",
            display: "flex",
            alignItems: "center"
          }}> 
            <div className="cart-icon" style={{ position: 'relative' }}>
              <IoCartSharp style={{ 
                color: themeColors.text, 
                fontSize: "1.5rem" 
              }} />
              {cartArrayLength && cartArrayLength() > 0 && (
                <div style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: themeColors.buttonBg,
                  color: themeColors.buttonText,
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  {cartArrayLength()}
                </div>
              )}
            </div>
          </Link>

          {/* Dark mode toggle button */}
          <div 
            onClick={toggleMode}
            style={{ 
              cursor: 'pointer',
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {mode === "light" ? (
              <DarkModeIcon style={{ color: themeColors.text }} />
            ) : (
              <LightModeIcon style={{ color: themeColors.text }} />
            )}
          </div>

          {/* Hamburger menu for mobile */}
          <div 
            className="hamburgerMenu" 
            onClick={() => { setRes_Nav(!res_nav) }}
            style={{ 
              cursor: 'pointer',
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <GiHamburgerMenu style={{ color: themeColors.text }} />
          </div>
        </div>
      </div>

      {/* Responsive navigation */}
      <div 
        className="resp_nav" 
        style={{ 
          display: res_nav ? "flex" : "none", 
          backgroundColor: themeColors.navBackground,
          flexDirection: "column",
          position: "absolute",
          top: "60px",
          left: 0,
          right: 0,
          zIndex: 99,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          padding: "1rem 0"
        }}
      >
        <Link 
          to="/" 
          className='link' 
          style={{ 
            color: themeColors.text,
            textDecoration: "none",
            padding: "12px 24px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: themeColors.hoverBg
            }
          }}
          onClick={() => setRes_Nav(false)}
        >
          <li>Shop</li>
        </Link>
        <Link 
          to="mens" 
          className='link' 
          style={{ 
            color: themeColors.text,
            textDecoration: "none",
            padding: "12px 24px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: themeColors.hoverBg
            }
          }}
          onClick={() => setRes_Nav(false)}
        >
          <li>Men</li>
        </Link>
        <Link 
          to="womens" 
          className='link' 
          style={{ 
            color: themeColors.text,
            textDecoration: "none",
            padding: "12px 24px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: themeColors.hoverBg
            }
          }}
          onClick={() => setRes_Nav(false)}
        >
          <li>Women</li>
        </Link>
        <Link 
          to="kids" 
          className='link' 
          style={{ 
            color: themeColors.text,
            textDecoration: "none",
            padding: "12px 24px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: themeColors.hoverBg
            }
          }}
          onClick={() => setRes_Nav(false)}
        >
          <li>Kids</li>
        </Link>
        
        {!isLoggedIn && (
          <Link 
            to="login" 
            className='link login' 
            style={{ 
              color: themeColors.text,
              textDecoration: "none",
              padding: "12px 24px",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: themeColors.hoverBg
              }
            }}
            onClick={() => setRes_Nav(false)}
          >
            <li>Login</li>
          </Link>
        )}
        
        {isLoggedIn && (
          <>
            <Link 
              to="/profile" 
              className='link' 
              style={{ 
                color: themeColors.text,
                textDecoration: "none",
                padding: "12px 24px",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: themeColors.hoverBg
                }
              }}
              onClick={() => setRes_Nav(false)}
            >
              <li>My Profile</li>
            </Link>
            <Link 
              to="/orders" 
              className='link' 
              style={{ 
                color: themeColors.text,
                textDecoration: "none",
                padding: "12px 24px",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: themeColors.hoverBg
                }
              }}
              onClick={() => setRes_Nav(false)}
            >
              <li>My Orders</li>
            </Link>
            <button 
              onClick={() => {
                LogOut();
                setRes_Nav(false);
              }} 
              className='logout-btn' 
              style={{ 
                color: "#ff4757", 
                background: "none", 
                border: "none", 
                padding: "12px 24px", 
                cursor: "pointer", 
                textAlign: "left", 
                width: "100%",
                fontSize: "16px"
              }}
            >
              Logout
            </button>
          </>
        )}
        
        <Link 
          to="cart" 
          className='link' 
          style={{ 
            color: themeColors.text,
            textDecoration: "none",
            padding: "12px 24px",
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: themeColors.hoverBg
            }
          }}
          onClick={() => setRes_Nav(false)}
        >
          <li>Cart</li>
        </Link>
      </div>
      
      {/* CSS styles for animations and responsive design */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @media (max-width: 768px) {
            .nav-menu {
              display: none !important;
            }
          }
          
          @media (min-width: 769px) {
            .hamburgerMenu {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;