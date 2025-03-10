import React, { useContext, useEffect, useState } from 'react'
import "./ProductDisplay.css"

import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'



const ProductDisplay = (props) => {
    const [size, setSize]  =  useState();
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const {getSizeFunction} = useContext(ShopContext);
    // const {getAllProductData} = useContext(ShopContext);

    
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
  return (
    <>
    
        <div className="productdisplay">       
                    <div className="productdisplay_left">
                            <img  src={product.ProductImg} alt="" />
                    </div>

                    <div className="productdisplay-right" style={{color: (props.mode === "black")?"white":"black"}}>
                            <h1 style={{color: (props.mode === "black")?"yellow":"black"}}>{product.ProductName}</h1>
                            <div className="productdisplay-right-prices">
                                <div className="productdisplay-right-price-old"> ${product.Price} </div>
                                <div className="productdisplay-right-price-new"> ${product.discountedPrice} </div>
                            </div>

                            <div className="productdisplay-right-description">
                                <p>{product.productDescription}</p>
                                {/* {console.log(product.sizes)} */}
                            </div>
                            <div className="productdisplay-rigth-size">
                                    <h1 style={{color: (props.mode === "black")?"yellow":"black"}}> Select Size </h1>
                                    <div className="productdisplay-right-sizes" style={{color: (props.mode==="black")? "grey":"black"}} onClick={(event)=>{ 
                                        const div = document.querySelector('div');
                                        if(event.target.classList.contains("size")){ 
                                            event.target.classList.add('selected');
                                            setSize(event.target.innerHTML);
                                            getSizeFunction(event.target.innerHTML);
                                            // deselect all other buttons
                                            console.log(event.target)
                                            const divElem = div.querySelectorAll('.size');
                                            divElem.forEach((divElem) => {
                                            if (divElem !== event.target) {
                                                divElem.classList.remove('selected');
                                            }
                                        })}}}>
                                        {
                                            product.sizes.map((currElem, index)=>{
                                                return <div className='size' key={index} >{currElem}</div>
                                            })
                                        }
                                        {/* <div className='size' >S</div>
                                        <div className='size' >M</div>
                                        <div className='size' >L</div>
                                        <div className='size' >XL</div>
                                        <div className='size'>XXL</div> */}
                                    </div>
                            </div>
                {/* {console.log(size)} */}
                    <button className='cart_btn' onClick={()=>{(size===undefined)?alert("Please select size"):addToCart(product, size);}}>ADD TO CART</button> 
                <Link to="/cart"><button className='cart_btn' onClick={()=>{window.scrollTo(0, 0)}}>GO TO CART</button> </Link>
                <p className='productdisplay-right-category'><span> Category : </span>{product.ProductName}</p>
                <p className='productdisplay-right-category'><span> Tags : </span>{product.tags.toString()}</p>
            </div>
            </div>
            {/* {console.log(size)} */}
      
    </>
  )
}

export default ProductDisplay
