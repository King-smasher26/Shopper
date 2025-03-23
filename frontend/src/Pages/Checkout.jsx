// import React, { useContext, useState } from 'react';
// import "./Checkout.css";
// import { ShopContext } from '../Context/ShopContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Checkout = () => {
//     // Using getTotalCartItems instead of getTotalCartAmount to match your context
//     const { cartItems, cartInfoSection, getTotalCartItems, clearCart } = useContext(ShopContext);
//     const [isLoading, setIsLoading] = useState(false);
//     const [formFields, setFormFields] = useState({
//         name: '',
//         pincode: '',
//         address: '',
//         phoneNumber: ''
//     });
    
//     // You'll need to add this to your context or get from localStorage/authentication
//     const userEmail = "user@example.com"; 
    
//     const navigate = useNavigate();

//     const validateForm = () => {
//         if (formFields.name === "" || 
//             formFields.address === "" || 
//             formFields.pincode === "" || 
//             formFields.phoneNumber === "") {
//             alert("All fields are required");
//             return false;
//         }
//         return true;
//     };

//     const handlePayment = async (razorpayOptions) => {
//         const options = {
//             ...razorpayOptions,
//             handler: function (response) {
//                 handlePaymentSuccess(
//                     response.razorpay_payment_id,
//                     response.razorpay_order_id,
//                     response.razorpay_signature
//                 );
//             },
//             modal: {
//                 ondismiss: function() {
//                     setIsLoading(false);
//                     console.log('Payment modal closed');
//                 }
//             },
//             theme: {
//                 color: "#3399cc"
//             }
//         };

//         const razorpayInstance = new window.Razorpay(options);
//         razorpayInstance.open();
//     };

//     const handlePaymentSuccess = async (paymentId, orderId, signature) => {
//         try {
//             setIsLoading(true);
            
//             // Verify payment with backend
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-payment`, {
//                 razorpayOrderId: orderId,
//                 razorpayPaymentId: paymentId,
//                 razorpaySignature: signature
//             });
            
//             // Debug: Log the full response to see exactly what you're getting
//             console.log("Full response object:", response);
//             console.log("Response data type:", typeof response.data);
//             console.log("Is success property present:", 'success' in response.data);
//             console.log("Success value:", response.data.success);
            
//             // Ensure we're correctly checking for success
//             if (response.data && response.data.success == "true") {
//                 console.log("Payment verified successfully, clearing cart and navigating...");
//                 // Clear cart and redirect to success page
//                 clearCart();
//                 navigate(`/order-success/${response.data.order.id}`);
//             } else {
//                 // This should not run if success is true
//                 console.error('Payment verification failed with data:', response.data);
//                 alert('Payment verification failed. Please contact support.');
//             }
//         } catch (error) {
//             console.error('Payment verification error:', error);
//             alert('Payment verification failed. Please contact support.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const placeOrder = async () => {
//         if (!validateForm()) return;
        
//         try {
//             setIsLoading(true);
            
//             const addressInfo = {
//                 name: formFields.name,
//                 phoneNumber: formFields.phoneNumber,
//                 address: formFields.address,
//                 pincode: formFields.pincode
//             };
            
//             const cart = cartInfoSection();
//             // Use getTotalCartItems instead of getTotalCartAmount
//             const totalAmount = getTotalCartItems();
            
//             // Create order via API
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-order`, {
//                 cartItems: cart,
//                 addressInfo,
//                 totalAmount,
//                 email: userEmail
//             });
            
//             if (response.data.success) {
//                 // Initialize Razorpay payment
//                 handlePayment(response.data.razorpayOptions);
//             } else {
//                 alert('Failed to create order. Please try again.');
//             }
//         } catch (error) {
//             console.error('Order creation error:', error);
//             alert('Failed to create order. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormFields(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div className='checkout_section'>
//             <div className="checkout_container">
//                 <div id='shipping'>
//                     <h2>Shipping Address</h2>
//                     <input 
//                         type="text" 
//                         placeholder='Enter your Full Name' 
//                         onChange={handleInputChange} 
//                         value={formFields.name}  
//                         name="name"
//                         style={{width: "100%"}}
//                     />
//                     <input 
//                         type="text" 
//                         placeholder='Enter Pincode'  
//                         value={formFields.pincode} 
//                         onChange={handleInputChange} 
//                         name="pincode"
//                     />
//                     <input 
//                         type="tel" 
//                         placeholder='Enter Phone Number'  
//                         value={formFields.phoneNumber} 
//                         onChange={handleInputChange} 
//                         name="phoneNumber"
//                     />
//                     <textarea 
//                         placeholder='Enter your Full Address' 
//                         style={{width: "100%", padding: "0.7rem 2rem", borderRadius: "4px"}}  
//                         rows={4} 
//                         value={formFields.address} 
//                         onChange={handleInputChange} 
//                         name="address"
//                     />
//                 </div>
//                 <div id='order'>
//                     <div className='flex'>
//                         <p>Subtotal</p>
//                         <p>₹{getTotalCartItems()}</p>
//                     </div>
//                     <div className='flex'>
//                         <p>Shipping</p>
//                         <p>Free</p>
//                     </div>
//                     <div className='flex'>
//                         <p>Total</p>
//                         <p>₹{getTotalCartItems()}</p>
//                     </div>
//                     <div id="placeOrderBtn">
//                         <button 
//                             onClick={placeOrder} 
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Processing...' : 'Place Order'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;

import React, { useContext, useState } from 'react';
import "./Checkout.css";
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, cartInfoSection, getTotalCartItems, clearCart } = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        pincode: '',
        address: '',
        phoneNumber: ''
    });
    
    const navigate = useNavigate();

    const validateForm = () => {
        if (formFields.name === "" || 
            formFields.address === "" || 
            formFields.pincode === "" || 
            formFields.phoneNumber === "") {
            alert("All fields are required");
            return false;
        }
        return true;
    };

    // ======= COMPLETELY REWORKED PAYMENT HANDLING =========
    const handlePayment = (razorpayOptions) => {
        const options = {
            ...razorpayOptions,
            handler: function (response) {
                // Using a brand new approach
                onPaymentComplete(response);
            },
            modal: {
                ondismiss: function() {
                    setIsLoading(false);
                    console.log('Payment modal closed');
                }
            },
            theme: {
                color: "#3399cc"
            }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    // New function to handle payment completion
    const onPaymentComplete = (razorpayResponse) => {
        console.log("Payment completed, verifying...");
        
        // Extracting response data
        const paymentId = razorpayResponse.razorpay_payment_id;
        const orderId = razorpayResponse.razorpay_order_id;
        const signature = razorpayResponse.razorpay_signature;
        
        // Set loading state
        setIsLoading(true);
        
        // Make a direct fetch request instead of axios
        fetch(`${process.env.REACT_APP_API_URL}/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                razorpayOrderId: orderId,
                razorpayPaymentId: paymentId,
                razorpaySignature: signature
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Verification response:", data);
            
            if (data && data.success) {
                console.log("Payment successful! Redirecting...");                
                // Use window.location instead of navigate
                window.location.href = `/order-success/${data.order.id}`;
            } else {
                console.error("Verification failed 1234:", data);
                alert("Payment verification failed. Please contact support. error is redirectiing");
            }
        })
        .catch(error => {
            console.error("Error verifying payment:", error);
            alert("There was an error processing your payment. Please contact support.");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const placeOrder = async () => {
        if (!validateForm()) return;
        
        try {
            setIsLoading(true);
            
            const addressInfo = {
                name: formFields.name,
                phoneNumber: formFields.phoneNumber,
                address: formFields.address,
                pincode: formFields.pincode
            };
            
            const cart = cartInfoSection();
            const totalAmount = getTotalCartItems();
            
            // Create order via API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-order`, {
                cartItems: cart,
                addressInfo,
                totalAmount,
            });
            
            if (response.data.success) {
                // Initialize Razorpay payment
                handlePayment(response.data.razorpayOptions);
            } else {
                alert('Failed to create order. Please try again.');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='checkout_section'>
            <div className="checkout_container">
                <div id='shipping'>
                    <h2>Shipping Address</h2>
                    <input 
                        type="text" 
                        placeholder='Enter your Full Name' 
                        onChange={handleInputChange} 
                        value={formFields.name}  
                        name="name"
                        style={{width: "100%"}}
                    />
                    <input 
                        type="text" 
                        placeholder='Enter Pincode'  
                        value={formFields.pincode} 
                        onChange={handleInputChange} 
                        name="pincode"
                    />
                    <input 
                        type="tel" 
                        placeholder='Enter Phone Number'  
                        value={formFields.phoneNumber} 
                        onChange={handleInputChange} 
                        name="phoneNumber"
                    />
                    <textarea 
                        placeholder='Enter your Full Address' 
                        style={{width: "100%", padding: "0.7rem 2rem", borderRadius: "4px"}}  
                        rows={4} 
                        value={formFields.address} 
                        onChange={handleInputChange} 
                        name="address"
                    />
                </div>
                <div id='order'>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>₹{getTotalCartItems()}</p>
                    </div>
                    <div className='flex'>
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>
                    <div className='flex'>
                        <p>Total</p>
                        <p>₹{getTotalCartItems()}</p>
                    </div>
                    <div id="placeOrderBtn">
                        <button 
                            onClick={placeOrder} 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;