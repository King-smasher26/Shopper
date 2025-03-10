// import { colors } from '@mui/material';
// import React from 'react'
// import 
// {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
//   BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
//  from 'react-icons/bs'
// import {useNavigate} from "react-router-dom"
// // function toInventoryManager(){
//     //     console.log('hello')
//     // }
//     const Sidebar=({openSidebarToggle, OpenSidebar})=>{
//     const navigate = useNavigate();
//   return (
//     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
//         <div className='sidebar-title'>
//             <div className='sidebar-brand'>
//                 <BsCart3  className='icon_header'/> SHOP
//             </div>
//             <span className='icon close_icon' onClick={OpenSidebar}>X</span>
//         </div>

//         <ul className='sidebar-list'>
//             <li className='sidebar-list-item' style={{"color":"white"}}>
//                 {/* <a href="">
//                 </a> */}
//                     <BsGrid1X2Fill className='icon'/> Dashboard
//             </li>
//             {/* <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillArchiveFill className='icon'/> Products
//                 </a>
//             </li> */}
//             {/* <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillGrid3X3GapFill className='icon'/> Categories
//                 </a>
//             </li> */}
//             <li className='sidebar-list-item' onClick={()=>navigate('/admin/analyze')} style={{"color":"white"}}>
//                 {/* <a href="" >
//                 </a> */}
//                     <BsListCheck className='icon'/> Inventory
//             </li>
//             <li className='sidebar-list-item' onClick={()=>navigate('/adminAdding')} style={{"color":"white"}}>
//                 {/* <a href="" >
//                 </a> */}
//                     <BsPeopleFill className='icon'/> Admins
//             </li>
//             {/* <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsMenuButtonWideFill className='icon'/> Reports
//                 </a>
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillGearFill className='icon'/> Setting
//                 </a>
//             </li> */}
//         </ul>
//     </aside>
//   )
// }

// export default Sidebar
import React from 'react';
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsGraphUp }
from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar, navigateTo, activeComponent}) {
    const navigate=useNavigate();
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand text-white'>
                <div className='icon'/> Admin Panel
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className={`sidebar-list-item ${activeComponent === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
                <a href="#" aria-disabled>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className={`sidebar-list-item ${activeComponent === 'products' ? 'active' : ''}`} onClick={() => navigateTo('products')}>
                <a href="#" aria-disabled>
                    <BsGraphUp className='icon'/> Products
                </a>
            </li>
            <li className={`sidebar-list-item ${activeComponent === 'analyze' ? 'active' : ''}`}  onClick={() => navigateTo('analyze')}>
                <a href="#" aria-disabled>
                    <BsGraphUp className='icon'/> Analyze Inventory
                </a>
            </li>
            <li className='sidebar-list-item' onClick={() => navigateTo('admins')}>
                <a href="#" aria-disabled>
                    <BsPeopleFill className='icon' /> Admins
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default Sidebar;