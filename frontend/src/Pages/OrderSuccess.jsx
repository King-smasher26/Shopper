import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${orderId}`);
        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          setError('Failed to load order details');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-r-4 border-indigo-300"></div>
        <p className="mt-4 text-indigo-700 font-medium">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Something went wrong</h2>
          <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300 shadow-md">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate estimated delivery date (5 days from order date)
  const orderDate = new Date(order.createdAt);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white shadow-md rounded-lg mb-6 p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h1>
          <p className="text-gray-600 mt-2">Your order has been confirmed and will be shipped soon.</p>
          
          <div className="flex justify-center mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Order #{order._id.slice(-8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Order Date</p>
                <p className="font-medium text-gray-800">
                  {orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-gray-500 mb-1">Estimated Delivery</p>
                <p className="font-medium text-gray-800">
                  {deliveryDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-800">Razorpay</p>
              </div>
              
              <div>
                <p className="text-gray-500 mb-1">Payment ID</p>
                <p className="font-medium text-gray-800 truncate" title={order.payment.razorpayPaymentId}>
                  {order.payment.razorpayPaymentId}
                </p>
              </div>
              
              <div className="col-span-2 mt-2 pt-4 border-t">
                <p className="text-gray-500 mb-1">Total Amount</p>
                <p className="font-bold text-xl text-indigo-700">₹{order.totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Details */}
        <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Shipping Details</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{order.shippingAddress.name}</h3>
                <p className="text-gray-600 mt-1">{order.shippingAddress.address}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Pincode: {order.shippingAddress.pincode}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Phone: {order.shippingAddress.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white shadow-md rounded-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {order.items.map((item, index) => (
              <div key={index} className="p-6 flex">
                {item.productImg ? (
                  <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden shadow-sm mr-4">
                    <img src={item.productImg} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md mr-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">Price: <span className="font-medium text-gray-800">₹{item.price.toLocaleString('en-IN')}</span></p>
                    <p className="text-gray-600">Quantity: <span className="font-medium text-gray-800">{item.quantity}</span></p>
                    {item.size && <p className="text-gray-600">Size: <span className="font-medium text-gray-800">{item.size}</span></p>}
                  </div>
                  <p className="mt-2 text-indigo-600 font-medium">
                    Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link to="/" className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium rounded-md transition duration-300 shadow-md">
            Continue Shopping
          </Link>
          <Link to="/orders" className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white text-center font-medium rounded-md transition duration-300 shadow-md">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;