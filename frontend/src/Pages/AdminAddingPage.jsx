import React, { useState } from 'react'
import "./AdminAddingPage.css"

const AdminAddingPage = () => {

    const [showBox, setShowBox] = useState(false);


    const adminData = [{adminName: "Akash", adminEmail: "asbhandari14@gmail.com", adminDes:"frontend"},{adminName: "Aman", adminEmail: "yoabChutiya@gmail.com", adminDes:"backend"},{adminName: "Aman2", adminEmail: "aman7000@gmail.com", adminDes:"research paper"},{adminName: "Arjun", adminEmail: "arjun69@gmail.com", adminDes:"figma design and report"},]


  return (
    <>
      <h1 id='adminHeading'>Hello I am the Admin Adding page</h1>
      <button id="adminAddBtn" onClick={()=>{setShowBox(!showBox)}}>Add Admin</button>
      <div className="adminData_Container">
            {
                adminData.map((currElem, index)=>{
                    return <div className="adminData_Box" key={index}>
                        <p>Admin Name : {currElem.adminName}</p>
                        <p>Admin mail : {currElem.adminEmail}</p>
                        <p>Admin Description : {currElem.adminDes}</p>
                    </div>
                })
            }
      </div>
      <div className="adminInfoBox" style={{display: (showBox===true)?"flex":"none"}}>
        <h1>New Admin Information</h1>
        <input type="text" id='name' placeholder='Enter the name of the Admin' />
        <input type="email" id="mail" placeholder='Enter your Email Address' />
        <input type="text" id="des" placeholder='Enter your description' />

        <button onClick={()=>{setShowBox(false)}}>Submit Info</button>
      </div>
    </>
  )
}

export default AdminAddingPage
