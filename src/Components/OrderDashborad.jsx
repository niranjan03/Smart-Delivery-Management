import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/orders');
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    }, []);
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
          await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
          // Update the local state to reflect the change
          const updatedOrders = orders.map(order => {
            if (order._id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          });
          setOrders(updatedOrders);
        } catch (error) {
          console.error('Error updating order status:', error);   
    
        }
      };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Dashboard</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{order.orderNumber}</td>
              <td className="px-4 py-2">{order.customer.name}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleStatusUpdate(order._id, 'assigned')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign</button>
                <button onClick={() => handleStatusUpdate(order._id, 'picked')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Picked</button>
                <button onClick={() => handleStatusUpdate(order._id, 'delivered')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersDashboard;