import React from 'react'
import "./Offers.css"
import exclusive_image from "../Images/exclusive_image.png"

const Offers = () => {
  return (
    <div>
      
      <div className="offers">
        <div className="offers-left">
            <h1> Exclusive </h1>
            <h1> Offers For You </h1>
            <p>ONLY  ON BEST SELLERS PRODUCTS</p>
            <button> Check Now </button>
        </div>

        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>

      </div>
    </div>
  )
}

export default Offers
