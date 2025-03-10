import React, { useEffect, useState } from "react";
import "./Item.css";
import { Link } from 'react-router-dom'
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => { 
  const [mode, setMode] = useState();

  useEffect(()=>{
    setMode(props.mode);
  })
  // const [mode,setMode]=useState(true)
  // console.log('mode at items is',props.abc)
  return (
    (props.id)?<div className="item">
            <div className="item-img">
                  <Link to={`/product/${props.id}`}> <img src={props.image} alt="" onClick={()=>{ window.scrollTo(0, 0)}} /> </Link>
            </div>
            <div className="item-heading">
                  <Link to={`/product/${props.id}`}>  <p id="title" style={{color:"#777"}}>{(props.name.length > 40)?props.name.substring(0, 40 - 3) + "..." : props.name}</p>  </Link>
            </div>
            

            {/* {console.log(`Hello I am the ${mode}`)} */}
            <div className="item-prices">
                  <div className="item-price-new"> &#8377;{props.new_price}</div>

                  <div className="item-price-old"> &#8377;{props.old_price}</div>
            </div>
        
    </div>:null

  );
};

export default Item;