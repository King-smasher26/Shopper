import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);

        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          setError('Failed to load orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-r-4 border-indigo-300"></div>
        <p className="mt-4 text-indigo-700 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Something went wrong</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300 shadow-md">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg mb-8 p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Your Orders</h1>
          <p className="text-center text-gray-500 mt-2">
            {orders.length === 0 ? 'No orders yet' : `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <p className="text-gray-600 text-lg mb-6">No orders found</p>
            <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h2 className="font-semibold text-lg text-gray-800 mb-1">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-3">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                        Delivered
                      </span> */}
                      <Link 
                        to={`/order-success/${order._id}`} 
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Order preview section - optional if you have item details */}
                {order.items && order.items.length > 0 && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Est. delivery:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;