import React from 'react'
import "./Breadcrum.css"
import arrow_icon from "../Images/breadcrum_arrow.png"
import { Link } from 'react-router-dom'

const Breadcrum = (props) => {
    const {product} = props;
    let category = product.tags[0];
    category = category.toLowerCase();
    category = category.concat((category==="women")?"s":"");
  return (
    <div className="breadcrum" style={{color: (props.mode==="black")?"yellow":"black"}}>
      <div className="breadcrum_inner">
        <Link to="/">  HOME <img src={arrow_icon} alt="" />  </Link>
         <Link to="/">SHOP <img src={arrow_icon} alt="" />  </Link>
        { console.log(category)}
         <Link to={`/${category}`}> {product.tags[0]} <img src={arrow_icon} alt="" /> </Link>
           {product.tags[1] } {product.tags[2]}
        {console.log(product)}
        </div>
    </div>
  )
}

export default Breadcrum;
