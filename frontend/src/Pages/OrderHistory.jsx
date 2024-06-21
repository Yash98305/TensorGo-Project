import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Plan: {order.plan.name}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
