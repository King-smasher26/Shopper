import React, { useContext, useState } from 'react';
import "./Checkout.css"

import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
// import Razorpay from 'razorpay';
// import axios from 'axios';


const Checkout = () => {
    const { cartInfoSection, getTotalCartItems} = useContext(ShopContext); 

    const [formFields, setformFields] = useState({
        name: '',
        pincode: '',
        address: '',
        phoneNumber: ''
    })

    const history = useNavigate();



    const placeOrder = () => {
        {console.log(getTotalCartItems())}
        {console.log(cartInfoSection())}
     

        if (formFields.name === "" || formFields.address === "" || formFields.pincode === "" || formFields.phoneNumber === "") {
            alert("All fields Required");
            return false;
        }
    


            const addressInfo = {
                name: formFields.name,
                phoneNumber: formFields.phoneNumber,
                address: formFields.address,
                pincode: formFields.pincode,
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }



        var options = {
            key: "rzp_test_9OPGhLjsO1bRcu",
            key_secret: "MuyybBqGo1WULx7898lgAo26",
            amount: parseInt(getTotalCartItems()*100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + formFields.name,
            name: "E-Bharat",
            description: "for testing purpose",
            handler: function (response) {

                console.log(response)
                // {console.log(cartItems())}
            

                const paymentId = response.razorpay_payment_id
                // store in firebase 
                const orderInfo = {
                    cartItems: cartInfoSection(),
                    addressInfo: addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: "abc@123gmail.com",
                    userid: 12343,
                    paymentId
                }
                  
                


                history('/')


            },

            theme: {
                color: "#3399cc"
            }
        };


        var pay = new window.Razorpay(options);
        pay.open();
    
        
    }


    const changeInput = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);

        setformFields(() => ({
            ...formFields,
            [name]: value
        }))
    }

    
 

  return (
    <>
    <div className='checkout_section'>
        <div className="checkout_container">
                <div id='shipping'>
                    <h2>Shopping Address</h2>
                    <input type="text" placeholder='Enter your Full Name' onChange={changeInput} style={{width : "100%"}} value={formFields.name}  name="name"/>
                    {
                        console.log(formFields)
                    }
                    <input type="number" placeholder='Enter Pincode'  value={formFields.pincode} onChange={changeInput} name="pincode"/>
                    <input type="number" placeholder='Enter Phone Number'  value={formFields.phoneNumber} onChange={changeInput} name="phoneNumber"/>
                    <textarea id="" placeholder='Enter you Full Address' style={{width : "100%", padding : "0.7rem 2rem", borderRadius: "4px"}}  rows={4} value={formFields.address} onChange={changeInput} name="address"></textarea>
                </div>
                <div id='order'>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>{getTotalCartItems()}</p>
                    </div>
                    <div className='flex'>
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>
                    <div className='flex'>
                        <p>Total</p>
                        <p>{getTotalCartItems()}</p>
                    </div>
                    <div id="placeOrderBtn">
                            <button onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
        </div>
    </div>
    </>
  )
}

export default Checkout;