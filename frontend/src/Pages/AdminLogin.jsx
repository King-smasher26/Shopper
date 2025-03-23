import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"; // Keep your existing CSS file
import { BsFillShieldLockFill } from "react-icons/bs"; // Import a suitable icon
import { FiMail, FiLock } from "react-icons/fi"; // Import icons for input fields

const AdminLogin = ({ onLoginSuccess, mode = "light" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const sendUserData = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    const data = {
      email: email,
      password: password
    };
    
    axios.defaults.withCredentials = true;
    console.log('data is', data);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/LoginAdmin`, data);
      console.log('response for admin login',response)
      setLoading(false);
      
      if (onLoginSuccess && response.data) {
        onLoginSuccess(response.data);
      } else {
        navigate('/admin');
      }
    } catch (error) {
      setLoading(false);
      alert('Login failed. Please check your credentials.');
      console.log(error);
    }
  };

  return (
    <div className="admin-login-container" style={{ 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#1d2634"
    }}>
      <div className="login-card" style={{
        backgroundColor: "#263043",
        borderRadius: "8px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
        padding: "30px",
        width: "400px",
        maxWidth: "90%",
        color: "#9e9ea4"
      }}>
        <div className="login-header" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <BsFillShieldLockFill className="icon_header" style={{ fontSize: "50px", marginBottom: "15px" }} />
          <h1 style={{ fontSize: "24px", margin: "0" }}>Admin Login</h1>
          <p style={{ fontSize: "14px", opacity: "0.8", textAlign: "center", marginTop: "10px" }}>
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        <div className="login-form">
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Email Address</label>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              backgroundColor: "rgba(255, 255, 255, 0.08)", 
              borderRadius: "4px", 
              padding: "0 15px" 
            }}>
              <FiMail style={{ color: "#9e9ea4", marginRight: "10px" }} />
              <input 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: "12px 0",
                  width: "100%",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>Password</label>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              backgroundColor: "rgba(255, 255, 255, 0.08)", 
              borderRadius: "4px", 
              padding: "0 15px" 
            }}>
              <FiLock style={{ color: "#9e9ea4", marginRight: "10px" }} />
              <input 
                type="password" 
                placeholder="•••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: "12px 0",
                  width: "100%",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <button 
            onClick={sendUserData} 
            disabled={loading}
            style={{
              backgroundColor: "#2962ff",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              padding: "12px",
              width: "100%",
              transition: "background-color 0.3s"
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      <div className="bg-white text-black p-2 rounded shadow">
            <span className="font-semibold">Admin Email:</span> 
            <span className="ml-2">demoadmin@gmail.com</span>
          </div>
          <div className="bg-white text-black p-2 rounded shadow">
            <span className="font-semibold">Admin Password:</span> 
            <span className="ml-2">demopassword</span>
          </div>  
      </div>
    </div>
  );
};

export default AdminLogin;