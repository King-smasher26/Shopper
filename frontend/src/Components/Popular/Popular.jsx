import React, { useContext } from 'react'
// import {useContext, useEffect} from 'react';
import "./Popular.css"
import data_product from "../Images/data"
import Item from '../Items/Item'
import { ShopContext } from '../../Context/ShopContext'
// import axios from 'axios'
// import { ShopContext } from '../../Context/ShopContext'

const Popular = (props) => {
  const {getPopularWomenData} = useContext(ShopContext)
  

  const changeTheme = {
    color : (props.mode==="black")?"yellow":"black"
  }

  return (
    <div>

    <div className="popular"> 

      <div className="popular-heading">
       
        <h1 style={changeTheme}> POPULAR IN WOMEN </h1>
        
      </div>

      <div className="popular-dash">
        <hr style={{backgroundColor: (props.mode === "black")?"yellow":"black"}}/>
        {/* {console.log(getPopularWomenData())} */}
      </div>

        <div className="popular-items">
            <div className="popular-item">
            {getPopularWomenData().map((item, index)=>{
                return <Item key={index} id={item._id} name={item.ProductName} image={item.ProductImg} new_price={item.discountedPrice}  old_price={item.Price} />
            })}
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default Popular
