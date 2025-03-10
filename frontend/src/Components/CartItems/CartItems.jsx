import React, { useContext, useEffect, useState } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from "../Images/cart_cross_icon.png"  
import { Link, redirect } from 'react-router-dom'


const CartItems = (props) => {
    const [size, setSize] = useState();
    const {all_product, cartItems, removeFromCart, getTotalCartAmount, getSizeFunction, getProductInfo} = useContext(ShopContext); 
    const [productInfo, setProductInfo] = useState([]);
    const {cartInfoSection} = useContext(ShopContext);



    useEffect(()=>{
      setSize(getSizeFunction())
    }, [])

    const calTotalSum=()=>{
      let sum = cartInfoSection().reduce((accum, elem)=>{
        return accum+elem.discountedPrice;
      }, 0)
      return sum
    }



  return (
    <>
    <div className="cartitems">

        <div className="cartitems-format-main cartitems_heading" style={{color : (props.mode)==="black"?"yellow":"black"}}>
        {console.log(cartInfoSection())}
        {/* {console.log(window.location.p)} */}
            <p>Products</p>
            <p>Title</p>
            <p>Size</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
       {/* { console.log(props.mode)} */}
 
       {cartInfoSection().map((currElem, index)=>{
        if(currElem._id.length>0)
        {
            return <div key={index} >
            <div className="cartitems-format cartitems-format-main" style={{color : (props.mode)==="black"?"yellow":"black"}}>
                <img src={currElem.ProductImg} alt="" className='carticon-product-icon' />
                <p>{currElem.ProductName}</p>
                <p>{currElem.size}</p>


                
  
                <p id="newPrice">&#8377;{currElem.discountedPrice}</p>
                <button className='cartitems-quantity'>{"1"}</button>
                <p>&#8377;{currElem.discountedPrice}</p>
                <img  className='removeBtn' src={remove_icon} onClick={()=>{removeFromCart(currElem._id)}} alt="" />
            </div>
            <hr />
        </div>
        }
        return null;
       })}
       
      {/* changes done yesterday  */}
      <div className="cartitems-down">
        <div className="cartitems-total " style={{color : (props.mode)==="black"?"yellow":"black"}}>
        <h1> Cart Totals </h1>
        <div className='cart_total_calculate'>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            {/* {console.log(calTotalSum())} */}
            <p>&#8377;{calTotalSum()}</p>
          </div>
          <hr style={{color : (props.mode)==="black"?"yellow":"black"}}/>
          <div className="cartitems-total-item">
            <p> Shipping Free </p>
            <p> Free </p>
          </div>
          <hr style={{color : (props.mode)==="black"?"yellow":"black"}}/>
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>&#8377;{calTotalSum()}</h3>
            {/* {console.log(personalInfo)} */}
          </div>

          </div>

          
          <Link to="/checkout"> <button id='proceedBtn' onClick={()=>{getProductInfo(cartInfoSection()); window.scrollTo(0, 0)}}> CHECKOUT</button> </Link>

        </div>
      </div>

    </div>
      
    </>
  )
}

export default CartItems
