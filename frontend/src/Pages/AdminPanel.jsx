// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Home from './Home';
// import Analyze from './Analyze';
// import Header from './Header';
// import "./AdminPanel.css";
// import AdminAddingPage from './AdminAddingPage';
// import ProductsAdmin from './ProductsAdmin';

// const AdminPanel = () => {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('home');

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   // Function to handle navigation between components
//   const navigateTo = (component) => {
//     setActiveComponent(component);
//   };

//   // Render the active component
//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'analyze':
//         return <Analyze />;
//       case 'admins':
//         return <AdminAddingPage/>
//       case 'products':
//         return <ProductsAdmin/>
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className='grid-container'>
//       {/* <Header OpenSidebar={OpenSidebar} /> */}
//       <Sidebar 
//         openSidebarToggle={openSidebarToggle} 
//         OpenSidebar={OpenSidebar} 
//         navigateTo={navigateTo}
//         activeComponent={activeComponent}
//       />
//       <main className='main-container'>
//         {renderComponent()}
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Analyze from './Analyze';
import Header from './Header';
import "./AdminPanel.css";
import AdminAddingPage from './AdminAddingPage';
import ProductsAdmin from './ProductsAdmin';
import AdminLogin from './AdminLogin';
import axios from 'axios';

const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch admin profile data
    const fetchAdminProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/AdminProfile`);
        console.log('response for admin profile is :-', response);
        
        // With axios, the data is already in response.data
        if (response.data) {
          setAdminData(response.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setAdminData(null);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setIsAuthenticated(false);
        setAdminData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Function to handle navigation between components
  const navigateTo = (component) => {
    setActiveComponent(component);
  };

  // Function to handle successful login
  const handleLoginSuccess = (adminData) => {
    setAdminData(adminData);
    setIsAuthenticated(true);
  };

  // Render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'analyze':
        return <Analyze />;
      case 'admins':
        return <AdminAddingPage />;
      case 'products':
        return <ProductsAdmin />;
      default:
        return <Home />;
    }
  };

  // Using ternary operators for conditional rendering
  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    isAuthenticated ? (
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          OpenSidebar={OpenSidebar} 
          navigateTo={navigateTo}
          activeComponent={activeComponent}
        />
        <main className='main-container'>
          {renderComponent()}
        </main>
      </div>
    ) : (
      <AdminLogin onLoginSuccess={handleLoginSuccess} />
    )
  );
};

export default AdminPanel;