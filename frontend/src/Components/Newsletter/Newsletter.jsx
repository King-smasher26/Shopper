import React from 'react'
import "./Newsletter.css"

const Newsletter = () => {
  return (
    <>

    <div className="newsletter">
        <div className="newsletter_box">

            <h1 className="newsletter_box_heading"> Get Exclusive Offers on Your Email </h1>

            <div className="newsletter_subscribe_box">
                <p className="newsletter_box_info"> Subscribe to our newletter and stay updated </p>


                <div className='newsletter_box_email'>
                    <input type="email" placeholder='Your Email id' />
                    <button>Subscribe</button>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Newsletter
