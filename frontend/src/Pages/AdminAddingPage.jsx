import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAddingPage.css'; // Make sure to include the CSS
import { blue } from '@mui/material/colors';

const AdminAddingPage = () => {
  axios.defaults.withCredentials = true;
  
  // State for form inputs
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  // State for admins list
  const [admins, setAdmins] = useState([]);
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch all admins
  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getAdmins`);
      setAdmins(response.data);
    } catch (err) {
      setError('Failed to load admins. Please try again later.');
      console.error('Error fetching admins:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await axios.post('${process.env.REACT_APP_API_URL}/setAdmins', {
        name: adminName,
        email: adminEmail,
        designation: adminDesignation,
        password: adminPassword
      });
      
      // Clear form fields
      setAdminName('');
      setAdminEmail('');
      setAdminDesignation('');
      setAdminPassword('');
      
      // Refresh the admin list
      fetchAdmins();
    } catch (err) {
      setError('Failed to add admin. Please try again.');
      console.error('Error adding admin:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Admin Management</h1>
      </div>
      
      <div className="admin-content">
        {/* Add Admin Form */}
        <div className="admin-form-section">
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Add New Admin</h2>
            </div>
            
            <div className="admin-card-body">
              {error && (
                <div className="admin-error-alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Admin Name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    required
                    style={{color:"black"}}
                  />
                </div>
                
                <div className="admin-form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    style={{color:"black"}}
                  />
                </div>
                
                <div className="admin-form-row">
                  <label htmlFor="designation">Designation</label>
                  <input
                    id="designation"
                    type="text"
                    placeholder="Super Admin"
                    value={adminDesignation}
                    onChange={(e) => setAdminDesignation(e.target.value)}
                    required
                    style={{color:"black"}}
                  />
                </div>
                
                <div className="admin-form-row">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    style={{color:"black"}}
                  />
                </div>
                
                <div className="admin-form-row">
                  <button
                    className="admin-submit-btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Admins List */}
        <div className="admin-table-section">
          <div className="admin-card">
            <div className="admin-card-header admin-header-with-button">
              <h2>Admins List</h2>
              <button
                className="admin-refresh-btn"
                onClick={fetchAdmins}
                disabled={isLoading}
              >
                Refresh
              </button>
            </div>
            
            <div className="admin-card-body">
              {isLoading && <p className="admin-loading-text">Loading admins...</p>}
              
              {!isLoading && admins.length === 0 && (
                <p className="admin-empty-text">No admins found.</p>
              )}
              
              {!isLoading && admins.length > 0 && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin, index) => (
                        <tr key={index}>
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>
                          <td>{admin.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddingPage;